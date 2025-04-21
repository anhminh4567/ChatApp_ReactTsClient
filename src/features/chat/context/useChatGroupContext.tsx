import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";

import { GroupDetail } from "@/types/group/GroupDetail";

export interface ChatGroupContextType {
  currentGroupDetail: GroupDetail | null;
}

const ChatGroupContext = createContext<ChatGroupContextType | null>(null);

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
  currentSelectedGroupDetail: GroupDetail | null;
}
export const ChatGroupProvider = ({
  currentSelectedGroupDetail,
  children,
}: ChatGroupProviderProps) => {
  return (
    <ChatGroupContext.Provider
      value={{
        currentGroupDetail: currentSelectedGroupDetail,
      }}
    >
      {children}
    </ChatGroupContext.Provider>
  );
};
