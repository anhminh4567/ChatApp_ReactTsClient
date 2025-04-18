import { User } from "@/types/user/User";
import { ChatHttpClient, UserHttpClient } from "@/utils/HttpClient";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
const BASE_API_CALL = "api";
const USER_DETAIL_KEY = "userDetail";
// Fetch all users
const getAllUsers = async () => {
  const response = await UserHttpClient.get(`${BASE_API_CALL}/user/all`);
  return response.data;
};

// Fetch user details by ID
const getUserDetailByToken = (idToken: string): UseQueryResult<User, Error> => {
  return useQuery({
    queryKey: [USER_DETAIL_KEY, idToken.substring(0, 20)],
    queryFn: async () => {
      const response = await UserHttpClient.postForm(
        `${BASE_API_CALL}/user/check-id-token-exist-user`,
        {
          idToken: idToken,
        }
      );
      return response.data;
    },
  });
};
const getUserDetailByIdentityId = (id: string): UseQueryResult<User, Error> => {
  return useQuery({
    queryKey: [USER_DETAIL_KEY, id],
    queryFn: async () => {
      const response = await UserHttpClient.get(
        `${BASE_API_CALL}/user/${id}/detail`
      );
      return response.data;
    },
  });
};

export { getAllUsers, getUserDetailByIdentityId, getUserDetailByToken };
