import AntdProvider from "./providers/AntdProvider";
import AllRoutes from "./routes";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import UserProvider from "./providers/UserProvider";
import SecretProvider from "./providers/SecretProvider";
import AuthenticationProvider from "./providers/AuthenticationProvider";
import ToastifyNotification from "@/components/notifications/ToastifyNotification";
import { useAuth } from "react-oidc-context";
import useSignalRStore from "@/store/useSignalRStore";
import { useLocalSettingStore } from "@/store/useLocalSettingStore";
// import "./App.css";
function App() {
  const { userSetting } = useLocalSettingStore();

  return (
    <>
      <AntdProvider>
        <SecretProvider>
          <AuthenticationProvider>
            <ReactQueryProvider>
              <UserProvider>
                <AllRoutes />
                <ToastifyNotification />
              </UserProvider>
            </ReactQueryProvider>
          </AuthenticationProvider>
        </SecretProvider>
      </AntdProvider>
    </>
  );
}

export default App;
