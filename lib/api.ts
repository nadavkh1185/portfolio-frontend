import { getToken } from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = getToken();
  const isAbsoluteUrl = /^https?:\/\//i.test(path);

  if (!BASE_URL && !isAbsoluteUrl) {
    console.error("BASE URL NOT FOUND");
    return null;
  }

  const resolvedPath = isAbsoluteUrl
    ? path
    : `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const res = await fetch(resolvedPath, {
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
