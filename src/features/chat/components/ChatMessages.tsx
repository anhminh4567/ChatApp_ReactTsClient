import { Space } from "antd";
import React from "react";
import ChatRow from "./ChatRow";
import { Message } from "../../../types/message/Message";
import { MediaObject } from "@/types/shared/MediaObject";
const mockMessages: Message[] = Array.from({ length: 10 }, (_, index) => ({
  Id: `message-${index + 1}`,
  SenderId: `user-${(index % 3) + 1}`,
  GroupId: "group-1",
  Content: `This is a mock message ${index + 1}`,
  ReferenceId: null,
  RefrenceMessage: null,
  MessageReactions: [],
  MessageAttachments: [],
  CreatedAt: new Date(),
  DeletedAt: null,
}));
mockMessages.forEach((message) => {
  message.MessageAttachments = Array.from(
    { length: 6 },
    (_, attachmentIndex) => ({
      Id: `attachment-${message.Id}-${attachmentIndex + 1}`,
      MessageId: message.Id,
      AttachmentDetail: {
        Id: `media-${attachmentIndex + 1}`,
        FileUrl: `https://example.com/media-${attachmentIndex + 1}.jpg`,
        Type: "image",
      } as MediaObject,
      ThumbDetail: {
        Id: `thumb-${attachmentIndex + 1}`,
        FileUrl: `https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a`,
        Type: "image",
      } as MediaObject,
    })
  );
});
const ChatMessages = () => {
  return (
    <div className="chat-messages-container-list w-full h-full overflow-y-scroll">
      <Space direction="vertical" size="middle" className="">
        {mockMessages.map((message) => (
          <ChatRow key={message.Id} Message={message} />
        ))}
      </Space>
    </div>
  );
};

export default ChatMessages;
