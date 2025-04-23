import { UserContextType } from "@/types/shared/UserContextType";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { getGroupsForUser } from "@/services/chatServices/GroupServices";
import {
  getUserDetailByIdentityId,
  getUserDetailByToken,
} from "@/services/chatServices/UserServices";
import { Group } from "@/types/group/Group";
import { useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";
import { getSignalRConnection } from "@/utils/RealTimeConnection";
import { useSecretContext } from "@/app/providers/SecretProvider";
import { Message } from "@/types/message/Message";
import { ChatReceiverMethod } from "@/types/signalRmethods/ChatReceiver";
import useChatGroupMessagesStore from "@/store/useChatGroupMessagesStore";
import { User } from "@/types/user/User";
import useSignalRStore from "@/store/useSignalRStore";
import useUserGroupsStore from "@/store/useGroupStore";

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
  const { setChatGroups } = useChatGroupMessagesStore();
  const { signalRConnection, initializeConnection } = useSignalRStore();
  const { setError, setLoading, setUserGroups } = useUserGroupsStore();
  // const signalRConnection = useMemo(() => {
  //   if (!isAuthenticated) return null;
  //   return getSignalRConnection(
  //     ApplicationConfig.ChatHubConnectionUrl,
  //     user?.access_token!
  //   );
  // }, [isAuthenticated]);

  const getUserByIdTokenQuery = useQuery({
    queryKey: ["userDetail"],
    queryFn: async () => {
      const response = await getUserDetailByToken(user?.id_token!);
      return response;
    },
    enabled: !!user,
  });

  const { data, status, error } = useQuery({
    queryKey: ["groupsForUser", getUserByIdTokenQuery.data?.IdentityId],
    queryFn: async () => {
      const response = await getGroupsForUser(
        getUserByIdTokenQuery.data?.IdentityId!
      );
      return response;
    },
    enabled: !!getUserByIdTokenQuery.data?.IdentityId,
  });
  useEffect(() => {
    if (status === "success") {
      setUserGroups(data);
    } else if (status === "error") {
      setError(error);
    } else if (status === "pending") {
      setLoading(true);
    }
  }, [status]);
  useEffect(() => {
    if (isAuthenticated && user)
      initializeConnection(
        ApplicationConfig.ChatHubConnectionUrl,
        user?.access_token!
      );
    return () => {
      signalRConnection?.stop().then(() => console.log("SignalR disconnected"));
    };
  }, [user]);
  useEffect(() => {
    if (isAuthenticated && signalRConnection) {
      signalRConnection.on(
        ChatReceiverMethod.ReceiveNewGroupMessage,
        (groupId: string, newMessage: Message) => {
          setChatGroups(groupId, newMessage);
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
      signalRConnection?.off(ChatReceiverMethod.ReceiveNewGroupMessage);
    };
  }, [isAuthenticated]);

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
          // UserGroups: {
          //   data: undefined,
          //   isLoading: false,
          //   isError: false,
          //   error: undefined,
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
          // UserGroups: {
          //   data: getUserGroupQuery.data,
          //   isLoading: getUserGroupQuery.isLoading,
          //   isError: getUserGroupQuery.isError,
          //   error: getUserGroupQuery.error,
          // },
          // CurrentSelectGroupChat: selectedGroup,
          SignalRConnection: signalRConnection,
        } as UserContextType
      }
    >
      {children}
    </UserContext.Provider>
  );
}
