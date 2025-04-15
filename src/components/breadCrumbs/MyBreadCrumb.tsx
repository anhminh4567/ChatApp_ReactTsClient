import { Breadcrumb, BreadcrumbProps } from "antd";
import React from "react";

export interface MyBreadCrumbProps {
  items: string[];
}

const MyBreadCrumb = (params: MyBreadCrumbProps) => {
  return (
    <Breadcrumb
      items={params.items.map((item) => ({
        title: item,
        key: item,
      }))}
    />
  );
};

export default MyBreadCrumb;
