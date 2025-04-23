import MyBreadCrumb from "@/components/breadCrumbs/MyBreadCrumb";
import LoadingSpinner from "@/components/loaders/LoadingSpinner";
import Chat from "@/features/chat/Chat";
import ChatDetail from "@/features/chat/components/ChatDetail";
import { getGroupDetails } from "@/services/chatServices/GroupServices";
import React, { useRef, useState } from "react";
import { FaGear } from "react-icons/fa6";
import { useParams } from "react-router";
export interface ChatPageProps {
  GroupId?: string;
}

const ChatPage = (params: ChatPageProps) => {
  const renderCount = useRef(0); // Track render count
  renderCount.current += 1;
  console.log("ChatPage render count:", renderCount.current);

  // const { userGroups } = useUserGroupsStore();
  const { groupId: paramGroupId, dateTimeFromLastMessage } = useParams();
  const groupId = params.GroupId || paramGroupId!;
  // const group = userGroups?.find((group) => group.Id === groupId);
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
