import { Modal } from "antd";
import React, { useState } from "react";

export interface ChatAddUserModalProps extends React.PropsWithChildren {
  isModalOpen: boolean;
  confirmLoading: boolean;
  handleOk: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const ChatAddUser = (param: ChatAddUserModalProps) => {
  return (
    <Modal
      title="Basic Modal"
      open={param.isModalOpen}
      onOk={param.handleOk}
      onCancel={param.handleCancel}
      loading={param.confirmLoading}
    >
      {param.children}
    </Modal>
  );
};

export default ChatAddUser;
