import { getToken, removeToken } from "./auth";

export async function apiFetch(url: string, options: RequestInit = {}) {
  const token = getToken();

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),

      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
  });

  if (res.status === 401) {
    console.error("Unauthorized");
    return res;
  }

  return res;
}
