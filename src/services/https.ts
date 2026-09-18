import { ENV } from "@/helper/env";
import { tokenStorage } from "@/utils/tokenStorage";
import { HttpError } from "./http-error";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type ContentType = "json" | "form" | "urlencoded";

interface RequestOptions {
  method?: HttpMethod;
  body?: any;
  queryParams?: Record<string, any>;
  headers?: Record<string, string>;
  type?: ContentType;
  timeout?: number;
}

const BASE_URL = ENV.BACKEND_BASE_URL;

const getHeaders = (
  type: ContentType = "json",
  customHeaders: Record<string, string> = {}
): Record<string, string> => {
  const token = tokenStorage.get();

  const headers: Record<string, string> = {
    ...customHeaders,
  };

  if (type === "form") {
    headers["Content-Type"] = "multipart/form-data";
  } else if (type === "urlencoded") {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
  } else {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

const buildQueryString = (params?: Record<string, any>): string => {
  if (!params) return "";

  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });

  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
};

const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout = 10000,
): Promise<Response> => {
  const controller = new AbortController();

  const timer = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
};

const request = async <T = any>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> => {
  const {
    method = "GET",
    body,
    queryParams,
    headers = {},
    type = "json",
    timeout = 10000,
  } = options;

  const url = `${BASE_URL}${endpoint}${buildQueryString(queryParams)}`;

  const config: RequestInit = {
    method,
    headers: getHeaders(type, headers),
  };

  if (body !== undefined && method !== "GET") {
    if (type === "form") {
      delete (config.headers as Record<string, string>)["Content-Type"];
      config.body = body;
    } else if (type === "urlencoded") {
      config.body = new URLSearchParams(body).toString();
    } else {
      config.body = JSON.stringify(body);
    }
  }

  try {
    const response = await fetchWithTimeout(url, config, timeout);

    const contentType = response.headers.get("content-type");

    let data: any;

    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new HttpError(
        data?.message || "Request failed",
        "HttpError",
        response.status,
        data
      );
    }

    return data;
  } catch (error: unknown) {
    if (error instanceof HttpError) {
      throw error;
    }

    if (error instanceof Error && error.name === 'AbortError') {
      throw error;
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Some unknown error occurred");
  }
};

export const http = {
  get: <T = any>(
    url: string,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ) => request<T>(url, { method: "GET", queryParams: params, headers }),

  post: <T = any>(
    url: string,
    body?: any,
    type: ContentType = "json",
    headers?: Record<string, string>
  ) => request<T>(url, { method: "POST", body, type, headers }),

  put: <T = any>(
    url: string,
    body?: any,
    type: ContentType = "json",
    headers?: Record<string, string>
  ) => request<T>(url, { method: "PUT", body, type, headers }),

  patch: <T = any>(
    url: string,
    body?: any,
    type: ContentType = "json",
    headers?: Record<string, string>
  ) => request<T>(url, { method: "PATCH", body, type, headers }),

  delete: <T = any>(
    url: string,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ) => request<T>(url, { method: "DELETE", queryParams: params, headers }),
};

export default http;
