import { Divider, Drawer, DrawerProps, Image } from "antd";
import React from "react";
import { useChatGroupContext } from "../context/useChatGroupContext";
import { APP_CONFIG } from "@/config/appConfig";

export interface ChatDetailProps extends React.PropsWithChildren {
  placement: DrawerProps["placement"];
  className?: string;
  onClose?: DrawerProps["onClose"];
  isOpen: boolean;
  setToRenderLocalDom: boolean;
  title: string;
}

const ChatDetail = (param: ChatDetailProps) => {
  const { currentGroupDetail } = useChatGroupContext();
  return (
    <div>
      <Drawer
        title={param.title}
        placement={param.placement}
        closable={true}
        onClose={param.onClose}
        open={param.isOpen}
        className={`${param.className} ${
          param.setToRenderLocalDom == false ? "absolute" : ""
        }`}
        getContainer={
          param.setToRenderLocalDom == false ? false : document.body
        }
      >
        <div className="overflow-y-auto">
          <div className=" flex justify-center">
            <Image
              width={100}
              height={100}
              src={currentGroupDetail?.Group.ThumbDetail?.FileUrl}
              alt={currentGroupDetail?.Group.Name}
              fallback={APP_CONFIG.DEFAULT_FALLBACK_IMAGE_BASE64}
              className="rounded-full mx-auto"
              preview={false}
              loading="lazy"
            />
          </div>
          <h6 className="flex justify-center">
            <span className="font-bold text-lg text-center mx-auto">
              {currentGroupDetail?.Group.Name}
            </span>
          </h6>
          <Divider>member</Divider>
          asdfsadf
          <Divider>media</Divider>
          sdffsd
        </div>
      </Drawer>
    </div>
  );
};

export default ChatDetail;
