import { Menu } from "antd";
import { BasicProps, Header } from "antd/es/layout/layout";
import React from "react";

export interface FixedHeaderProps extends BasicProps {}

const FixedHeader = (params: FixedHeaderProps) => {
  const { className, children } = params;
  return (
    <Header
      className={`z-50 p-0 flex flex-row sticky w-full !h-[--navbar-height] top-0 ${className} `}
    >
      {children}
    </Header>
  );
};

export default FixedHeader;
