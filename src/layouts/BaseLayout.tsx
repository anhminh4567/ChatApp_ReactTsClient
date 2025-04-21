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

import React, { Suspense, useEffect, useRef } from "react";
import FixedSideBar from "./leftNavBars/FixedSideBar";
import FixedHeader from "./topBars/FixedHeader";
import geminiGenIcon from "@/assets/gemini-gen.png";
import avatarBase from "@/assets/avatarbase.jpg";
import LoadingSpinner from "@/components/loaders/LoadingSpinner";
import ErrorOutline from "@/components/errors/ErrorOutline";
import { useUserContext } from "@/context/useUserContext";
import { Outlet, useNavigate } from "react-router";
import MainButton from "@/components/buttons/MainButton";
import { useAuth } from "react-oidc-context";
const { Content } = Layout;

export type BaseLayoutProps = React.PropsWithChildren;

const BaseLayout = (params: BaseLayoutProps) => {
  const renderCount = useRef(0); // Track render count
  renderCount.current += 1;
  console.log("BaseLayout render count:", renderCount.current);

  const { UserGroups, setCurrentSelectGroupChat, User } = useUserContext();
  const { signoutRedirect } = useAuth();
  const { useToken } = theme;
  const { token } = useToken();
  const navigate = useNavigate();

  const handleGroupClick = (groupId: string) => {
    const group = UserGroups.data?.find((group) => group.Id === groupId);
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
              Message={UserGroups.error?.message}
              className="w-full h-full"
            />
          </div>
        )}
      </FixedSideBar>

      <Layout className=" pt-0">
        <FixedHeader className="shadow-md bg-white top-0 flex flex-row justify-between p-3 items-center">
          <section className="end-section flex flex-row  align-middle  ">
            <img
              src={User?.data?.AvatarUri ?? avatarBase}
              className="object-contain w-12 h-12 rounded-full mt-auto mb-auto ms-2"
            />
          </section>

          <section className="middle-section"></section>
          <section className="start-section">
            <MainButton
              onClick={() => {
                navigate("/logout");
              }}
            >
              Logout
            </MainButton>
          </section>
        </FixedHeader>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
    // </Layout>
  );
};
export default BaseLayout;
