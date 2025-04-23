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
  Modal,
} from "antd";

import React, { Suspense, useEffect, useRef } from "react";
import FixedSideBar from "./leftNavBars/FixedSideBar";
import FixedHeader from "./topBars/FixedHeader";
import geminiGenIcon from "@/assets/gemini-gen.png";
import avatarBase from "@/assets/avatarbase.jpg";
import LoadingSpinner from "@/components/loaders/LoadingSpinner";
import ErrorOutline from "@/components/errors/ErrorOutline";
import { useUserContext } from "@/context/useUserContext";
import { data, Outlet, useNavigate } from "react-router";
import MainButton from "@/components/buttons/MainButton";
import { useAuth } from "react-oidc-context";
import useUserGroupsStore from "@/store/useGroupStore";
import UserDetailModal from "@/features/userDetail/UserDetailModal";
const { Content } = Layout;
const { confirm } = Modal;
type MenuItem = Required<MenuProps>["items"][number];

export type BaseLayoutProps = React.PropsWithChildren;

const BaseLayout = (params: BaseLayoutProps) => {
  const renderCount = useRef(0); // Track render count
  renderCount.current += 1;
  console.log("BaseLayout render count:", renderCount.current);

  const { User } = useUserContext();
  const { isLoading, error, userGroups, setCurrentSelectedGroup } =
    useUserGroupsStore();
  const { useToken } = theme;
  const { token } = useToken();
  const navigate = useNavigate();
  const [isUserDetailModalOpen, setIsUserDetailIsModalOpen] =
    React.useState<boolean>(false);
  const handleGroupClick = (groupId: string) => {
    const group = userGroups?.find((group) => group.Id === groupId);
    if (!group) return;
    setCurrentSelectedGroup(group);
    navigate(`/group/${group.Id}`);
  };
  const handleProfileClick = () => {
    console.log("clicked");
    setIsUserDetailIsModalOpen((prev) => !prev);
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
        {isLoading && (
          <div className="w-full h-[80%] flex flex-col justify-center items-center">
            <LoadingSpinner className="p-4" />
          </div>
        )}
        {!isLoading && !error && userGroups && (
          <Menu
            mode="inline"
            items={userGroups.map((item): MenuItem => {
              return {
                key: item.Id,
                icon: (
                  <Avatar
                    src={
                      !item.ThumbDetail ? avatarBase : item.ThumbDetail.FileUrl
                    }
                  />
                ),
                label: item.Name,
                onClick: () => {
                  handleGroupClick(item.Id);
                },
                className: "", //min-h-14
              };
            })}
          ></Menu>
        )}
        {error && (
          <div className="w-full h-[80%] mx-auto">
            <ErrorOutline
              IconSize="medium"
              Message={error.message}
              className="w-full h-full"
            />
          </div>
        )}
      </FixedSideBar>

      <Layout className=" pt-0">
        <FixedHeader className="shadow-smtop-0 flex flex-row justify-between p-3 items-center">
          <section className="end-section flex flex-row  align-middle gap-2 ">
            <img
              src={User?.data?.AvatarUri ?? avatarBase}
              className="object-contain w-12 h-12 rounded-full mt-auto mb-auto ms-2"
              onClick={() => {
                handleProfileClick();
              }}
            />
            <p>{User?.data?.Name}</p>
            <UserDetailModal
              isOpen={isUserDetailModalOpen}
              onCloseClick={() => {
                setIsUserDetailIsModalOpen(false);
              }}
            ></UserDetailModal>
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
