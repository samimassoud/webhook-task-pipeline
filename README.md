# Webhook-Driven Task Processing Pipeline

An event-driven backend service that receives webhooks, processes them asynchronously through a background job system, and delivers results to registered subscribers. Conceptually similar to Zapier — an inbound event triggers a processing step, and the result is forwarded to one or more destinations.

---

## How It Works

1. A client sends a webhook to a pipeline's ingest URL
2. The system queues a job and responds immediately with `202 Accepted`
3. A background worker picks up the job and runs the configured processor
4. The result is stored and delivered to all registered subscriber URLs
5. If delivery fails, the system retries on an exponential backoff schedule
6. Regardless of delivery outcome, the result is always retrievable via the jobs API

---

## Tech Stack

| Layer | Technology |
|---|---|
| Language | TypeScript |
| Runtime | Node.js |
| HTTP Framework | Express |
| Database | PostgreSQL |
| ORM | Drizzle |
| Containerization | Docker & Docker Compose |
| CI/CD | GitHub Actions |

---

## Project Structure

```
src/
  api/          HTTP layer — routes, validation, request handling
  worker/       Background job processor and webhook delivery worker
  processors/   Pluggable processing action implementations
  services/     Business logic and orchestration
  repositories/ All database access
  types/        Shared TypeScript interfaces
```

The API server and worker run as two separate processes, sharing the same database. In development they are started independently; in production they run as separate containers under Docker Compose.

---

## Getting Started

### Prerequisites

- Docker and Docker Compose

### Run

```bash
docker compose up
```

This starts PostgreSQL, runs database migrations, and launches both the API server and the background worker.

The API is available at `http://localhost:3000`.

### Development

To run the two processes locally without Docker:

```bash
# Terminal 1 — API server
npm run dev:api

# Terminal 2 — Background worker
npm run dev:worker
```

Requires a running PostgreSQL instance. Configure the connection via `DATABASE_URL` in a `.env` file (see `.env.example`).

---

## Processors

Each pipeline is configured with one of three processor types:

| Processor | Description |
|---|---|
| `httpEnrich` | Looks up a payload field against an external HTTP API and merges the response |
| `jsonTransform` | Restructures a JSON payload by extracting, renaming, and adding fields |
| `textSummarize` | Extracts a text field and returns a sentence summary with keyword extraction |

---

## API Reference

Full API documentation — including endpoint specs, processor config schemas, payload requirements, error responses, and rate limits — is in [`src/api/README.md`](src/api/README.md).

---

## CI/CD

GitHub Actions runs on every push and pull request:

- Type checking with `tsc --noEmit`
- Linting
- Tests against a real PostgreSQL instance
- Build verification
- Docker Compose smoke test on `main`
