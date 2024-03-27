/* CONFIG */
import { config } from "@/config"

const nodeEnvironment = process.env.NODE_ENV;

/* Fetch */
export const apiClient = async (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response> => {
  return await fetch(`${config.url.backend[nodeEnvironment]}/api/${input}`, init);
} 