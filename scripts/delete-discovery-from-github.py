#!/usr/bin/env python3
"""
Delete Discovery-related data from GitHub so you can re-run the export from scratch.
- Closes all open issues with label "discovery" in GITHUB_REPO (issues cannot be deleted via API).
- Deletes the Project board when GITHUB_PROJECT_NUMBER is set.

Requires: GITHUB_TOKEN, GITHUB_REPO. Optional: GITHUB_PROJECT_NUMBER.
Safety: set CONFIRM_DELETE=yes to skip the confirmation prompt.

Usage:
  python scripts/delete-discovery-from-github.py
"""
import os
import sys
import json
import urllib.request
import urllib.error

def env(key, default=None):
    v = os.environ.get(key, default)
    if not v and default is None:
        raise SystemExit(f"Set {key} (e.g. in .env or shell)")
    return v

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
    project_number = os.environ.get("GITHUB_PROJECT_NUMBER")

    if os.environ.get("CONFIRM_DELETE") != "yes":
        print("This will:")
        print("  1. Close all open issues with label 'discovery' in", repo)
        if project_number:
            print("  2. Delete project #" + str(project_number))
        else:
            print("  2. Skip project deletion (set GITHUB_PROJECT_NUMBER to delete a project)")
        print("Set CONFIRM_DELETE=yes to run without this prompt.")
        try:
            reply = input("Type 'yes' to continue: ").strip().lower()
        except EOFError:
            reply = ""
        if reply != "yes":
            print("Aborted.")
            sys.exit(1)

    base = f"https://api.github.com/repos/{owner}/{repo_name}"
    closed = 0

    # Close all open issues with label discovery
    page = 1
    while True:
        try:
            issues = rest("GET", f"{base}/issues?labels=discovery&state=open&per_page=100&page={page}", token)
        except urllib.error.HTTPError as e:
            print("Failed to list issues:", e.code, e.reason)
            break
        if not issues:
            break
        for issue in issues:
            if issue.get("pull_request"):
                continue
            num = issue.get("number")
            try:
                rest("PATCH", f"{base}/issues/{num}", token, {"state": "closed"})
                closed += 1
                print("  Closed #%d: %s" % (num, (issue.get("title") or "")[:50]))
            except urllib.error.HTTPError as e:
                print("  Failed to close #%d: %s %s" % (num, e.code, e.reason))
        if len(issues) < 100:
            break
        page += 1

    print("Closed %d discovery issue(s)." % closed)

    # Delete project if GITHUB_PROJECT_NUMBER is set
    if project_number:
        try:
            num = int(project_number)
        except ValueError:
            print("GITHUB_PROJECT_NUMBER must be a number. Skipping project deletion.")
        else:
            q_user = "query($login: String!, $number: Int!) { user(login: $login) { projectV2(number: $number) { id title } } }"
            data = graphql(token, q_user, {"login": owner, "number": num})
            project = data.get("user", {}).get("projectV2")
            if not project:
                data = graphql(token, "query($login: String!, $number: Int!) { organization(login: $login) { projectV2(number: $number) { id title } } }", {"login": owner, "number": num})
                project = data.get("organization", {}).get("projectV2")
            if not project:
                print("Project #%s not found. Nothing to delete." % num)
            else:
                project_id = project["id"]
                title = project.get("title", "?")
                mut = """
                mutation($projectId: ID!) {
                  deleteProjectV2(input: { projectId: $projectId }) {
                    deletedProjectV2ItemId
                  }
                }
                """
                graphql(token, mut, {"projectId": project_id})
                print("Deleted project: %s (#%s)." % (title, num))
    else:
        print("GITHUB_PROJECT_NUMBER not set; no project deleted.")

    print("Done. You can re-run export-to-github-project.py to start fresh (new issues and new project).")

if __name__ == "__main__":
    main()
