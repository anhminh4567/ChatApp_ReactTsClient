import React from "react";
import { useChatGroupContext } from "../context/useChatGroupContext";
import MainButton from "@/components/buttons/MainButton";
import { FaArrowRight } from "react-icons/fa";
import { AiFillPicture, AiFillCamera } from "react-icons/ai";
import { MdEmojiEmotions } from "react-icons/md";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import TextArea from "antd/es/input/TextArea";
import "./ChatBox.css"; // Import the CSS file for styles
export interface ChatBoxProps extends React.PropsWithChildren {}

const ICON_MD_VIEWSIZE = "md:w-8 md:h-8";
const ICON_SIZE = `w-6 h-6 ${ICON_MD_VIEWSIZE}`;
const ChatBox = (params: ChatBoxProps) => {
  const { currentGroup } = useChatGroupContext();
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = React.useState(false);
  const [messageInput, setMessageInput] = React.useState("");

  const handleEmojiClick = () => {
    setIsEmojiPickerOpen((prev) => !prev);
  };

  const handleEmojiSelectClick = (
    emojiClickData: EmojiClickData,
    e: MouseEvent
  ) => {
    console.log("Emoji clicked:", emojiClickData.imageUrl);
    console.log("Emoji icon data:", emojiClickData.emoji);
    setMessageInput((prev) => prev + emojiClickData.emoji); // Add a default emoji to the input
  };
  const handleSetInputMessages = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessageInput(e.target.value);
  };
  if (!currentGroup) {
    return (
      <div className="w-full h-[--typing-message-wrapper-height] bg-white rounded-md">
        Loading chatbox...
      </div>
    );
  }
  return (
    <div className="w-full h-[--typing-message-wrapper-height] bg-white rounded-md flex flex-row justify-between align-">
      {/* chatbox for group id {currentGroup.Id} and name {currentGroup.Name}
       */}
      <section className="left-section-icon my-auto flex gap-2 ms-2">
        <AiFillPicture className={`${ICON_SIZE}`} />
        <AiFillCamera className={`${ICON_SIZE}`} />
      </section>
      <section className="middle-section-input w-full mx-2 my-auto">
        <TextArea
          variant="filled"
          value={messageInput}
          onChange={(e) => handleSetInputMessages(e)}
          placeholder="Controlled autosize"
          autoSize={{ minRows: 1, maxRows: 2 }}
        />
      </section>
      <section className="right-section-icon my-auto flex  gap-2 me-2">
        <div className="emoji-picker relative">
          <MdEmojiEmotions
            className={`${ICON_SIZE}`}
            onClick={() => handleEmojiClick()}
          />
          <EmojiPicker
            className="emoji-selector"
            open={isEmojiPickerOpen}
            onEmojiClick={handleEmojiSelectClick}
          />
        </div>
        <MainButton
          icon={<FaArrowRight className="text-white" />}
          iconPosition="end"
        >
          Send
        </MainButton>
      </section>
    </div>
  );
};

export default ChatBox;
