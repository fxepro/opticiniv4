# Compliance app migrations (V3)

**Rule: always run `makemigrations` before `migrate`.** If you only run migrate, Django will say "Run 'manage.py makemigrations' to make new migrations" whenever the models and migration files are out of sync.

**Quick reference (run from `opticiniv3/backend`):**
```bash
python manage.py makemigrations compliance
python manage.py migrate compliance --database=compliance
python manage.py migrate compliance --database=evidence
python manage.py migrate compliance --database=audit
python manage.py migrate compliance --fake --database=default
```

---

## Fix: "Your models in app(s): 'compliance' have changes that are not yet reflected in a migration"

That happens when there are **unapplied compliance migrations** (e.g. 0003) but you only run `migrate` with no `--database`, so it uses **default**. Compliance tables live on `compliance`/`evidence`/`audit`, so those migrations are not run on default and never get marked applied — Django then thinks the model state is ahead of the migration state.

**Run this once (and again whenever a new compliance migration appears):**

```bash
cd opticiniv3/backend

# 1) Generate migrations if needed, then apply on the schema DBs
python manage.py makemigrations compliance
python manage.py migrate compliance --database=compliance
python manage.py migrate compliance --database=evidence
python manage.py migrate compliance --database=audit

# 2) Mark compliance migrations as applied on default (stops the warning; no SQL on default)
python manage.py migrate compliance --fake --database=default
```

After step 2, the warning goes away. Use the same pattern whenever you see it again.

---

## Every time you change compliance models (or Django tells you to)

**1. Generate migration files (required):**

```bash
cd opticiniv3/backend

python manage.py makemigrations compliance
```

**2. Then apply them to each schema:**

```bash
python manage.py migrate compliance --database=compliance
python manage.py migrate compliance --database=evidence
python manage.py migrate compliance --database=audit
```

If you skip step 1, step 2 will either fail or keep warning that models have changes not in a migration.

---

## First-time setup when existing tables already exist (core RunSQL)

If you get `relation "controls" already exists` (or similar): your compliance/evidence/audit tables were created by core RunSQL.

1. **Fake the initial migration** on all three DBs:

```bash
cd opticiniv3/backend

python manage.py migrate compliance 0001_v3_schema_tables --fake --database=compliance
python manage.py migrate compliance 0001_v3_schema_tables --fake --database=evidence
python manage.py migrate compliance 0001_v3_schema_tables --fake --database=audit
```

2. **Generate any new migrations, then apply:**

```bash
python manage.py makemigrations compliance

python manage.py migrate compliance --database=compliance
python manage.py migrate compliance --database=evidence
python manage.py migrate compliance --database=audit
```

---

## If audit/evidence V3 tables are still missing (0004)

Migration **0004_create_audit_evidence_v3_tables** creates the five tables that live in audit and evidence schemas:

- **audit:** `control_test_plans`, `control_test_instances`, `test_samples`, `exceptions`
- **evidence:** `evidence_links`

Run:

```bash
cd opticiniv3/backend

python manage.py migrate compliance --database=audit
python manage.py migrate compliance --database=evidence
```

If Django reports "No migrations to apply" but the tables are still missing (e.g. 0002 was faked earlier), 0004 will create them when you run the commands above. If 0004 is already applied and `evidence_links` is still missing, create it manually. **Requires `evidence.evidence_items` to exist** (from core migration `0006_evidence_schema_tables`). Use schema-qualified names:

```sql
-- Run against your DB (search_path can be anything; evidence schema must exist with evidence_items)
CREATE TABLE IF NOT EXISTS evidence.evidence_links (
    id UUID PRIMARY KEY,
    evidence_id UUID NOT NULL REFERENCES evidence.evidence_items(id) ON DELETE CASCADE,
    linked_object_type VARCHAR(50) NOT NULL,
    linked_object_id UUID NOT NULL,
    notes TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_evidence_links_evidence ON evidence.evidence_links (evidence_id);
```

If you get **"relation evidence.evidence_items does not exist"**, create the evidence schema and `evidence_items` first (run core migrations, or ensure `core/migrations/0006_evidence_schema_tables` has been applied).

---

## Fresh install (no existing compliance/evidence/audit tables)

```bash
cd opticiniv3/backend

python manage.py makemigrations compliance

python manage.py migrate compliance --database=compliance
python manage.py migrate compliance --database=evidence
python manage.py migrate compliance --database=audit
```
