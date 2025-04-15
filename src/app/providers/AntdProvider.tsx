import { ConfigProvider, ThemeConfig } from "antd";
import React, { ReactNode } from "react";

interface AntdProviderProps {
  children: ReactNode;
}
const MY_THEME_NORMAL: ThemeConfig = {};
const AntdProvider: React.FC<AntdProviderProps> = ({ children }) => {
  return <ConfigProvider theme={MY_THEME_NORMAL}>{children}</ConfigProvider>;
};

export default AntdProvider;
