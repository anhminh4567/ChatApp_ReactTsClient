import { useLocalSettingStore } from "@/store/useLocalSettingStore";
import { Menu, theme } from "antd";
import { BasicProps, Header } from "antd/es/layout/layout";
import React from "react";

export interface FixedHeaderProps extends BasicProps {}

const FixedHeader = (params: FixedHeaderProps) => {
  const { className, children } = params;
  const themeChoice = useLocalSettingStore((state) => state.userSetting.theme);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Header
      style={{ background: colorBgContainer }}
      className={`z-50 p-0 flex flex-row sticky w-full !h-[--navbar-height] top-0 ${className} `}
    >
      {children}
    </Header>
  );
};

export default FixedHeader;
