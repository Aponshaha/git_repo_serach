# GitHub Repo Search

React SPA app : searches GitHub repositories (GitHub Search API) and shows results in a sorted, filterable data table using tanstack table components.

## Tech Stack

```
Node Js: v22.x (LTS) or higher
React
Vite
Tailwind css
```

## Project Structure

```
src/
├── components/
│   ├── Layout.tsx             # Shared page layout (navbar + Outlet)
│   └── ui/                    # Reusable shadcn/ui components
│       ├── button.tsx
│       ├── datatable.tsx      # Generic DataTable - works with any column/data shape
│       ├── table.tsx
│       └── sonner.tsx
├── core/
│   └── http/client.ts         # Reusable HTTP client (fetch wrapper)
├── services/
│   └── api.ts                 # Base API layer
├── features/
│   └── DashBoardView.tsx      # Main UI view (search + results)
├── types/
│   └── github.types.ts        # TypeScript interfaces
└── App.tsx                    # Router setup
```

### Reusable Components

- **`DataTable`** — A generic, reusable table component that accepts any ColumnDef[] and data[]. Supports sorting, filtering by column, and pagination out of the box.
- **`Layout`** — Shared layout wrapper with navbar, renders child routes via <Outlet />.
- **`httpClient`** — Centralized fetch wrapper in core/http/client.ts used by all API calls.
- **`Tailwind`** — Centralized tailwind styles with base style calsses.

### Hooks

- **`useMemo`** — Used in DashBoardView to memoize column definitions and language filter options, no sideeffects as we are doing just fetch(no useEffect needed), preventing unnecessary re-renders.

## Limitation and pagination:

```
GitHub API limit: max 1000 results per search query (Unauthenticated w/o access token)
PER_PAGE: 100 results per request
Max pages: 1000 / 100 = 10 requests
UI: 10 rows each page, 1000/10 = 100 pages
```

## Setup

### Clone and Install

```bash
git clone https://github.com/Aponshaha/git_repo_search.git
cd GIT_REPO_SEARCH
npm install
```

### environment

Create a .env file from .env.example

```bash
cp .env.example .env
```

env includes:
VITE_GITHUB_API_BASE=https://api.github.com

### Install & Run

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

## Docker

### Build & Run with Docker Compose

```bash
docker compose up --build
```

### Stop docker

```bash
docker compose down
```

Open `http://localhost:8080`

Dockerfile uses a multi-stage build:

**development** — installs dependencies
**build** — runs `npm run build`, outputs to `dist/`
**nginx:alpine** — serves the static build artifacts
