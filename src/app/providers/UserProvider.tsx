import { UserContextProvider } from "@/context/useUserContext";
import React from "react";

const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <UserContextProvider>{children}</UserContextProvider>{" "}
    </>
  );
};

export default UserProvider;
