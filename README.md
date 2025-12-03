# Football Manager

Application de gestion de club de football amateur (SaaS).

## Structure du Projet

- `apps/web` : Frontend (Next.js 15, React, Tailwind)
- `apps/api` : Backend (FastAPI, SQLModel, PostgreSQL)
- `infra` : Infrastructure (Docker Compose)

## Pré-requis

- Node.js 18+
- Python 3.11+
Start the database:
```bash
docker-compose -f infra/docker-compose.yml up -d
```
