"use client";

import axios, { AxiosError, AxiosResponse } from "axios";

export const axiosInstance = axios.create({
  timeout: 30 * 1000,
});

axiosInstance.interceptors.request.use((config) => {
  config.baseURL = process.env.NEXT_PUBLIC_APP_API_URL;

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export function parseError(error: unknown) {
  if (error instanceof AxiosError) {
    return parseAxiosError(error);
  }

  if (error instanceof Error) return error.message;

  if (typeof error === "string") return error;

  return "Unknown error";
}

function parseAxiosError(error: AxiosError) {
  const response = error.response;
  if (!response) return "Unknown error";

  const data = response.data as Record<string, unknown>;
  if (!data) return "Unknown error";

  if (checkRouteNotFoundError(response, data)) return "Unknown route error";

  const message = data.message;
  if (!message) return "Unknown error";

  if (Array.isArray(message)) {
    return message.map((m) => m.toString()).join("\n");
  }

  if (typeof message === "string") return message;

  return "Unknown error";
}

function checkRouteNotFoundError(response: AxiosResponse<unknown>, data: Record<string, unknown>) {
  if (response.status !== 404) return false;

  const message = data.message;
  if (!message) return false;
  if (typeof message !== "string") return false;

  return (
    message.startsWith("Cannot GET") ||
    message.startsWith("Cannot POST") ||
    message.startsWith("Cannot PUT") ||
    message.startsWith("Cannot DELETE") ||
    message.startsWith("Cannot PATCH")
  );
}
