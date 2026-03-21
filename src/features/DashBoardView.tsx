// {
//   "message": "Only the first 1000 search results are available",
//   "documentation_url": "https://docs.github.com/v3/search/",
//   "status": "422"
// }

import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/datatable";
import { api } from "@/services/api";
import type {
  GitHubRepoItem,
  GitHubSearchResponse,
} from "@/types/github.types";

export default function DashBoardView() {
  const [query, setQuery] = useState("react");
  const [results, setResults] = useState<GitHubRepoItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pages, setPages] = useState(0);

  const PER_PAGE = 100;
  const MAX_LIMIT = 1000;

  const columns = useMemo<ColumnDef<GitHubRepoItem>[]>(
    () => [
      {
        accessorKey: "full_name",
        header: "Repository",
        cell: ({ row }) => {
          const repo = row.original;

          return (
            <div className="max-w-60">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="block text-header font-bold hover:underline wrap-break-word"
              >
                {repo.full_name}
              </a>
              <p className="text-xs text-header truncate">
                {repo.description || "No description"}
              </p>
            </div>
          );
        },
      },
      {
        accessorFn: (row) => row.owner.login,
        id: "owner",
        header: "Owner",
      },
      {
        accessorKey: "language",
        header: "Language",
        cell: ({ row }) => row.original.language || "-",
      },
      {
        accessorKey: "stargazers_count",
        header: "Stars",
      },
      {
        accessorKey: "forks_count",
        header: "Forks",
      },
      {
        accessorKey: "open_issues_count",
        header: "Issues",
      },
      {
        accessorKey: "score",
        header: "Score",
        cell: ({ row }) => row.original.score.toFixed(2),
      },
    ],
    [],
  );

  const languageOptions = useMemo(() => {
    return Array.from(
      new Set(results.map((repo) => repo.language).filter(Boolean) as string[]),
    ).sort();
  }, [results]);

  const handleSearch = async () => {
    const _query = query.trim();

    if (!_query) {
      setResults([]);
      setTotalCount(0);
      setError("Enter a search value.");
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);
    setPages(0);

    try {
      const first = await api.get<GitHubSearchResponse>(
        `/search/repositories?q=${encodeURIComponent(_query)}&page=1&per_page=${PER_PAGE}`,
      );

      const total = first.total_count ?? 0;
      setTotalCount(total);

      const accessibleTotal = Math.min(total, MAX_LIMIT);
      const pagesToFetch = Math.ceil(accessibleTotal / PER_PAGE);

      const allItems = [...(first.items ?? [])];
      setPages(1);

      // Fetch rest
      for (let p = 2; p <= pagesToFetch; p++) {
        const response = await api.get<GitHubSearchResponse>(
          `/search/repositories?q=${encodeURIComponent(_query)}&page=${p}&per_page=${PER_PAGE}`,
        );
        allItems.push(...(response.items ?? []));
        setPages(p);
        setResults([...allItems]);
      }

      setResults(allItems);
    } catch (e) {
      setResults([]);
      setTotalCount(0);
      setError((e as Error).message || "Failed to fetch repositories.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      <div className="search-wrapper">
        <div className="search-bar">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search repositories"
            className="search-input"
          />

          <button
            type="button"
            onClick={handleSearch}
            disabled={loading}
            className="btn-search"
          >
            {loading ? `Loading...` : "Search"}
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-label">Total Records</p>
            <p className="stat-value">{totalCount.toLocaleString()}</p>
          </div>

          <div className="stat-card">
            <p className="stat-label">Rows Count</p>
            <p className="stat-value">{results.length}</p>
          </div>
        </div>

        {error ? <p className="mt-4 text-error">{error}</p> : null}
        {/* {error ? toast.error(error) : null} */}
      </div>

      <div className="table-wrapper">
        <DataTable
          columns={columns}
          data={results}
          filterColumn="language"
          filterOptions={languageOptions}
        />
      </div>
    </section>
  );
}
