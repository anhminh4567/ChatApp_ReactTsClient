import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import AntdProvider from "./providers/AntdProvider";
import AllRoutes from "./routes";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import UserProvider from "./providers/UserProvider";
// import "./App.css";
function App() {
  const testValue = import.meta.env.VITE_TEST_VALUE;

  return (
    <>
      <AntdProvider>
        <ReactQueryProvider>
          <UserProvider>
            <AllRoutes />
          </UserProvider>
        </ReactQueryProvider>
      </AntdProvider>
    </>
  );
}

export default App;
