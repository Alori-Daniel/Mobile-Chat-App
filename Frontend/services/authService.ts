import { API_URL } from "@/constants";
import axios from "axios";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    console.log(error);
    const errorResponse = error?.response?.data.msg || "Login Failed";
    throw new Error(errorResponse);
  }
};

export const register = async (
  name: string,
  email: string,
  password: string,
  avatar?: string
) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    console.log("reg error", error.response.data);
    const errorResponse = error?.response?.data.msg || "Registration Failed";
    console.log("errorResponse", errorResponse);
    throw new Error(errorResponse);
  }
};
