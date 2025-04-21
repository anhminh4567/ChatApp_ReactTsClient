import { DATE_TIME_FORMAT } from "@/config/dateTimeFormat";
import { Group } from "@/types/group/Group";
import { Message } from "@/types/message/Message";
import { User } from "@/types/user/User";
import { ChatHttpClient } from "@/utils/HttpClient";
import { getSignalRConnection } from "@/utils/RealTimeConnection";
import {
  useQuery,
  useMutation,
  useSuspenseQuery,
  UseQueryResult,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { Form } from "antd";
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
const GetMessagesByGroup = async (
  groupId: string,
  dateTimeCursor: Date,
  take?: number
) => {
  if (!take) take = 20;
  let dateTimeAsString: string =
    moment(dateTimeCursor).format(DATE_TIME_FORMAT);
  const response = await ChatHttpClient.get<Message[]>(
    `${BASE_API_CALL}/messages/paging`,
    {
      params: {
        GroupId: groupId,
        DateTimeCursor: moment(dateTimeCursor).toISOString(true),
        Take: take,
      },
    }
  );
  console.log(response.data);
  return response.data;

  // return useQuery({
  //   queryKey: ["messages", "paging", groupId, dateTimeCursor, take],
  //   queryFn:
  //   retry: false,
  //   enabled: !!groupId, // Only fetch if groupId is provided
  // });
};
const SendMessage = async (
  group: Group,
  sender: User,
  content: string,
  refernceMessage?: Message,
  attachements?: File[]
) => {
  let body = new FormData();
  body.append("groupId", group.Id);
  body.append("message.SenderId", sender.Id);
  body.append("message.Content", content);
  if (refernceMessage) {
    body.append("message.ReferenceMessageId", refernceMessage.Id);
  }
  if (attachements) {
    attachements.forEach((file) => {
      body.append("attachments", file);
    });
  }
  const response = await ChatHttpClient.postForm<Message>(
    `${BASE_API_CALL}/messages`,
    body
  );
  return response.data;
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

export const RealTimeService = {};
