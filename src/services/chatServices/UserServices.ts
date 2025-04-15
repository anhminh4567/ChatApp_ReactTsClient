import { ChatHttpClient } from "@/utils/HttpClient";
const BASE_API_CALL = "api";

// Fetch all users
const getAllUsers = async () => {
  const response = await ChatHttpClient.get(`${BASE_API_CALL}/users/all`);
  return response.data;
};

// Fetch user details by ID
const getUserById = async (id: string) => {
  const response = await ChatHttpClient.get(`${BASE_API_CALL}/users/${id}`);
  return response.data;
};

export { getAllUsers, getUserById };
