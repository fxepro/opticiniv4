# Discovery module – GitHub Project export

**Module:** Discovery (only top-level item)  
**Columns:** Backlog | Todo | In progress | Done  
**Parent:** One row has Parent = `—` (Discovery). All others have Parent = `Discovery`.

---

## Top-level (one row)

| Title | Parent | Route | Purpose | Status |
|-------|--------|-------|---------|--------|
| Discovery | — | — | Discovery module | Done |

---

## Sub-pages (nested under Discovery)

| Title | Parent | Route | Purpose | Status |
|-------|--------|-------|---------|--------|
| Overview | Discovery | /workspace/discovery/overview | KPIs, charts, quick access. | Done |
| Asset Inventory | Discovery | /workspace/discovery/asset-inventory | List/filter assets. | Todo |
| Network Discovery | Discovery | /workspace/discovery/network-discovery | Network devices, topology. | Backlog |
| Cloud Assets | Discovery | /workspace/discovery/cloud-assets | Cloud resources (AWS, Azure, GCP). | Backlog |
| Application Mapping | Discovery | /workspace/discovery/application-mapping | Apps, services, relationships. | Backlog |
| Dependency Mapping | Discovery | /workspace/discovery/dependency-mapping | Dependencies between assets. | Backlog |
| Tagging & Classification | Discovery | /workspace/discovery/tagging | Tags, classification. | Backlog |
| Ownership | Discovery | /workspace/discovery/ownership | Asset/application ownership. | Backlog |
| Integrations | Discovery | /workspace/discovery/integrations | Discovery data sources. | Backlog |
| Reports | Discovery | /workspace/discovery/reports | Coverage, gaps, audit reports. | Backlog |

---

## Phase 1: Technical design (nested under Discovery)

| Title | Parent | Route | Purpose | Status |
|-------|--------|-------|---------|--------|
| Finalize technical design doc (APIs, data model, discovery schema) | Discovery | — | Technical design | Todo |
| Align data model with Platform design DB (discovery.* schema) | Discovery | — | Data model | Backlog |
| Define API contracts for Discovery Overview KPIs and Asset Inventory | Discovery | /workspace/discovery/overview | API contracts | Backlog |
| Document integration points (connectors, ingestion, asset identity) | Discovery | — | Integration docs | Backlog |

---

## Phase 2: Backend & data (nested under Discovery)

| Title | Parent | Route | Purpose | Status |
|-------|--------|-------|---------|--------|
| Create Discovery Django app(s) and/or schema (discovery schema) | Discovery | — | Backend setup | Backlog |
| Implement core models (assets, asset_attributes, asset_relationships) | Discovery | — | Data model | Backlog |
| Implement migrations and create tables in discovery schema | Discovery | — | Migrations | Backlog |
| Build Discovery APIs: asset list/filter, KPI aggregates | Discovery | /workspace/discovery/overview | APIs | Backlog |
| Add organization_id / tenant isolation and RLS if required | Discovery | — | Multi-tenant | Backlog |
| (Optional) Connector/ingestion pipeline or stubs | Discovery | /workspace/discovery/integrations | Ingestion | Backlog |

---

## Phase 3: Frontend – Overview (nested under Discovery)

| Title | Parent | Route | Purpose | Status |
|-------|--------|-------|---------|--------|
| Replace Discovery Overview mock data with API calls | Discovery | /workspace/discovery/overview | Wire APIs | Backlog |
| Wire KPI cards to real aggregates | Discovery | /workspace/discovery/overview | KPIs | Backlog |
| Wire charts to API (assets by environment, by criticality) | Discovery | /workspace/discovery/overview | Charts | Backlog |
| Wire secondary metrics (24h/7d, lifecycle, latency) | Discovery | /workspace/discovery/overview | Secondary metrics | Backlog |
| Add loading and error states; handle empty data | Discovery | /workspace/discovery/overview | UX states | Backlog |

---

## Phase 4: Frontend – Asset inventory & sub-pages (nested under Discovery)

| Title | Parent | Route | Purpose | Status |
|-------|--------|-------|---------|--------|
| Implement Asset Inventory page with real API (list, filter, search, pagination) | Discovery | /workspace/discovery/asset-inventory | Asset Inventory | Backlog |
| Implement or stub: Network Discovery, Cloud Assets, Application Mapping, Dependency Mapping | Discovery | (see sub-pages table) | Sub-pages | Backlog |
| Implement or stub: Tagging & Classification, Ownership | Discovery | /workspace/discovery/tagging, /workspace/discovery/ownership | Sub-pages | Backlog |
| Link Overview KPIs to filtered Asset Inventory (unclassified, orphaned) | Discovery | /workspace/discovery/overview | Links | Backlog |
| Add Quick access links to real routes (or placeholder pages) | Discovery | /workspace/discovery/overview | Quick access | Backlog |

---

## Phase 5: Integration & quality (nested under Discovery)

| Title | Parent | Route | Purpose | Status |
|-------|--------|-------|---------|--------|
| Connect Discovery APIs to frontend (env/config, auth) | Discovery | — | Integration | Backlog |
| Add basic tests: API and optional frontend smoke tests | Discovery | — | Tests | Backlog |
| Verify permissions/nav: Discovery menu and Overview visible for correct roles | Discovery | — | Permissions | Backlog |
| Update Security/Compliance/other modules if they consume Discovery | Discovery | — | Cross-module | Backlog |

---

## Phase 6: Documentation & release (nested under Discovery)

| Title | Parent | Route | Purpose | Status |
|-------|--------|-------|---------|--------|
| Update Discovery KPI doc with final API and field mapping | Discovery | — | Docs | Backlog |
| Document how to run Discovery (backend, env, sample data) | Discovery | — | Runbook | Backlog |
| Changelog/Release note for Discovery module | Discovery | — | Release | Backlog |
| Mark Discovery complete for v1 and open follow-up as backlog | Discovery | — | Closure | Backlog |
