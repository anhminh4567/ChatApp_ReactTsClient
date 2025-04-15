import { DATE_TIME_FORMAT } from "@/config/dateTimeFormat";
import { Group } from "@/types/group/Group";
import { Message } from "@/types/message/Message";
import { ChatHttpClient } from "@/utils/HttpClient";
import {
  useQuery,
  useMutation,
  useSuspenseQuery,
  UseQueryResult,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import moment from "moment";
const BASE_API_CALL = "api";
const GetAllMessages = (): UseQueryResult<any> => {
  return useQuery({
    queryKey: ["messages", "all"],
    queryFn: async () => {
      const response = await ChatHttpClient.get(
        `${BASE_API_CALL}/messages/all`
      );
      return response.data;
    },
  });
};

// Fetch paginated messages for a group
const GetMessagesByGroup = (
  groupId: string,
  dateTimeCursor: Date,
  take?: number
): UseQueryResult<Message[], Error> => {
  let dateTimeAsString: string =
    moment(dateTimeCursor).format(DATE_TIME_FORMAT);
  if (!take) take = 20;
  return useQuery({
    queryKey: ["messages", "paging", groupId, dateTimeCursor, take],
    queryFn: async () => {
      const response = await ChatHttpClient.get(
        `${BASE_API_CALL}/messages/paging`,
        {
          params: {
            GroupId: groupId,
            DateTimeCursor: dateTimeAsString,
            Take: take,
          },
        }
      );
      console.log(response.data);
      return response.data;
    },
    retry: false,
    enabled: !!groupId, // Only fetch if groupId is provided
  });
};
const SendMessage = (): UseMutationResult<Message[], Error> => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await ChatHttpClient.postForm(
        `${BASE_API_CALL}/messages`,
        formData
      );
      return response.data;
    },
  });
};
const DeleteMessage = (): UseMutationResult<
  undefined,
  Error,
  { messageId: string; groupId: string; senderId: string }
> => {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await ChatHttpClient.delete(
        `${BASE_API_CALL}/messages`,
        {
          data: payload,
        }
      );
      return response.data;
    },
  });
};
export { GetAllMessages, GetMessagesByGroup, SendMessage, DeleteMessage };
