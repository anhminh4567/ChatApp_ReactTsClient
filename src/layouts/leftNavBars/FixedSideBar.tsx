import React from "react";
import { Breadcrumb, Layout, Menu, MenuProps, SiderProps, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;

export interface FixedSideBarProps extends SiderProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  trigger?: React.ReactNode;
}
const Default: FixedSideBarProps = {
  collapsed: false,
  onCollapse: () => {},
};

const FixedSideBar = (params: FixedSideBarProps) => {
  const merged = {
    ...Default,
    ...params,
  };
  const { className, collapsed, onCollapse, trigger, children } = merged;

  return (
    <Sider
      theme="light"
      className={`sticky h-screen overflow-auto  !w-[--sidebar-width]  ${className} overflow-auto`}
      width={200}
      collapsible
      // {...(trigger
      //   ? {
      //       trigger,
      //     }
      //   : {})} // Conditionally add the trigger prop
      breakpoint="lg"
    >
      {children}
    </Sider>
  );
};

export default FixedSideBar;
