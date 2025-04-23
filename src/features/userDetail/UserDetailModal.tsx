import { APP_CONFIG } from "@/config/appConfig";
import { useUserContext } from "@/context/useUserContext";
import { DateTimeFormatter } from "@/utils/DateTimeFormater";
import { Avatar, Divider, Input, Modal, Space, Switch } from "antd";
import AppContext from "antd/es/app/context";
import React, { PropsWithChildren, useEffect } from "react";
import UserDetailSetting from "./component/UserDetailSetting";

export interface UserDetailModalProps extends PropsWithChildren {
  isOpen: boolean;
  onCloseClick: () => void;
  width?: "80%" | string;
  height?: "80%" | string;
  footer?: React.ReactNode;
}
const UserDetailModal = (props: UserDetailModalProps) => {
  const { User } = useUserContext();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const loadingTimeout = setTimeout(() => setIsLoading(false), 1000);
  useEffect(() => {
    if (props.isOpen) {
      setIsLoading(true); // Reset loading state when modal opens
      const loadingTimeout = setTimeout(() => setIsLoading(false), 1000);

      return () => {
        clearTimeout(loadingTimeout);
      };
    }
  }, [props.isOpen]);
  return (
    <Modal
      title={User?.data?.Name}
      open={props.isOpen}
      cancelButtonProps={undefined}
      onCancel={() => {
        if (props.onCloseClick) {
          props.onCloseClick();
        }
      }}
      loading={isLoading}
      footer={null}
      width={props.width ?? "80%"}
      height={props.height ?? "80%"}
      className=" overflow-y-auto scollbar-style "
    >
      <Space direction="vertical" className="w-full h-full">
        <div className="flex justify-center items-center">
          <Avatar
            className="w-20 h-20 md:w-32 md:h-32 "
            shape="circle"
            src={
              User?.data?.AvatarUri ?? APP_CONFIG.DEFAULT_FALLBACK_IMAGE_BASE64
            }
            onClick={() => {}}
          />
        </div>
        <Divider orientation="center">Setting</Divider>
        <UserDetailSetting />
        <Divider orientation="center">Details</Divider>
        <div className="flex flex-row justify-between items-center gap-2">
          <section className="left w-full">
            <p className="">detail</p>
            <div className="w-full mx-auto">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="font-bold">Name:</span>
                  <span>{User?.data?.Name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Email:</span>
                  <span>{User?.data?.Email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Phone:</span>
                  <span>
                    {DateTimeFormatter.parseToDateTimeFormat(
                      User?.data?.CreatedAt.toString()!
                    )}
                  </span>
                </div>
              </div>
            </div>
          </section>
          <Divider orientation="center" type="vertical" className="bg-gray-700">
            Media
          </Divider>
          <section className="right w-full">
            <p className="">Letter</p>
            <div className="w-full h-full">asdf</div>
          </section>
        </div>

        <Divider orientation="center">Friends</Divider>
        <div className="w-full h-[300px]">asdf</div>
      </Space>
    </Modal>
  );
};

export default UserDetailModal;
