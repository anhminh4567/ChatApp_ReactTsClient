import MyBreadCrumb from "@/components/breadCrumbs/MyBreadCrumb";
import LoadingSpinner from "@/components/loaders/LoadingSpinner";
import { DATE_TIME_FORMAT } from "@/config/dateTimeFormat";
import { useUserContext } from "@/context/useUserContext";
import Chat from "@/features/chat/Chat";
import { getGroupDetails } from "@/services/chatServices/GroupServices";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router";
import { FaGear } from "react-icons/fa6";
import ChatDetail from "@/features/chat/components/ChatDetail";
export interface ChatPageProps {
  GroupId?: string;
}

const ChatPage = (params: ChatPageProps) => {
  const renderCount = useRef(0); // Track render count
  renderCount.current += 1;
  console.log("ChatPage render count:", renderCount.current);

  const { UserGroups } = useUserContext();
  const { groupId: paramGroupId, dateTimeFromLastMessage } = useParams();
  const groupId = params.GroupId || paramGroupId!;
  const group = UserGroups.data?.find((group) => group.Id === groupId);
  const { data, isLoading, isError } = getGroupDetails(groupId);

  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleSettingClick = (e: React.MouseEvent) => {
    setIsDetailOpen((prev) => !prev);
  };
  return (
    <>
      {data && !isLoading && !isError ? (
        <Chat CurrentGroup={data}>
          <div
            className="relative chat-container flex flex-col justify-between p-3"
            style={{
              height: "calc(100vh - var(--navbar-height))",
            }}
          >
            <div className="w-full flex justify-between">
              <MyBreadCrumb items={[data.Group.Name]} />
              <div>
                <FaGear
                  className="ms-1"
                  onClick={(e) => {
                    handleSettingClick(e);
                  }}
                />
              </div>
            </div>
            <div className=" shadow-md bg-white rounded-md p-1 overflow-auto h-full">
              <Chat.ChatMessages />
            </div>
            <div className=" message-typing-container">
              <Chat.ChatBox />
            </div>
          </div>
          <ChatDetail
            isOpen={isDetailOpen}
            placement="right"
            setToRenderLocalDom={false}
            onClose={handleSettingClick}
            title={`${data.Group.Name} Settings`}
          ></ChatDetail>
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
