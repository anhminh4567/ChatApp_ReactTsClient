import { User } from "@/types/user/User";
import { ChatHttpClient, UserHttpClient } from "@/utils/HttpClient";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
const BASE_API_CALL = "api";

// Fetch all users
const getAllUsers = async () => {
  const response = await UserHttpClient.get(`${BASE_API_CALL}/user/all`);
  return response.data;
};

// Fetch user details by ID
const getUserByIdentityId = (id: string): UseQueryResult<User, Error> => {
  return useQuery({
    queryKey: ["getUserByIdentityId", id],
    queryFn: async () => {
      const response = await UserHttpClient.get(
        `${BASE_API_CALL}/user/${id}/detail`
      );
      return response.data;
    },
  });
};

export { getAllUsers, getUserByIdentityId };
