import { toast } from "sonner";
import { httpClient } from "@/core/http/client";

export const api = {
  get: async <T>(endpoint: string) => {
    try {
      return await httpClient.get<T>(endpoint);
    } catch (error) {
      toast.error((error as Error).message || "API Error");
      throw error;
    }
  },

  post: async <T>(endpoint: string, body: unknown) => {
    try {
      return await httpClient.post<T>(endpoint, body);
    } catch (error) {
      toast.error((error as Error).message || "API Error");
      throw error;
    }
  },

  patch: async <T>(endpoint: string, body: unknown) => {
    try {
      return await httpClient.patch<T>(endpoint, body);
    } catch (error) {
      toast.error((error as Error).message || "API Error");
      throw error;
    }
  },

  delete: async <T>(endpoint: string) => {
    try {
      return await httpClient.delete<T>(endpoint);
    } catch (error) {
      toast.error((error as Error).message || "API Error");
      throw error;
    }
  },
};
