import { UserContextType } from "@/types/shared/UserContextType";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { getGroupsForUser } from "@/services/chatServices/GroupServices";
import {
  getUserDetailByIdentityId,
  getUserDetailByToken,
} from "@/services/chatServices/UserServices";
import { Group } from "@/types/group/Group";
import { useInfiniteQuery, useQueries } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";
import { getSignalRConnection } from "@/utils/RealTimeConnection";
import { useSecretContext } from "@/app/providers/SecretProvider";
import { Message } from "@/types/message/Message";
import moment from "moment";
import { DATE_TIME_FORMAT } from "@/config/dateTimeFormat";
import { GetMessagesByGroup } from "@/services/chatServices/MessageService";
import { ChatReceiverMethod } from "@/types/signalRmethods/ChatReceiver";

const UserContext = createContext<UserContextType | null>(null);

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("use user must be used within an AuthProvider");
  }
  return context;
}

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated } = useAuth();
  const { ApplicationConfig } = useSecretContext();
  const [chatGroups, setChatGroups] = useState<Record<string, Message[]>>({});
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  function updateChatGroups(
    prev: Record<string, Message[]>,
    groupId: string,
    newMessages: Message[]
  ): Record<string, Message[]> {
    const prevMessages = prev[groupId] || [];
    const uniqueMessages = new Map<string, Message>();
    prevMessages.forEach((message) => uniqueMessages.set(message.Id, message));
    newMessages.forEach((message) => uniqueMessages.set(message.Id, message));
    const sortedMessages = Array.from(uniqueMessages.values()).sort(
      (a, b) =>
        new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime()
    );
    return { ...prev, [groupId]: sortedMessages };
  }

  const signalRConnection = useMemo(() => {
    if (!isAuthenticated) return null;
    return getSignalRConnection(
      ApplicationConfig.ChatHubConnectionUrl,
      user?.access_token!
    );
  }, [isAuthenticated]);

  const getUserByIdTokenQuery = getUserDetailByToken(user?.id_token!, {
    enabled: !!user,
  });
  const getUserGroupQuery = getGroupsForUser(
    getUserByIdTokenQuery.data?.IdentityId!,
    {
      enabled: !!getUserByIdTokenQuery.data,
    }
  );
  if (getUserGroupQuery.data) {
    getUserGroupQuery.data.forEach((group) => {
      if (!chatGroups[group.Id]) {
        chatGroups[group.Id] = [];
      }
    });
  }
  useEffect(() => {
    if (isAuthenticated && signalRConnection) {
      signalRConnection.on(
        ChatReceiverMethod.ReceiveGroupMessage,
        (groupId: string, newMessages: Message[]) => {
          // console.log(newMessages);
          // console.log(groupId);
          setChatGroups((prev) => updateChatGroups(prev, groupId, newMessages));
        }
      );
      signalRConnection
        .start()
        .then(() => {
          console.log("SignalR connected");
          signalRConnection.on("ReceiveMessage", (message) => {
            console.log("New message received:", message);
          });
        })
        .catch((err) => console.error("SignalR connection error:", err));
    }
    return () => {
      signalRConnection?.stop().then(() => console.log("SignalR disconnected"));
    };
  }, [isAuthenticated]);
  useEffect(() => {
    console.log(chatGroups);
  }, [chatGroups]);

  if (!isAuthenticated) {
    return (
      <UserContext.Provider
        value={{
          User: {
            data: undefined,
            isLoading: false,
            isError: false,
            error: undefined,
          },
          IdentityId: "",
          UserGroups: {
            data: undefined,
            isLoading: false,
            isError: false,
            error: undefined,
          },
          CurrentSelectGroupChat: undefined,
          ChatGroups: {},
          setCurrentSelectGroupChat: () => {},
          setUser: () => {},
          setUserGroups: () => {},
          setMessagesForGroup: () => {},
          // fetchNextMessages: () => {
          //   throw new Error("fetchNextMessages is not implemented.");
          // },
        }}
      >
        {children}
      </UserContext.Provider>
    );
  }
  return (
    <UserContext.Provider
      value={
        {
          User: {
            data: getUserByIdTokenQuery.data,
            isLoading: getUserByIdTokenQuery.isLoading,
            isError: getUserByIdTokenQuery.isError,
            error: getUserByIdTokenQuery.error,
          },
          IdentityId: getUserByIdTokenQuery!.data?.IdentityId!,
          UserGroups: {
            data: getUserGroupQuery.data,
            isLoading: getUserGroupQuery.isLoading,
            isError: getUserGroupQuery.isError,
            error: getUserGroupQuery.error,
          },
          CurrentSelectGroupChat: selectedGroup,
          SignalRConnection: signalRConnection,
          ChatGroups: chatGroups,
          setCurrentSelectGroupChat: setSelectedGroup,
          setUser: () => {
            console.warn(
              "setUser is not implemented because data is fetched dynamically."
            );
          },
          setUserGroups: () => {
            console.warn(
              "setUserGroups is not implemented because data is fetched dynamically."
            );
          },
          setMessagesForGroup: (group: Group, newMessages: Message[]) => {
            if (!newMessages || newMessages.length === 0) return;
            setChatGroups((prev) =>
              updateChatGroups(prev, group.Id, newMessages)
            );
          },
        } as UserContextType
      }
    >
      {children}
    </UserContext.Provider>
  );
}
