import { DATE_TIME_FORMAT } from "@/config/dateTimeFormat";
import { useUserContext } from "@/context/useUserContext";
import ChatBox from "@/features/chatbox/ChatBox";
import { GetMessagesByGroup } from "@/services/chatServices/MessageService";
import moment from "moment";
import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { parseArgs } from "util";

export interface ChatPageProps {
  GroupId?: string;
}

const ChatPage = (params: ChatPageProps) => {
  const { UserGroups, setCurrentSelectGroupChat } = useUserContext();
  const { groupId: paramGroupId, dateTimeFromLastMessage } = useParams();
  const groupId = params.GroupId || paramGroupId;
  const dateTimeCursor = useMemo(() => {
    return dateTimeFromLastMessage || moment(new Date());
  }, [groupId]);
  const getGroupMessages = GetMessagesByGroup(
    groupId,
    moment(dateTimeCursor, DATE_TIME_FORMAT).toDate()
  );
  setCurrentSelectGroupChat(UserGroups.find((g) => g.Id == groupId));
  return (
    <>
      <div
        className="m-3 shadow-md bg-white  rounded-md p-1 "
        style={{
          height:
            "calc(100vh - var(--navbar-height) - var(--typing-message-wrapper-height)) ",
        }}
      >
        <h1>Chat Page</h1>
        <p>Group ID: {groupId}</p>
      </div>
      <div className="m-3 message-typing-container">
        <ChatBox />
      </div>
    </>
  );
};

export default ChatPage;
