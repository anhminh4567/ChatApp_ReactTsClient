import { UserContextType } from "@/types/shared/UserContextType";
import { createContext, useContext, useState, useEffect } from "react";
import { getGroupsForUser } from "@/services/chatServices/GroupServices";
import { getUserByIdentityId } from "@/services/chatServices/UserServices";
import { Group } from "@/types/group/Group";
import { useQueries } from "@tanstack/react-query";

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
  const identityId = "d9fef468-c0f1-708e-5ee8-3a0375ee1f4d"; //"c28ab02a-73a5-4614-a822-e34054b04051";

  const getUserByIdentityQuery = getUserByIdentityId(identityId);
  /// dependent query
  const getUserGroupQuery = getGroupsForUser(identityId, {
    enabled: !!getUserByIdentityQuery.data,
  });

  // const [usergroups, setUsergroups] = useState([]);
  // const [currentUser, setCurrentUser] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  return (
    <UserContext.Provider
      value={{
        User: {
          data: getUserByIdentityQuery.data,
          isLoading: getUserByIdentityQuery.isLoading,
          isError: getUserByIdentityQuery.isError,
          error: getUserByIdentityQuery.error,
        },
        IdentityId: identityId,
        UserGroups: {
          data: getUserGroupQuery.data,
          isLoading: getUserGroupQuery.isLoading,
          isError: getUserGroupQuery.isError,
          error: getUserGroupQuery.error,
        },
        CurrentSelectGroupChat: selectedGroup,
        setCurrentSelectGroupChat: (group: Group | null) => {
          setSelectedGroup(group);
        },
        setUser: (user) => {
          // setCurrentUser(user);
        },
        setUserGroups: (groups) => {
          // setUsergroups(groups);
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
