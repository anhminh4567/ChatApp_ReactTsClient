import React, { useMemo, useReducer, useRef } from "react";
import { useChatGroupContext } from "../context/useChatGroupContext";
import MainButton from "@/components/buttons/MainButton";
import { FaArrowRight } from "react-icons/fa";
import { AiFillPicture, AiFillCamera } from "react-icons/ai";
import { MdEmojiEmotions } from "react-icons/md";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import TextArea from "antd/es/input/TextArea";
import "./ChatBox.css"; // Import the CSS file for styles
import { GetProp, theme, Upload, UploadFile, UploadProps } from "antd";
import { APP_CONFIG } from "@/config/appConfig";
import { useMutation } from "@tanstack/react-query";
import { SendMessage } from "@/services/chatServices/MessageService";
import { Message } from "@/types/message/Message";
import { useUserContext } from "@/context/useUserContext";
import { toast } from "react-toastify";
export type ChatBoxProps = React.PropsWithChildren;

const ICON_MD_VIEWSIZE = "md:w-8 md:h-8";
const ICON_SIZE = `w-6 h-6 ${ICON_MD_VIEWSIZE}`;

const ChatBox = (params: ChatBoxProps) => {
  const uploadRef = useRef<HTMLButtonElement>(null);
  const { currentGroupDetail } = useChatGroupContext();
  const { User } = useUserContext();
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = React.useState(false);
  const [messageInput, setMessageInput] = React.useState("");
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const { useToken } = theme;
  const { token } = useToken();
  const currentParticipant = useMemo(() => {
    return currentGroupDetail?.ParticipantsDetail.find(
      (p) => p.IdentityId === User!.data?.IdentityId
    );
  }, [User?.data]);
  const [referenceMessage, setReferenceMessage] = React.useState<
    Message | undefined
  >(undefined);
  const mapUploadFileToFile = (uploadFiles: UploadFile[]): File[] => {
    return uploadFiles
      .map((uploadFile) => uploadFile.originFileObj)
      .filter((file) => file != null);
  };
  const formMutation = useMutation<Message, Error>({
    mutationFn: async () =>
      SendMessage(
        currentGroupDetail!.Group,
        currentParticipant!,
        messageInput,
        referenceMessage,
        mapUploadFileToFile(fileList)
      ),
    onSuccess: (data, _context) => {
      toast.success("sended", {
        autoClose: 2000,
        position: "top-right",
      });
    },
    onError: (error, _, context) => {
      toast.error(error.message, {
        autoClose: 2000,
        position: "top-right",
      });
    },
  });
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
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission
    console.log(mapUploadFileToFile(fileList));
    formMutation.mutate();
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
    <div className="w-full h-fit  rounded-md flex flex-col justify-between p-3 ">
      <form onSubmit={handleFormSubmit}>
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
              htmlType="submit"
            >
              Send
            </MainButton>
          </div>
        </section>
      </form>
    </div>
  );
};

export default ChatBox;
