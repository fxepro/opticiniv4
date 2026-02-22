# Export to GitHub Project

Creates GitHub **Issues** and a **Project** board from a module export `.md` file (e.g. Discovery).

## Setup

1. **GitHub token** with `repo` and `project` scope:
   - GitHub → Settings → Developer settings → Personal access tokens → Generate.
   - Or fine-grained: repo (Issues: read/write), Projects: read/write.

2. **Environment:**

   ```bash
   set GITHUB_TOKEN=ghp_xxxx
   set GITHUB_REPO=xmash/OpticiniV2
   ```

   Optional: to **add to an existing project** instead of creating a new one each time (avoids duplicate boards):

   ```bash
   set GITHUB_PROJECT_NUMBER=1
   ```

   Use the project number from the project URL (e.g. `.../projects/1` → `1`). After the first run, the script prints the new project number; set it for future runs.

   (Use `export VAR=...` on macOS/Linux.)

3. **Export file:** Put the module export in `docs/exports/` (e.g. `discovery-project-export.md`) or pass the path (see below).

## Run

From the **opticiniv2** folder (repo root):

```bash
python scripts/export-to-github-project.py
```

### Start over (delete Discovery data)

To remove all Discovery issues and the project so you can re-export from scratch:

```bash
set GITHUB_PROJECT_NUMBER=1
set CONFIRM_DELETE=yes
python scripts/delete-discovery-from-github.py
```

- Closes all open issues with label `discovery` (GitHub does not allow deleting issues via API).
- Deletes the project whose number is in `GITHUB_PROJECT_NUMBER`.
- Without `CONFIRM_DELETE=yes`, the script asks you to type `yes` before proceeding.

Or with a specific file:

```bash
python scripts/export-to-github-project.py docs/exports/discovery-project-export.md
```

## What it does

1. Parses the `.md` tables (Title, Parent, Route, Purpose, Status).
2. **Issues:** For each row, reuses an existing issue with the same title and label `discovery` if present; otherwise creates one. No duplicate issues when you re-run.
3. **Project:** Creates a new project (e.g. "Discovery module") unless `GITHUB_PROJECT_NUMBER` is set, in which case it uses that existing project.
4. Adds each issue to the project (idempotent: already-added issues are not duplicated) and sets **Status** when the project has a Status field with options Backlog / Todo / In progress / Done.

If the project has no Status field, add one in the GitHub UI with options: **Backlog**, **Todo**, **In progress**, **Done**.

## Requirements

- Python 3.6+
- No extra packages (uses only stdlib).
