import React from "react";
import AvartarBaseImgage from "@/assets/avatarbase.jpg";
import { Message } from "@/types/message/Message";
import { message, Skeleton, theme } from "antd";
import { useChatGroupContext } from "../context/useChatGroupContext";
import { useUserContext } from "@/context/useUserContext";
export interface ChatRowProps {
  Message: Message; // Message object containing message details
}
const maxWidth = "70%"; // Maximum width for the message content
const ChatRow = () => {
  return <></>;
};

const ChatRowParticipant = ({ Message }: ChatRowProps) => {
  const { currentGroupDetail } = useChatGroupContext();

  return (
    <div className="messageRow flex flex-row gap-2 justify-start ">
      <img
        src={AvartarBaseImgage}
        className="md:w-10 md:h-10 min-w-8 min-h-8 object-fill rounded-full"
      />
      <div className="messageRow-content flex flex-col ml-3 max-w-[70%] shadow-md p-2 rounded-md">
        <div className="messageRow-header flex flex-row justify-start gap-5 align-middle">
          <p className="font-bold text-sm my-auto">{"Sender"}</p>
          <p className="text-xs text-gray-500 my-auto">12:00 PM</p>
        </div>
        <p className="text-messages text-sm text-gray-700">{Message.Content}</p>
        <section className="message-row-attachment flex flex-row gap-2 mt-2 flex-wrap">
          {Message.MessageAttachments.map((attachment) => {
            return (
              <>
                <img
                  key={attachment.Id}
                  src={attachment.ThumbDetail?.FileUrl}
                  className="w-20 h-20 object-cover rounded-md shadow-md "
                  alt="att"
                  loading="lazy" // Lazy loading attribute
                  onLoad={(e) => {}} // Lazy loading attribute
                />
              </>
            );
          })}
        </section>
      </div>
    </div>
  );
};
const ChatRowCurrentUser = ({ Message }: ChatRowProps) => {
  const { currentGroupDetail } = useChatGroupContext();
  const { useToken } = theme;
  const { token } = useToken();
  const mainBgColor = token.colorPrimary;
  const mainTextColor = token.colorTextLightSolid;
  return (
    <div className="messageRow flex flex-row justify-end gap-2   ">
      <div
        className="messageRow-content flex flex-col ml-3 max-w-[70%] shadow-md p-2 rounded-md relative"
        style={{ backgroundColor: mainBgColor, color: mainTextColor }}
      >
        <div className="messageRow-header flex flex-row justify-start gap-5 align-middle ">
          <p
            className="font-bold text-sm my-auto"
            style={{
              color: mainTextColor,
            }}
          >
            {"Sender"}
          </p>
          <p
            className="text-xs text-gray-500 my-auto"
            style={{
              color: mainTextColor,
            }}
          >
            12:00 PM
          </p>
        </div>
        <p
          className={`text-messages text-sm text-gray-700 `}
          style={{
            color: mainTextColor,
          }}
        >
          {Message.Content}
        </p>
        <section className="message-row-attachment flex flex-row gap-2 mt-2 flex-wrap ">
          {Message.MessageAttachments.map((attachment) => {
            return (
              <>
                <img
                  key={attachment.Id}
                  src={attachment.ThumbDetail?.FileUrl}
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                  alt="att"
                  loading="lazy" // Lazy loading attribute
                  onLoad={(e) => {}} // Lazy loading attribute
                />
              </>
            );
          })}
        </section>
        <span
          className="w-3 h-3 absolute top-3 -right-1 rotate-45 "
          style={{
            backgroundColor: mainBgColor,
          }}
        ></span>
      </div>
      <img
        src={AvartarBaseImgage}
        className="md:w-10 md:h-10 min-w-8 min-h-8 object-fill rounded-full"
      />
    </div>
  );
};

ChatRow.ParticipantVariant = ChatRowParticipant;
ChatRow.CurrentUserVariant = ChatRowCurrentUser;
export default ChatRow;
