import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";
import { Group } from "@/types/group/Group";
import { Message } from "@/types/message/Message";
import { GetMessagesByGroup } from "@/services/chatServices/MessageService";
import moment from "moment";
import { DATE_TIME_FORMAT } from "@/config/dateTimeFormat";
import { UseQueryResult } from "@tanstack/react-query";
import { User } from "@/types/user/User";
import { GroupDetail } from "@/types/group/GroupDetail";

export interface ChatGroupContextType {
  currentGroupDetail: GroupDetail | null;
  //setCurrentGroup: (group: Group | null) => void;
  messages: Message[];
  fetchNextMessages: () => UseQueryResult<Message[], Error>;
  appendMessages: (newMessages: Message[]) => void;
  //   fetchMessages: (groupId: string, dateTimeCursor?: Date) => void;
}

const ChatGroupContext = createContext<ChatGroupContextType | null>(null);

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
export const useChatGroupContext = () => {
  const context = useContext(ChatGroupContext);
  if (!context) {
    throw new Error(
      "useChatGroupContext must be used within a ChatGroupProvider"
    );
  }
  return context;
};

export interface ChatGroupProviderProps extends React.PropsWithChildren {
  /**
   * The currently selected group in the chat application.
   * This determines the context of the chat group being displayed or interacted with.
   *
   * @type {Group | null}
   */
  currentSelectedGroupDetail: GroupDetail | null;

  /**
   * The timestamp of the last message in the chat group.
   * This is used to fetch messages starting from this point in time.
   * If not provided, the current date and time will be used as the default.
   * Fromat is : YYYY-MM-DD HH:mm:ss ( this is required )
   *
   * @type {string | undefined}
   */
  dateTimeFromLastMessage?: string;
}
export const ChatGroupProvider = ({
  currentSelectedGroupDetail,
  children,
  dateTimeFromLastMessage,
}: ChatGroupProviderProps) => {
  //   const [currentGroup, setCurrentGroup] = useState<Group | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const appendMessages = (newMessages: Message[]) => {
    setMessages((prevMessages) =>
      [...prevMessages, ...newMessages].filter(onlyUnique)
    );
  };
  const fetchNextMessages = () => {
    if (!currentSelectedGroupDetail)
      throw new Error("currentGroup is null. Cannot fetch messages.");
    // we sort by asce since we want to POP() , the pop is at the end of the array
    // so the end need to be largest
    let dateTimeCursor = moment(new Date(), DATE_TIME_FORMAT).toDate();
    let latestMessages = messages
      .sort(
        (first, second) =>
          first.CreatedAt.getTime() - second.CreatedAt.getTime()
      )
      .pop();
    if (latestMessages) {
      dateTimeCursor = latestMessages.CreatedAt;
    }
    console.log("yea check fetch ok");
    return GetMessagesByGroup(
      currentSelectedGroupDetail.Group.Id,
      dateTimeCursor,
      10
    );
  };
  const dateTimeCursor = React.useMemo(() => {
    return dateTimeFromLastMessage || moment(new Date());
  }, [currentSelectedGroupDetail.Group]);
  const {
    data: fetchedMessages,
    isLoading,
    isError,
  } = GetMessagesByGroup(
    currentSelectedGroupDetail.Group?.Id,
    moment(dateTimeCursor, DATE_TIME_FORMAT).toDate()
  );

  useEffect(() => {
    if (fetchedMessages && !isLoading && !isError) {
      appendMessages(fetchedMessages);
    }
  }, [isLoading, isError]);

  return (
    <ChatGroupContext.Provider
      value={{
        currentGroupDetail: currentSelectedGroupDetail,
        //setCurrentGroup,
        messages,
        fetchNextMessages,
        appendMessages,
      }}
    >
      {children}
    </ChatGroupContext.Provider>
  );
};
