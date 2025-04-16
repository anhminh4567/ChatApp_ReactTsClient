//import { useAuthContext } from "@/context/useAuthContext";
import BaseLayout from "@/layouts/BaseLayout";
import { Routes, Route } from "react-router-dom";
import Chat from "../pages/Chat/ChatPage";
import ChatPage from "../pages/Chat/ChatPage";
import EmptyLayout from "@/layouts/EmptyLayout";
import AuthenticationPage from "../pages/Authentication/AuthenticationPage";

const AllRoutes = () => {
  //const { user } = useAuthContext();
  return (
    <>
      <Routes>
        {/* <Route path="group/:groupId" element={ }/> */}
        <Route path="/security" element={<EmptyLayout />}>
          <Route index element={<AuthenticationPage />} />
          <Route
            path="register"
            element={<div className="bg-">register</div>}
          />
        </Route>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<>select a group</>} />
          <Route path="group">
            <Route path=":groupId" element={<ChatPage />} />
          </Route>
        </Route>

        <Route path="*" element={<div>not found 404</div>} />
      </Routes>
    </>
  );
};

export default AllRoutes;
