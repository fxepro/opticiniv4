# GitHub Project Export Format

This doc defines the .md format used to export module data into GitHub Project columns. A script can parse these files to create Project items (issues) and set their status column.

---

## Column mapping

GitHub Project columns (example):

| Column       | Use for |
|-------------|---------|
| **Backlog** | Not started; no assignee. |
| **Todo**    | Ready to work; may have assignee. |
| **In progress** | Someone working on it. |
| **Done**    | Completed. |

You can use fewer columns (e.g. Todo | In progress | Done) or add more (e.g. Review, Blocked). The export .md uses a **Status** field that maps to these column names.

---

## Hierarchy: one top-level, rest nested

- **Only one top-level item** per module (e.g. **Discovery**). That row has **Parent** empty or `—`.
- **All other rows are nested** under it: set **Parent** to the top-level item’s title (e.g. `Discovery`).
- The script sets a **Parent** field on the project so grouping shows the top-level item and nested items under it.

---

## Where to put route / purpose / parent

Each export row is one **item** (one GitHub Issue / Project item). Fields:

| Field    | Where in .md        | Example | Used for |
|----------|---------------------|---------|----------|
| **Title** | First column | `Discovery` or `Asset Inventory` | Issue title. |
| **Parent** | Column (required for hierarchy) | `—` (top-level) or `Discovery` (nested) | Project field; only one row has Parent empty = top-level. |
| **Route** | Dedicated column | `/workspace/discovery/asset-inventory` | Issue body or custom field. |
| **Purpose** | Dedicated column | `List/filter assets.` | Issue body or description. |
| **Status** | Column | `Todo` | Maps to GitHub Project column (Backlog / Todo / In progress / Done). |

**Route** and **Purpose** go in the **per-item** section. **Parent** must be present so Discovery is the only top-level row and the rest are nested.

---

## File layout (per module)

- **One file per module:** `docs/exports/<module>-project-export.md` (e.g. `discovery-project-export.md`).
- **Header:** Module name, optional list of columns.
- **Body:** One section per phase or area; each task is one item with Title, Route (if any), Purpose, Status.

---

## Format A: Table (for script parsing)

```markdown
| Title | Parent | Route | Purpose | Status |
|-------|--------|-------|---------|--------|
| Discovery | — | — | Discovery module | Done |
| Overview page | Discovery | /workspace/discovery/overview | KPIs, charts, quick access. | Done |
| Asset Inventory | Discovery | /workspace/discovery/asset-inventory | List/filter assets. | Todo |
```

- **Parent** = `—` for the single top-level row (e.g. Discovery); for all others, the title of that top-level row (e.g. `Discovery`).
- **Route** = app route (e.g. `/workspace/discovery/overview`).
- **Purpose** = short description; script can put it in the issue body.
- **Status** = exact column name (Backlog, Todo, In progress, Done).

---

## Format B: List with YAML-like fields (alternative)

```markdown
## Phase 3: Frontend – Overview
- [ ] Replace Discovery Overview mock data with API calls
  route: /workspace/discovery/overview
  purpose: Wire Overview to real APIs.
  status: Todo
```

Use **Format A** if the script reads tables; use **Format B** if it parses list items and indented key-value lines. Discovery export below uses **Format A** so route/purpose are explicit columns.
