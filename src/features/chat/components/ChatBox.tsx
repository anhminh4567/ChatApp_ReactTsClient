import React, { useReducer, useRef } from "react";
import { useChatGroupContext } from "../context/useChatGroupContext";
import MainButton from "@/components/buttons/MainButton";
import { FaArrowRight } from "react-icons/fa";
import { AiFillPicture, AiFillCamera } from "react-icons/ai";
import { MdEmojiEmotions } from "react-icons/md";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import TextArea from "antd/es/input/TextArea";
import "./ChatBox.css"; // Import the CSS file for styles
import { Upload, UploadFile, UploadProps } from "antd";
import { APP_CONFIG } from "@/config/appConfig";
export interface ChatBoxProps extends React.PropsWithChildren {}

const ICON_MD_VIEWSIZE = "md:w-8 md:h-8";
const ICON_SIZE = `w-6 h-6 ${ICON_MD_VIEWSIZE}`;

const ChatBox = (params: ChatBoxProps) => {
  const uploadRef = useRef(null);
  const { currentGroupDetail } = useChatGroupContext();
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = React.useState(false);
  const [messageInput, setMessageInput] = React.useState("");
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
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

  const uploadProps: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      //slice to duplicate, splice to remove
      const newFileList = fileList.slice().splice(index, 1);
      console.log(newFileList);
      setFileList(newFileList);
    },
    onChange: ({ fileList }) => {
      setFileList(fileList);
    },
    beforeUpload: (file) => {
      return false;
    },
    fileList: fileList,
    maxCount: APP_CONFIG.MAX_IMAGE_UPLOAD,
    multiple: true,
    showUploadList: true,
  };
  //--typing-message-wrapper-height
  return (
    <div className="w-full h-fit bg-white rounded-md flex flex-col justify-between p-3 ">
      <section className={`top ${fileList.length > 0 ? "block" : "hidden"}`}>
        <Upload
          accept="image/*"
          {...uploadProps}
          className=""
          listType="picture-card"
        >
          <button
            type="button"
            style={{ display: "none" }}
            ref={uploadRef}
          ></button>
        </Upload>
      </section>
      <section className="bottom flex flex-row justify-between items-center">
        <div className="left-section-icon my-auto flex gap-2 ms-2">
          <AiFillPicture
            onClick={() => {
              uploadRef.current?.click();
            }}
            className={`${ICON_SIZE} hover:scale-125 transition-transform duration-150`}
          />
          <AiFillCamera
            className={`${ICON_SIZE} hover:scale-125 transition-transform duration-150`}
          />
        </div>
        <div className="middle-section-input w-full mx-2 my-auto">
          <TextArea
            variant="filled"
            value={messageInput}
            onChange={(e) => handleSetInputMessages(e)}
            placeholder="Controlled autosize"
            autoSize={{ minRows: 1, maxRows: 2 }}
          />
        </div>
        <div className="right-section-icon my-auto flex  gap-2 me-2">
          <div className="emoji-picker relative">
            <MdEmojiEmotions
              className={`${ICON_SIZE} hover:scale-125 transition-transform duration-150`}
              onClick={() => handleEmojiClick()}
            />
            <EmojiPicker
              className="emoji-selector "
              open={isEmojiPickerOpen}
              onEmojiClick={handleEmojiSelectClick}
            />
          </div>
          <MainButton
            icon={<FaArrowRight className="text-white " />}
            iconPosition="end"
          >
            Send
          </MainButton>
        </div>
      </section>
    </div>
  );
};

export default ChatBox;
