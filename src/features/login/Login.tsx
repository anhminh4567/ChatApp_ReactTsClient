import { Checkbox, Form, Input } from "antd";
import React from "react";
import { LoginRequestDto } from "./types/LoginRequestDto";
import MainButton from "@/components/buttons/MainButton";
import { useAuth } from "react-oidc-context";
import { useLocation } from "react-router";
import { useSecretContext } from "@/app/providers/SecretProvider";

const Login = () => {
  const [form] = Form.useForm<LoginRequestDto>();
  const oidcAuth = useAuth();
  const { AwsCognitoConfig } = useSecretContext();
  const signOutRedirect = () => {
    const clientId = AwsCognitoConfig.client_id;
    const logoutUri = AwsCognitoConfig.logout_uri;
    const cognitoDomain = AwsCognitoConfig.domain;
    const logoutUrl = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
    window.location.href = logoutUrl;
  };
  const url = window.location.href;
  if (oidcAuth.isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (oidcAuth.error) {
    return (
      <div className="text-white">
        Encountering error... {oidcAuth.error.message}
      </div>
    );
  }
  if (oidcAuth.isAuthenticated) {
    return (
      <div className="text-white">
        <pre> Hello: {oidcAuth.user?.profile.email} </pre>
        <pre> ID Token: {oidcAuth.user?.id_token} </pre>
        <pre> Access Token: {oidcAuth.user?.access_token} </pre>
        <pre> Refresh Token: {oidcAuth.user?.refresh_token} </pre>

        <button onClick={() => oidcAuth.removeUser()}>Sign out</button>
      </div>
    );
  }
  return (
    <div className=" w-full h-full flex  justify-center items-center gap-4 bg-white m-2 md:m-4 p-4 rounded-lg shadow-md">
      <div>
        <MainButton onClick={() => oidcAuth.signinRedirect()} className="mx-4">
          Sign in
        </MainButton>
        <MainButton onClick={() => signOutRedirect()}>Sign out</MainButton>
      </div>
      {/* <Form
        className="w-full h-full"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        form={form}
        name="login-form"
        onFinish={(values) => {
          console.log("Received values of form: ", values);
          oidcAuth.signinRedirect();
        }}
        onFinishFailed={(errorInfo) => {}}
      >
        <Form.Item<LoginRequestDto>
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input type="text" placeholder="Enter your username" />
        </Form.Item>
        <Form.Item<LoginRequestDto>
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input type="password" placeholder="Enter your password" />
        </Form.Item>
        <Form.Item<LoginRequestDto>
          name="rememberMe"
          valuePropName="checked"
          label={null}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item className="">
          <MainButton htmlType="submit">Login</MainButton>
        </Form.Item>
      </Form> */}
    </div>
  );
};

export default Login;
