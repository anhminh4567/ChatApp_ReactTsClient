import { Space } from "antd";
import React, { use, useEffect, useRef } from "react";
import { Message } from "../../../types/message/Message";
import { MediaObject } from "@/types/shared/MediaObject";
import ChatRow from "./ChatRow";
import { useUserContext } from "@/context/useUserContext";
import { useChatGroupContext } from "../context/useChatGroupContext";
const mockMessages: Message[] = Array.from({ length: 10 }, (_, index) => ({
  Id: `message-${index + 1}`,
  SenderId:
    index % 2 == 1
      ? `user-${(index % 3) + 1}`
      : "c28ab02a-73a5-4614-a822-e34054b04051",
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
  const renderCount = useRef(0); // Track render count
  renderCount.current += 1;
  console.log("ChatMessages render count:", renderCount.current);

  const { User } = useUserContext();
  const { currentGroupDetail } = useChatGroupContext();
  const userParticipant = currentGroupDetail.ParticipantsDetail.find(
    (p) => p.IdentityId === User.data?.IdentityId
  );
  const endRef = React.useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  });

  return (
    <div className="chat-messages-container-list w-full h-full overflow-y-scroll">
      <Space direction="vertical" size="middle" className="w-full">
        {mockMessages.map((message) => {
          if (message.SenderId != userParticipant?.Id)
            return (
              <ChatRow.ParticipantVariant key={message.Id} Message={message} />
            );
          else
            return (
              <ChatRow.CurrentUserVariant key={message.Id} Message={message} />
            );
        })}
        <a ref={endRef} />
      </Space>
    </div>
  );
};

export default ChatMessages;
