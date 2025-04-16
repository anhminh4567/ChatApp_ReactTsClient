import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import AntdProvider from "./providers/AntdProvider";
import AllRoutes from "./routes";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import UserProvider from "./providers/UserProvider";
import SecretProvider from "./providers/SecretProvider";
import AuthenticationProvider from "./providers/AuthenticationProvider";
// import "./App.css";
function App() {
  const testValue = import.meta.env.VITE_TEST_VALUE;

  return (
    <>
      <AntdProvider>
        <SecretProvider>
          <AuthenticationProvider>
            <ReactQueryProvider>
              <UserProvider>
                <AllRoutes />
              </UserProvider>
            </ReactQueryProvider>
          </AuthenticationProvider>
        </SecretProvider>
      </AntdProvider>
    </>
  );
}

export default App;
