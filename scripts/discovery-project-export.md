# Discovery module – GitHub Project export

**Module:** Discovery  
**Columns:** Backlog | Todo | In progress | Done  

Use this file to create GitHub Project items (issues) for the Discovery module. **Route** and **Purpose** align with the app; **Status** maps to the Project column.

---

## Sub-pages (route + purpose)

These rows are the Discovery sub-pages from the app. Route and Purpose map to the in-app structure.

| Title | Route | Purpose | Status |
|-------|-------|---------|--------|
| Overview | /workspace/discovery/overview | KPIs, charts, quick access. | Done |
| Asset Inventory | /workspace/discovery/asset-inventory | List/filter assets. | Todo |
| Network Discovery | /workspace/discovery/network-discovery | Network devices, topology. | Backlog |
| Cloud Assets | /workspace/discovery/cloud-assets | Cloud resources (AWS, Azure, GCP). | Backlog |
| Application Mapping | /workspace/discovery/application-mapping | Apps, services, relationships. | Backlog |
| Dependency Mapping | /workspace/discovery/dependency-mapping | Dependencies between assets. | Backlog |
| Tagging & Classification | /workspace/discovery/tagging | Tags, classification. | Backlog |
| Ownership | /workspace/discovery/ownership | Asset/application ownership. | Backlog |
| Integrations | /workspace/discovery/integrations | Discovery data sources. | Backlog |
| Reports | /workspace/discovery/reports | Coverage, gaps, audit reports. | Backlog |

---

## Development tasks (by phase)

These rows are implementation tasks. Route is the main area (overview or asset-inventory); Purpose is the task description.

### Phase 1: Technical design

| Title | Route | Purpose | Status |
|-------|-------|---------|--------|
| Finalize technical design doc (APIs, data model, discovery schema) | — | Technical design | Todo |
| Align data model with Platform design DB (discovery.* schema) | — | Data model | Backlog |
| Define API contracts for Discovery Overview KPIs and Asset Inventory | /workspace/discovery/overview | API contracts | Backlog |
| Document integration points (connectors, ingestion, asset identity) | — | Integration docs | Backlog |

### Phase 2: Backend & data

| Title | Route | Purpose | Status |
|-------|-------|---------|--------|
| Create Discovery Django app(s) and/or schema (discovery schema) | — | Backend setup | Backlog |
| Implement core models (assets, asset_attributes, asset_relationships) | — | Data model | Backlog |
| Implement migrations and create tables in discovery schema | — | Migrations | Backlog |
| Build Discovery APIs: asset list/filter, KPI aggregates | /workspace/discovery/overview | APIs | Backlog |
| Add organization_id / tenant isolation and RLS if required | — | Multi-tenant | Backlog |
| (Optional) Connector/ingestion pipeline or stubs | /workspace/discovery/integrations | Ingestion | Backlog |

### Phase 3: Frontend – Overview

| Title | Route | Purpose | Status |
|-------|-------|---------|--------|
| Replace Discovery Overview mock data with API calls | /workspace/discovery/overview | Wire APIs | Backlog |
| Wire KPI cards to real aggregates | /workspace/discovery/overview | KPIs | Backlog |
| Wire charts to API (assets by environment, by criticality) | /workspace/discovery/overview | Charts | Backlog |
| Wire secondary metrics (24h/7d, lifecycle, latency) | /workspace/discovery/overview | Secondary metrics | Backlog |
| Add loading and error states; handle empty data | /workspace/discovery/overview | UX states | Backlog |

### Phase 4: Frontend – Asset inventory & sub-pages

| Title | Route | Purpose | Status |
|-------|-------|---------|--------|
| Implement Asset Inventory page with real API (list, filter, search, pagination) | /workspace/discovery/asset-inventory | Asset Inventory | Backlog |
| Implement or stub: Network Discovery, Cloud Assets, Application Mapping, Dependency Mapping | (see sub-pages table) | Sub-pages | Backlog |
| Implement or stub: Tagging & Classification, Ownership | /workspace/discovery/tagging, /workspace/discovery/ownership | Sub-pages | Backlog |
| Link Overview KPIs to filtered Asset Inventory (unclassified, orphaned) | /workspace/discovery/overview | Links | Backlog |
| Add Quick access links to real routes (or placeholder pages) | /workspace/discovery/overview | Quick access | Backlog |

### Phase 5: Integration & quality

| Title | Route | Purpose | Status |
|-------|-------|---------|--------|
| Connect Discovery APIs to frontend (env/config, auth) | — | Integration | Backlog |
| Add basic tests: API and optional frontend smoke tests | — | Tests | Backlog |
| Verify permissions/nav: Discovery menu and Overview visible for correct roles | — | Permissions | Backlog |
| Update Security/Compliance/other modules if they consume Discovery | — | Cross-module | Backlog |

### Phase 6: Documentation & release

| Title | Route | Purpose | Status |
|-------|-------|---------|--------|
| Update Discovery KPI doc with final API and field mapping | — | Docs | Backlog |
| Document how to run Discovery (backend, env, sample data) | — | Runbook | Backlog |
| Changelog/Release note for Discovery module | — | Release | Backlog |
| Mark Discovery complete for v1 and open follow-up as backlog | — | Closure | Backlog |

---

## How to use

- **Route** = app path for the feature (use `—` when there is no single route).
- **Purpose** = short description; can be used as issue body or summary.
- **Status** = GitHub Project column: Backlog | Todo | In progress | Done.
- A script can parse the tables above to create one GitHub Issue per row and set each issue’s Project column from **Status**.
