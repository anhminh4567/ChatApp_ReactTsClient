import { UserContextType } from "@/types/shared/UserContextType";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { getGroupsForUser } from "@/services/chatServices/GroupServices";
import {
  getUserDetailByIdentityId,
  getUserDetailByToken,
} from "@/services/chatServices/UserServices";
import { Group } from "@/types/group/Group";
import { useQueries } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";

const UserContext = createContext<UserContextType | null>(null);

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("use user must be used within an AuthProvider");
  }
  return context;
}

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated } = useAuth();
  const identityId = "d9fef468-c0f1-708e-5ee8-3a0375ee1f4d"; //"c28ab02a-73a5-4614-a822-e34054b04051";

  if (!isAuthenticated) {
    return (
      <UserContext.Provider
        value={{
          User: {
            data: null,
            isLoading: false,
            isError: false,
            error: null,
          },
          IdentityId: identityId,
          UserGroups: {
            data: null,
            isLoading: false,
            isError: false,
            error: null,
          },
          CurrentSelectGroupChat: null,
          setCurrentSelectGroupChat: () => {},
          setUser: () => {},
          setUserGroups: () => {},
        }}
      >
        {children}
      </UserContext.Provider>
    );
  }

  const getUserByIdTokenQuery = getUserDetailByToken(user.id_token);
  /// dependent query
  const getUserGroupQuery = getGroupsForUser(
    getUserByIdTokenQuery.data?.IdentityId,
    {
      enabled: !!getUserByIdTokenQuery.data,
    }
  );
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  // Memoize the context value to avoid unnecessary re-renders
  return (
    <UserContext.Provider
      value={{
        User: {
          data: getUserByIdTokenQuery.data,
          isLoading: getUserByIdTokenQuery.isLoading,
          isError: getUserByIdTokenQuery.isError,
          error: getUserByIdTokenQuery.error,
        },
        IdentityId: identityId,
        UserGroups: {
          data: getUserGroupQuery.data,
          isLoading: getUserGroupQuery.isLoading,
          isError: getUserGroupQuery.isError,
          error: getUserGroupQuery.error,
        },
        CurrentSelectGroupChat: selectedGroup,
        setCurrentSelectGroupChat: setSelectedGroup,
        setUser: () => {
          console.warn(
            "setUser is not implemented because data is fetched dynamically."
          );
        },
        setUserGroups: () => {
          console.warn(
            "setUserGroups is not implemented because data is fetched dynamically."
          );
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
