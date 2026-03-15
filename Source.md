# Railway Backend Settings Reference

## Source

- **Repo:** fxepro/opticiniv4
- **Root Directory:** `backend` ← **REQUIRED** (monorepo: backend has manage.py, requirements.txt, core/)
- **Branch:** opticini-dev
Changes made to this GitHub branch will be automatically pushed to this environment.
main

Disconnect
Wait for CI
Trigger deployments after all GitHub actions have completed successfully.

Networking
Public Networking
Access to this service publicly through HTTP or TCP
Public domain will be generated


TCP proxy on port 5432


Scale
Regions & Replicas
Deploy replicas per region for horizontal scaling.
US West (California, USA)

Replicas
1
Replica
Multi-region replicas are only available on the Pro plan.

Learn More↗
Replica Limits
Allocate a maximum vCPU and Memory for each replica.
CPU: 8 vCPU

Plan limit: 8 vCPU

Memory: 8 GB

Plan limit: 8 GB

Upgrade for higher limits
Build
Builder

Railpack

Default

App builder developed by Railway. Docs↗

Metal Build Environment
Metal

Use our new Metal-based build environment. The new Metal build environment is faster and will be the default for all builds in the coming months.


Custom Build Command
Override the default build command that is run when building your app. Docs↗

Build Command
Watch Paths
Gitignore-style rules to trigger a new deployment based on what file paths have changed. Docs↗
Add pattern
Add pattern e.g. /src/**

Deploy
Custom Start Command
Command that will be run to start new deployments. Docs↗
Start command
gunicorn core.wsgi:application --bind 0.0.0.0:$PORT
Add pre-deploy step (Docs↗)
Teardown
Configure old deployment termination when a new one is started. Docs↗

Cron Schedule
Run the service according to the specified cron schedule.

Add Schedule
Healthcheck Path
Endpoint to be called before a deploy completes to ensure the new deployment is live. Docs↗

Healthcheck Path
Serverless
Containers will scale down to zero and then scale up based on traffic. Requests while the container is sleeping will be queued and served when the container wakes up. Docs↗

Restart Policy
Configure what to do when the process exits. Docs↗
On Failure

Restart the container if it exits with a non-zero exit code.


Number of times to try and restart the service if it stopped due to an error.
Max restart retries
10
Config-as-code
Railway Config File
Manage your build and deployment settings through a config file. Docs↗

Add File Path

---

## Variables (Service → Variables tab)

| Variable | Value |
|----------|-------|
| DATABASE_URL | `${{Postgres.DATABASE_PRIVATE_URL}}` (Add Reference) |
| SECRET_KEY | Generate: `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"` |
| DEBUG | `False` |
| ALLOWED_HOSTS | `*` |
| CORS_ALLOWED_ORIGINS | `https://opticini.com,https://www.opticini.com` |

## Start Command

```
gunicorn core.wsgi:application --bind 0.0.0.0:$PORT
```

## Root Directory

Set to `backend` in Settings → Source → Root Directory.

---

## Troubleshooting: "There was an error deploying from source"

1. **Root Directory** — Settings → Source → **Add Root Directory** → enter `backend`. Without this, Railway builds from repo root and fails (no requirements.txt there).

2. **Push to trigger** — Push a commit to `opticini-dev`. Manual deploy of a stale build can fail.

3. **Builder** — If Nixpacks fails, try Settings → Build → Builder → **Nixpacks** (or switch to Railpack).

4. **View logs** — Deployments → click failed deploy → View logs for the actual error.