type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

const API_BASE =
  import.meta.env.VITE_GITHUB_API_BASE || "http://localhost:3000/api";

async function httpRequest<T>(
  endpoint: string,
  method: HttpMethod,
  body?: unknown,
  init?: RequestInit,
): Promise<T> {
  const headers = new Headers(init?.headers);

  headers.set("Content-Type", "application/json");

  // if (accessToken && !headers.has("Authorization")) {
  //   headers.set("Authorization", `Bearer ${accessToken}`);
  // }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method,
    ...init,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const payload = await res.json().catch(() => ({}));

  if (!res.ok) {
    const p = payload as { message?: string; error?: string } | null;
    const message = p?.message || p?.error || `HTTP ${res.status}`;
    throw new Error(message);
  }

  const p = payload as { data?: T } | null;
  return p?.data ?? (payload as T);
}

export const httpClient = {
  get: <T>(endpoint: string, init?: RequestInit) =>
    httpRequest<T>(endpoint, "GET", undefined, init),

  post: <T>(endpoint: string, body: unknown, init?: RequestInit) =>
    httpRequest<T>(endpoint, "POST", body, init),

  patch: <T>(endpoint: string, body: unknown, init?: RequestInit) =>
    httpRequest<T>(endpoint, "PATCH", body, init),

  delete: <T>(endpoint: string, init?: RequestInit) =>
    httpRequest<T>(endpoint, "DELETE", undefined, init),
};
