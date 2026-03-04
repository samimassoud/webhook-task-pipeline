# Webhook-Driven Task Processing Pipeline

## 📌 Project Type

This project is an **event-driven backend service** that processes inbound webhooks asynchronously through a background job system and delivers results to registered subscribers.

It is a simplified automation engine — similar in concept to systems like Zapier — where:

1. An incoming webhook triggers an event
2. The event is queued as a job
3. A worker processes the job
4. The processed result is delivered to one or more subscribers

The system emphasizes **clean architecture**, **reliability**, **separation of concerns**, and **asynchronous processing**.

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Language | TypeScript |
| Runtime | Node.js |
| HTTP Layer | Express |
| Database | PostgreSQL |
| Containerization | Docker & Docker Compose |
| CI/CD | GitHub Actions |

The system is designed to run fully locally using:

```bash
docker compose up
```

---

## 🏗 Architecture Overview

The project follows a modular, layered structure to ensure clear separation of concerns.

```
/src
  /api
  /worker
  /processors
  /services
  /repositories
  /types
```

### 📂 `/api`
Contains the HTTP layer.

**Responsibilities:**
- Define Express routes
- Handle request validation
- Insert jobs into the queue
- Manage CRUD operations for pipelines
- Return appropriate HTTP responses

> This layer does not contain business logic.

---

### 📂 `/worker`
Contains the background job processor.

**Responsibilities:**
- Poll queued jobs
- Update job status transitions
- Execute processing actions
- Trigger delivery to subscribers
- Handle retry logic

> The worker runs independently from the API server.

---

### 📂 `/processors`
Contains pluggable processing action implementations.

Each processor:
- Accepts an input payload
- Applies transformation or logic
- Returns processed output

> This layer allows new processing types to be added without modifying core infrastructure logic.

---

### 📂 `/services`
Contains business logic.

**Responsibilities:**
- Orchestrate job execution
- Manage retry behavior
- Coordinate delivery logic
- Handle state transitions

> This layer connects repositories and processors together.

---

### 📂 `/repositories`
Responsible for database interaction.

**Responsibilities:**
- Query pipelines
- Insert jobs
- Update job statuses
- Store delivery attempts
- Persist subscriber data

> All database access is centralized here to keep the architecture clean and testable.

---

### 📂 `/types`
Shared TypeScript types and interfaces used across the application.

This ensures:
- Strong typing across layers
- Clear contracts between modules
- Easier refactoring and maintainability

---

## 🎯 Design Philosophy

This project is intentionally built with:

- **Clear separation** between API and worker
- **Asynchronous** job processing
- **Durable** job storage in the database
- **Extensible** processing actions
- **Reliability** as a first-class concern

The goal is not just functionality, but architectural clarity and production-style thinking.

---

## 🚧 Current Status

Initial project skeleton and modular structure have been created.

**Next steps include:**
- [ ] Database schema design
- [ ] Pipeline CRUD implementation
- [ ] Webhook ingestion endpoint
- [ ] Job queue implementation
- [ ] Background worker processing loop

---

## 📦 Running the Project *(Coming Soon)*

Full Docker Compose setup and environment configuration will be documented once the core services are implemented.