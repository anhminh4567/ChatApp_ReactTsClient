import React, { Suspense, useState } from "react";
import ChatBox from "./components/ChatBox";
import { ChatGroupProvider } from "./context/useChatGroupContext";
import ChatMessages from "./components/ChatMessages";
import ErrorOutline from "@/components/errors/ErrorOutline";
import { ErrorBoundary } from "react-error-boundary";
import { Group } from "@/types/group/Group";

export interface ChatProps extends React.PropsWithChildren {
  CurrentGroup: Group | null; // Pass the group as a prop
}

const Chat = ({ children, CurrentGroup }: ChatProps) => {
  console.log("Chat received CurrentGroup:", CurrentGroup);

  return (
    <div className="chat-group-wrapper-context">
      <ChatGroupProvider currentSelectedGroup={CurrentGroup}>
        <ErrorBoundary
          fallback={
            <div className="w-full h-[80vh] flex justify-center items-center">
              <ErrorOutline
                IconSize="large"
                Message="Something went wrong in the chat component. Please try again later."
              />
            </div>
          }
        >
          {children}
        </ErrorBoundary>
      </ChatGroupProvider>
    </div>
  );
};
Chat.ChatBox = ChatBox;
Chat.ChatMessages = ChatMessages;

export default Chat;
