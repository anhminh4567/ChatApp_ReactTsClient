import React from "react";
import { AuthProvider } from "react-oidc-context";
import { useSecretContext } from "./SecretProvider";
import { User, WebStorageStateStore } from "oidc-client-ts";

const AuthenticationProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const secret = useSecretContext();
  const { AwsCognitoConfig } = secret;
  return (
    <AuthProvider
      authority={AwsCognitoConfig.authority}
      client_id={AwsCognitoConfig.client_id}
      redirect_uri={AwsCognitoConfig.redirect_uri}
      response_type={AwsCognitoConfig.response_type}
      scope={AwsCognitoConfig.scope}
      stateStore={new WebStorageStateStore({ store: localStorage })}
      userStore={new WebStorageStateStore({ store: localStorage })}
      onSigninCallback={(user: User) => {
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      }}
    >
      {children}
    </AuthProvider>
  );
};

export default AuthenticationProvider;
