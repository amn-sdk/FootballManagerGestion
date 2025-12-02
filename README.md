# Football Manager

A professional-grade SaaS tool for amateur football clubs.

## Structure

- `apps/web`: Next.js Frontend
- `apps/api`: FastAPI Backend
- `infra`: Infrastructure configuration (Docker)

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js 20+
- Python 3.11+
- Poetry (optional, but recommended for Python)

### Database
Start the database:
```bash
docker-compose -f infra/docker-compose.yml up -d
```
