import API from "@/lib/axios";
import { AuthPayload, AuthResponse } from "@/types";

export const loginUser = async (
  payload: AuthPayload
): Promise<AuthResponse> => {
  const response = await API.post("/auth/login", payload);
  return response.data;
};

export const registerUser = async (
  payload: AuthPayload
): Promise<AuthResponse> => {
  const response = await API.post("/auth/register", payload);
  return response.data;
};

export const refreshToken = async (): Promise<{ accessToken: string }> => {
  const response = await API.post("/auth/refresh");
  return response.data;
};
