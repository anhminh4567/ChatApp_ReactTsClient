import { Checkbox, Form, Input, notification, theme } from "antd";
import React, { useEffect } from "react";
import { LoginRequestDto } from "./types/LoginRequestDto";
import MainButton from "@/components/buttons/MainButton";
import { useAuth } from "react-oidc-context";
import { Link, useLocation, useNavigate } from "react-router";
import { useSecretContext } from "@/app/providers/SecretProvider";
import LoadingSpinner from "@/components/loaders/LoadingSpinner";
import ErrorOutline from "@/components/errors/ErrorOutline";
import AppImage from "@/assets/gemini-gen-trans.jpg";
const Authentication = () => {
  // const [form] = Form.useForm<LoginRequestDto>();
  const oidcAuth = useAuth();
  const { AwsCognitoConfig } = useSecretContext();
  const { token } = theme.useToken();
  // const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const signOutRedirect = () => {
    const clientId = AwsCognitoConfig.client_id;
    const logoutUri = AwsCognitoConfig.logout_uri;
    const cognitoDomain = AwsCognitoConfig.domain;
    const logoutUrl = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
    window.location.href = logoutUrl;
  };
  useEffect(() => {
    if (oidcAuth.isAuthenticated) {
      console.log("user is authenticated", oidcAuth.user);
      navigate("/");
    }
  }, [oidcAuth.isAuthenticated]);
  if (oidcAuth.isLoading) {
    console.log("user is loading");
    return (
      <div className="flex justify-center align-middle">
        <LoadingSpinner />
      </div>
    );
  }

  if (oidcAuth.error) {
    console.log("user is error", oidcAuth.error.message);
    return (
      <div className="flex justify-center align-middle">
        <ErrorOutline IconSize="large" Message={oidcAuth.error.message} />
      </div>
    );
  }

  console.log("user is not authenticated", oidcAuth.isAuthenticated);
  return (
    <div
      className=" w-full h-full flex flex-col justify-center items-center gap-4 bg-white p-4 rounded-lg "
      style={{
        backgroundColor: token.colorBgElevated,
      }}
    >
      <img src={AppImage} className="w-10 h-10 md:w-14 md:h-14 rounded-full" />
      <div>
        {/* {contextHolder} */}
        {oidcAuth.isAuthenticated ? (
          <>
            <div className="flex flex-col justify-center items-center gap-4">
              <h1 className="text-lg font-bold text-gray-800">Welcome</h1>
              <div className="w-full flex flex-col justify-center items-center gap-4">
                <MainButton
                  onClick={() => signOutRedirect()}
                  className="w-full"
                >
                  Sign out
                </MainButton>
                <MainButton className="w-full">
                  <Link to="/">Home</Link>
                </MainButton>
              </div>
            </div>
          </>
        ) : (
          <MainButton
            onClick={() => oidcAuth.signinRedirect()}
            className="mx-4"
          >
            Sign in
          </MainButton>
        )}

        {/* <MainButton onClick={() => signOutRedirect()}>Sign out</MainButton> */}
      </div>
    </div>
  );
};

export default Authentication;
