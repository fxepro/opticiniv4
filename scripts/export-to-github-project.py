#!/usr/bin/env python3
"""
Export a module's project-export .md file to GitHub: create or reuse Issues, add to a Project board.
Uses label "discovery" and matches by title to avoid duplicate issues on re-runs.
Optional: set GITHUB_PROJECT_NUMBER to add to an existing project instead of creating a new one.
Usage: python scripts/export-to-github-project.py [path/to/export.md]
Default: docs/exports/discovery-project-export.md
"""
import os
import re
import sys
import json
import urllib.request
import urllib.error

def env(key, default=None):
    v = os.environ.get(key, default)
    if not v and default is None:
        raise SystemExit(f"Set {key} (e.g. in .env or shell)")
    return v

def parse_export_md(path):
    """Extract table rows with columns Title, Parent, Route, Purpose, Status. Parent empty or — = top-level."""
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()
    rows = []
    for block in re.split(r"\n\n+", text):
        lines = [l.strip() for l in block.split("\n") if l.strip().startswith("|")]
        if len(lines) < 2:
            continue
        header = [c.strip().lower() for c in lines[0].split("|")[1:-1]]
        if "title" not in header or "status" not in header:
            continue
        sep = lines[1]
        if re.match(r"^\|\s*[-:]+\s*\|", sep) is None:
            continue
        title_idx = header.index("title")
        parent_idx = header.index("parent") if "parent" in header else None
        route_idx = header.index("route") if "route" in header else None
        purpose_idx = header.index("purpose") if "purpose" in header else None
        status_idx = header.index("status")
        for line in lines[2:]:
            cells = [c.strip() for c in line.split("|")[1:-1]]
            if len(cells) <= max(title_idx, status_idx):
                continue
            title = cells[title_idx].strip()
            status = cells[status_idx].strip() if status_idx < len(cells) else "Backlog"
            parent_raw = cells[parent_idx] if parent_idx is not None and parent_idx < len(cells) else ""
            parent = parent_raw if parent_raw and parent_raw != "—" and parent_raw != "–" else None
            route = cells[route_idx] if route_idx is not None and route_idx < len(cells) else ""
            purpose = cells[purpose_idx] if purpose_idx is not None and purpose_idx < len(cells) else ""
            if not title:
                continue
            rows.append({"title": title, "parent": parent, "route": route, "purpose": purpose, "status": status})
    return rows

def rest(method, url, token, data=None):
    req = urllib.request.Request(url, method=method)
    req.add_header("Authorization", f"Bearer {token}")
    req.add_header("Accept", "application/vnd.github+json")
    req.add_header("X-GitHub-Api-Version", "2022-11-28")
    if data is not None:
        req.add_header("Content-Type", "application/json")
        req.data = json.dumps(data).encode("utf-8")
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode())

def graphql(token, query, variables=None):
    data = {"query": query}
    if variables:
        data["variables"] = variables
    req = urllib.request.Request("https://api.github.com/graphql", method="POST")
    req.add_header("Authorization", f"Bearer {token}")
    req.add_header("Content-Type", "application/json")
    req.data = json.dumps(data).encode("utf-8")
    with urllib.request.urlopen(req, timeout=30) as r:
        out = json.loads(r.read().decode())
    if "errors" in out:
        raise SystemExit("GraphQL errors: " + json.dumps(out["errors"], indent=2))
    return out.get("data", {})

def main():
    token = env("GITHUB_TOKEN")
    repo = env("GITHUB_REPO", "xmash/OpticiniV2")
    owner, repo_name = repo.split("/", 1)
    export_path = sys.argv[1] if len(sys.argv) > 1 else "docs/exports/discovery-project-export.md"
    project_number = os.environ.get("GITHUB_PROJECT_NUMBER")
    if not os.path.isfile(export_path):
        raise SystemExit(f"File not found: {export_path}")

    rows = parse_export_md(export_path)
    print(f"Parsed {len(rows)} items from {export_path}")

    base = f"https://api.github.com/repos/{owner}/{repo_name}"
    # Load existing issues with label "discovery" so we don't create duplicates
    existing_by_title = {}
    page = 1
    while True:
        try:
            resp = rest("GET", f"{base}/issues?labels=discovery&state=all&per_page=100&page={page}", token)
        except urllib.error.HTTPError:
            break
        if not resp:
            break
        for issue in resp:
            if issue.get("pull_request"):
                continue
            title = (issue.get("title") or "").strip()
            if title and "node_id" in issue:
                existing_by_title.setdefault(title, issue["node_id"])
        if len(resp) < 100:
            break
        page += 1
    print(f"Found {len(existing_by_title)} existing discovery issues in repo")

    issues_created = []
    for r in rows:
        title = r["title"]
        body = f"**Route:** {r['route'] or '—'}\n\n**Purpose:** {r['purpose']}"
        if title in existing_by_title:
            node_id = existing_by_title[title]
            issues_created.append({"node_id": node_id, "status": r["status"], "title": title, "parent": r.get("parent")})
            print(f"  Reuse: {title[:60]}...")
        else:
            try:
                out = rest("POST", f"{base}/issues", token, {"title": title, "body": body, "labels": ["discovery"]})
            except urllib.error.HTTPError as e:
                print(f"  Skip '{title[:50]}...' – {e.code} {e.reason}")
                continue
            node_id = out["node_id"]
            existing_by_title[title] = node_id
            issues_created.append({"node_id": node_id, "status": r["status"], "title": title, "parent": r.get("parent")})
            print(f"  Created: {title[:60]}...")

    if not issues_created:
        print("No issues created. Exiting.")
        return

    # Resolve owner ID (try user first; orgs fail for user logins if queried together)
    q_user = "query($login: String!) { user(login: $login) { id } }"
    data = graphql(token, q_user, {"login": owner})
    owner_id = data.get("user", {}).get("id")
    if not owner_id:
        data = graphql(token, "query($login: String!) { organization(login: $login) { id } }", {"login": owner})
        owner_id = data.get("organization", {}).get("id")
    if not owner_id:
        raise SystemExit("Could not resolve owner id for " + owner)

    if project_number:
        # Use existing project (re-run: add items to same board, no new project)
        try:
            num = int(project_number)
        except ValueError:
            raise SystemExit("GITHUB_PROJECT_NUMBER must be a number")
        q_proj_user = "query($login: String!, $number: Int!) { user(login: $login) { projectV2(number: $number) { id number title } } }"
        data = graphql(token, q_proj_user, {"login": owner, "number": num})
        project = data.get("user", {}).get("projectV2")
        if not project:
            data = graphql(token, "query($login: String!, $number: Int!) { organization(login: $login) { projectV2(number: $number) { id number title } } }", {"login": owner, "number": num})
            project = data.get("organization", {}).get("projectV2")
        if not project:
            raise SystemExit(f"Project #{num} not found for owner {owner}. Create it first or leave GITHUB_PROJECT_NUMBER unset.")
        project_id = project["id"]
        print(f"Using existing project: {project['title']} (#{project['number']})")
    else:
        # Create new project
        q_create = """
        mutation($ownerId: ID!, $title: String!) {
          createProjectV2(input: { ownerId: $ownerId, title: $title }) {
            projectV2 { id number title }
          }
        }
        """
        mod_name = os.path.splitext(os.path.basename(export_path))[0].replace("-project-export", "")
        title = f"Discovery module" if "discovery" in mod_name.lower() else mod_name
        data = graphql(token, q_create, {"ownerId": owner_id, "title": title})
        project = data["createProjectV2"]["projectV2"]
        project_id = project["id"]
        print(f"Project created: {project['title']} (#{project['number']}). Set GITHUB_PROJECT_NUMBER={project['number']} to add to this board on next run.")

    # Get Status field and options
    q_fields = """
    query($projectId: ID!) {
      node(id: $projectId) {
        ... on ProjectV2 {
          field(name: "Status") {
            ... on ProjectV2SingleSelectField {
              id
              options { id name }
            }
          }
        }
      }
    }
    """
    data = graphql(token, q_fields, {"projectId": project_id})
    status_field = data.get("node", {}).get("field")
    if not status_field:
        # Status field might not exist; create it or use first single-select
        print("No Status field on new project. Add a 'Status' single-select with options: Backlog, Todo, In progress, Done.")
        print("Adding issues to project without status (you can set columns in the UI).")
        status_field_id = None
        status_options = {}
    else:
        status_field_id = status_field["id"]
        status_options = {o["name"]: o["id"] for o in status_field.get("options", [])}
        print("Status options:", list(status_options.keys()))

    # Add each issue to project and set status
    q_add = """
    mutation($projectId: ID!, $contentId: ID!) {
      addProjectV2ItemById(input: { projectId: $projectId, contentId: $contentId }) {
        item { id }
      }
    }
    """
    q_update = """
    mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $optionId: String!) {
      updateProjectV2ItemFieldValue(input: {
        projectId: $projectId
        itemId: $itemId
        fieldId: $fieldId
        value: { singleSelectOptionId: $optionId }
      }) { projectV2Item { id } }
    }
    """
    for item in issues_created:
        add_out = graphql(token, q_add, {"projectId": project_id, "contentId": item["node_id"]})
        item_id = add_out["addProjectV2ItemById"]["item"]["id"]
        status = item["status"]
        option_id = status_options.get(status) or status_options.get("Backlog")
        if status_field_id and option_id:
            graphql(token, q_update, {
                "projectId": project_id, "itemId": item_id,
                "fieldId": status_field_id, "optionId": option_id
            })
    print("Done. Open your repo → Projects to see the new board.")

if __name__ == "__main__":
    main()
