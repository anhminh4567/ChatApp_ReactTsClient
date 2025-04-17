import {
  Avatar,
  Breadcrumb,
  Button,
  Input,
  Layout,
  List,
  Menu,
  MenuProps,
  theme,
  theme as antdTheme,
} from "antd";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { Suspense, useEffect } from "react";
import FixedSideBar from "./leftNavBars/FixedSideBar";
import FixedHeader from "./topBars/FixedHeader";
import geminiGenIcon from "@/assets/gemini-gen.png";
import avatarBase from "@/assets/avatarbase.jpg";
import {
  getGroupsForUser,
  getGroupDetails,
  createGroup,
} from "@/services/chatServices/GroupServices";
import LoadingSpinner from "@/components/loaders/LoadingSpinner";
import ErrorOutline from "@/components/errors/ErrorOutline";
import { useUserContext } from "@/context/useUserContext";
import { Link, Outlet, useNavigate } from "react-router";
const { Header, Content, Footer, Sider } = Layout;

export interface BaseLayoutProps extends React.PropsWithChildren {}

const BaseLayout = (params: BaseLayoutProps) => {
  const { setUserGroups, UserGroups, setCurrentSelectGroupChat, User } =
    useUserContext();
  const { useToken } = theme;
  const { token } = useToken();
  const navigate = useNavigate();

  const handleGroupClick = (groupId: string) => {
    const group = UserGroups.data.find((group) => group.Id === groupId);
    if (!group) return;
    setCurrentSelectGroupChat(group);
    navigate(`/group/${group.Id}`);
  };

  return (
    <Layout hasSider className="100vh">
      <FixedSideBar
        collapsible={true}
        className="shadow-md top-0 bottom-0  w-[--sidebar-width]  
          scollbar-style"
      >
        <div
          className="h-[--navbar-height] flex flex-row justify-center items-center"
          style={{
            background: token.colorBgContainer,
          }}
        >
          <Input placeholder="Filled" className="w-[90%] " />
        </div>
        {UserGroups.isLoading && (
          <div className="w-full h-[80%] flex flex-col justify-center items-center">
            <LoadingSpinner className="p-4" />
          </div>
        )}
        {!UserGroups.isLoading && !UserGroups.isError && (
          <List
            className="p-2"
            itemLayout="horizontal"
            dataSource={UserGroups.data}
            renderItem={(item, index) => (
              <List.Item
                className=""
                onClick={(_) => {
                  handleGroupClick(item.Id);
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={
                        !item.ThumbDetail
                          ? avatarBase
                          : item.ThumbDetail.FileUrl
                      }
                    />
                  }
                  title={<a>{item.Name}</a>}
                />
              </List.Item>
            )}
          />
        )}
        {UserGroups.isError && (
          <div className="w-full h-[80%] mx-auto">
            <ErrorOutline
              IconSize="medium"
              Message={UserGroups.error.message}
              className="w-full h-full"
            />
          </div>
        )}
      </FixedSideBar>

      <Layout className=" pt-0">
        <FixedHeader className="shadow-md bg-white top-0">
          <div className="flex flex-row w-[30%] align-middle ">
            <img
              src={geminiGenIcon}
              className="object-contain w-12 h-12 rounded-full mt-auto mb-auto ms-2"
            />
          </div>
        </FixedHeader>
        {/* {children} */}
        <Content>
          <Outlet />
        </Content>
        {/* {children} */}
      </Layout>
    </Layout>
    // </Layout>
  );
};
export default BaseLayout;
