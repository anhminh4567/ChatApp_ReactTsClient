import { AwsCognitoAuthConfig } from "@/types/aws/AwsCognitoConfig";
import React, { useContext } from "react";

export interface SecretContext {
  AwsCognitoConfig: AwsCognitoAuthConfig;
}
const SecretContext = React.createContext<SecretContext | null>(null);

export function useSecretContext() {
  const context = useContext(SecretContext);
  if (!context) {
    throw new Error("use user must be used within an AuthProvider");
  }
  return context;
}
const SecretProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SecretContext.Provider
        value={{
          AwsCognitoConfig: {
            authority: import.meta.env.VITE_AWS_AUTHORITY,
            client_id: import.meta.env.VITE_AWS_CLIENT_ID,
            redirect_uri: import.meta.env.VITE_AWS_REDIRECT_URI,
            response_type: import.meta.env.VITE_AWS_RESPONSE_TYPE,
            scope: import.meta.env.VITE_AWS_SCOPE,
            logout_uri: import.meta.env.VITE_AWS_LOGOUT_URI,
            domain: import.meta.env.VITE_AWS_COGNITO_DOMAIN,
          },
        }}
      >
        {children}
      </SecretContext.Provider>
    </>
  );
};

export default SecretProvider;
