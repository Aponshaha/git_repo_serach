# GitHub Repo Search

A Simple React SPA app that searche GitHub repositories using GitHub Search API and shows results in a sorted, filterable data table.

## Tech Stack

Node Js
React
Vite
Tailwind css

## Project Structure

<pre> ```bash src/ ├── components/ │ ├── Layout.tsx # Shared page layout (navbar + Outlet) │ └── ui/ # Reusable shadcn/ui primitives │ ├── button.tsx │ ├── datatable.tsx # Generic DataTable - works with any column/data shape │ ├── table.tsx │ └── sonner.tsx ├── core/ │ └── http/client.ts # Reusable HTTP client (fetch wrapper) ├── services/ │ └── api.ts # Base API layer ├── features/ │ └── DashBoardView.tsx # Main UI view (search + results) ├── types/ │ └── github.types.ts # TypeScript interfaces └── App.tsx # Router setup ``` </pre>

### Reusable Components

- **`DataTable`** — A generic, reusable table component that accepts any ColumnDef[] and data[]. Supports sorting, filtering by column, and pagination out of the box.
- **`Layout`** — Shared layout wrapper with navbar, renders child routes via <Outlet />.
- **`httpClient`** — Centralized fetch wrapper in core/http/client.ts used by all API calls.
- **`Tailwind`** — Centralized tailwind styles with base style calsses.

### Hooks

- **`useMemo`** — Used in DashBoardView to memoize column definitions and language filter options, no sideeffects as we are doing just fetch(no useEffect needed), preventing unnecessary re-renders.

## Setup

### 1. Environment Variables

```bash
cp .env.example .env
```

`.env.example` has:

```
VITE_GITHUB_API_BASE=https://api.github.com
```

### 2. Install & Run

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

Open `http://localhost:8080`

The Dockerfile uses a multi-stage build:

1. **development** — installs dependencies
2. **build** — runs `npm run build`, outputs to `dist/`
3. **nginx:alpine** — serves only the static build artifacts (~25MB final image)
