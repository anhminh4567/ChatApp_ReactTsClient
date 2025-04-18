import LoadingSpinner from "@/components/loaders/LoadingSpinner";
import { DATE_TIME_FORMAT } from "@/config/dateTimeFormat";
import { useUserContext } from "@/context/useUserContext";
import Chat from "@/features/chat/Chat";
import ChatBox from "@/features/chat/components/ChatBox";
import { getGroupDetails } from "@/services/chatServices/GroupServices";
import { GetMessagesByGroup } from "@/services/chatServices/MessageService";
import { Group } from "@/types/group/Group";
import moment from "moment";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { parseArgs } from "util";

export interface ChatPageProps {
  GroupId?: string;
}

const ChatPage = (params: ChatPageProps) => {
  const renderCount = useRef(0); // Track render count
  renderCount.current += 1;
  console.log("ChatPage render count:", renderCount.current);

  const { UserGroups } = useUserContext();
  const { groupId: paramGroupId, dateTimeFromLastMessage } = useParams();
  const groupId = params.GroupId || paramGroupId;
  const group = UserGroups.data?.find((group) => group.Id === groupId);
  const { data, isLoading, isError } = getGroupDetails(groupId);
  // toast("Wow so easy!");
  // if (group) {
  //   console.log("current group is selected");
  //   setCurrentSelectGroupChat(group);
  // }

  return (
    <>
      {data && !isLoading && !isError ? (
        <Chat CurrentGroup={data}>
          <div
            className="chat-container flex flex-col justify-between"
            style={{
              height: "calc(100vh - var(--navbar-height))",
            }}
          >
            <div className="m-3 shadow-md bg-white rounded-md p-1 overflow-auto">
              <Chat.ChatMessages />
            </div>
            <div className="m-3 message-typing-container">
              <Chat.ChatBox />
            </div>
          </div>
        </Chat>
      ) : (
        <div className="w-full h-[75vh] mt-[--navbar-height] flex flex-col justify-center align-middle">
          <LoadingSpinner className="" />
        </div>
      )}
    </>
  );
};

export default ChatPage;
