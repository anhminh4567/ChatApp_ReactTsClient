import { Group } from "@/types/group/Group";
import { ChatHttpClient } from "@/utils/HttpClient";
import {
  useQuery,
  useMutation,
  useSuspenseQuery,
  UseQueryResult,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
const BASE_API_CALL = "api";
const getGroupsForUser = (
  userId: string,
  onSuccess?: (groups: Group[]) => void
) => {
  return useQuery<Group[]>({
    queryKey: ["groupsForUser", userId],
    queryFn: async () => {
      // deplay 1 sec
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await ChatHttpClient.get(
        `${BASE_API_CALL}/groups/get-for-user`,
        {
          params: { UserId: userId },
        }
      );
      if (onSuccess) onSuccess(response.data);
      return response.data;
    },
  });
};
// Fetch all groups
const getAllGroups = () => {
  return useQuery({
    queryKey: ["allGroups"],
    queryFn: async () => {
      const response = await ChatHttpClient.get(`${BASE_API_CALL}/groups/all`);
      return response.data;
    },
  });
};

// Fetch group details by groupId
const getGroupDetails = (groupId: string) => {
  return useQuery({
    queryKey: ["groupDetails", groupId],
    queryFn: async () => {
      const response = await ChatHttpClient.get(
        `${BASE_API_CALL}/groups/${groupId}/detail`
      );
      return response.data;
    },
  });
};

const createPrivateGroup = (payload: {
  initiatorId: string;
  friendId: string;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createPrivateGroup"],
    mutationFn: async () => {
      const response = await ChatHttpClient.post(
        `${BASE_API_CALL}/groups/create-private-group`,
        payload
      );
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["groupsForUser", payload.initiatorId],
      });
      queryClient.invalidateQueries({
        queryKey: ["groupsForUser", payload.friendId],
      });
      queryClient.invalidateQueries({
        queryKey: ["allGroups"],
      });
    },
  });
};

// Create a group
const createGroup = (payload: {
  name: string;
  creatorId: string;
  participants: string[];
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createGroup"],
    mutationFn: async (payload) => {
      const response = await ChatHttpClient.post(
        `${BASE_API_CALL}/groups/create-group`,
        payload
      );
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["groupsForUser", payload.creatorId],
      });
      payload.participants.forEach((participantId) => {
        queryClient.invalidateQueries({
          queryKey: ["groupsForUser", participantId],
        });
      });
      queryClient.invalidateQueries({
        queryKey: ["allGroups"],
      });
    },
  });
};

// Remove a group
const removeGroup = (payload: { groupId: string; creatorId?: string }) => {
  return useMutation({
    mutationKey: ["removeGroup"],
    mutationFn: async (payload) => {
      const response = await ChatHttpClient.post(
        `${BASE_API_CALL}/groups/remove-group`,
        payload
      );
      return response.data;
    },
  });
};

export {
  getGroupsForUser,
  getAllGroups,
  getGroupDetails,
  createPrivateGroup,
  createGroup,
  removeGroup,
};
