//import { useAuthContext } from "@/context/useAuthContext";
import BaseLayout from "@/layouts/BaseLayout";
import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "../pages/Chat/ChatPage";
import ChatPage from "../pages/Chat/ChatPage";
import EmptyLayout from "@/layouts/EmptyLayout";
import AuthenticationPage from "../pages/Authentication/AuthenticationPage";
import { Error400 } from "../pages/Errors/Error400";
import { useAuth } from "react-oidc-context";
import Logout from "../pages/Logout/Logout";
import LoadingSpinner from "@/components/loaders/LoadingSpinner";

const AllRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <>
      <Routes>
        {/* <Route path="group/:groupId" element={ }/> */}
        <Route path="/logout" element={<Logout />} />

        <Route path="/security" element={<EmptyLayout />}>
          <Route index element={<AuthenticationPage />} />
        </Route>
        <Route
          path="/"
          element={
            isAuthenticated ? <BaseLayout /> : <Navigate to={"/security"} />
          }
        >
          <Route index element={<>select a group</>} />
          <Route path="group">
            <Route path=":groupId" element={<ChatPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Error400 />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
