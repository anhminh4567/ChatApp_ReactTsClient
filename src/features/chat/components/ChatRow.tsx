import React from "react";
import AvartarBaseImgage from "@/assets/avatarbase.jpg";
import { Message } from "@/types/message/Message";
import { message, Skeleton } from "antd";
import { useChatGroupContext } from "../context/useChatGroupContext";
export interface ChatRowProps {
  Message: Message; // Message object containing message details
}
const ChatRow = ({ Message }: ChatRowProps) => {
  const {} = useChatGroupContext();

  return (
    <div className="messageRow flex flex-row ">
      <img
        src={AvartarBaseImgage}
        className="md:w-10 md:h-10 min-w-8 min-h-8 object-fill rounded-full"
      />
      <div className="messageRow-content flex flex-col ml-3 max-w-[80%]">
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
                  className="w-20 h-20 object-cover rounded-md "
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

export default ChatRow;
