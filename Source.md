# Railway Backend Settings

## Source Repo
fxepro/opticiniv4

## Root Directory
backend

## Branch
main

## Networking
Public Networking
opticiniv4-backend-opticini-dev.up.railway.app

Proxied domain and port
switchback.proxy.rlwy.net:45605

## Variables

### DATABASE_URL
${{Postgres.DATABASE_PRIVATE_URL}}

### SECRET_KEY
Generate: `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"`
-----------------------------------------------------------------
e(d5vst$-w(dn!2zu3(hhsnlx4ch7-%d!@&llr(ocg9f+g7eyj
-----------------------------------------------------------------
### DEBUG
False

### ALLOWED_HOSTS
*

### CORS_ALLOWED_ORIGINS
https://opticini.com,https://www.opticini.com,https://aquamarine-dusk-c48b4d.netlify.app

## Start Command
`/bin/sh -c "gunicorn core.wsgi:application --bind 0.0.0.0:$PORT"` (shell required so $PORT expands)

## Networking
Public domain: Settings → Networking → Generate Domain

## Build
Builder: Railpack

(If Railway auto-switches to Dockerfile and build fails, change back: Settings → Build → Builder → Railpack)

## Netlify (frontend)
Site settings → Environment variables → Add:
- `NEXT_PUBLIC_API_BASE_URL` = `https://opticiniv4-backend-opticini-dev.up.railway.app`
Then trigger a new deploy (required for NEXT_PUBLIC_* vars).

## Deploy
Restart Policy: On Failure
Max restart retries: 10
