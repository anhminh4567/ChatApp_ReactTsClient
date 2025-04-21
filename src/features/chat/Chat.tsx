import React, { memo, Suspense, useState } from "react";
import ChatBox from "./components/ChatBox";
import { ChatGroupProvider } from "./context/useChatGroupContext";
import ChatMessages from "./components/ChatMessages";
import ErrorOutline from "@/components/errors/ErrorOutline";
import { ErrorBoundary } from "react-error-boundary";
import { Group } from "@/types/group/Group";
import { GroupDetail } from "@/types/group/GroupDetail";

export interface ChatProps extends React.PropsWithChildren {
  CurrentGroup: GroupDetail | null; // Pass the group as a prop
}

const Chat = ({ children, CurrentGroup }: ChatProps) => {
  console.log("Chat received CurrentGroup:", CurrentGroup);

  return (
    <div className="chat-group-wrapper-context">
      <ChatGroupProvider currentSelectedGroupDetail={CurrentGroup}>
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
// const Chat = memo(Chat, (prevProps, nextProps) => {
//   // Only re-render if the CurrentGroup actually changes
//   return prevProps.CurrentGroup?.Group.Id === nextProps.CurrentGroup?.Group.Id;
// });
export default Chat;
