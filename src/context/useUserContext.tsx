import { UserContextType } from "@/types/shared/UserContextType";
import { createContext, useContext, useState } from "react";
import { getGroupsForUser } from "@/services/chatServices/GroupServices";
import { getUserById } from "@/services/chatServices/UserServices";
import { Group } from "@/types/group/Group";

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
  const userId = "c28ab02a-73a5-4614-a822-e34054b04051";
  const getUserGroupQuery = getGroupsForUser(userId);
  const [usergroups, setUsergroups] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  return (
    <UserContext.Provider
      value={{
        User: currentUser,
        UserId: userId,
        UserGroups: usergroups,
        CurrentSelectGroupChat: selectedGroup,
        setCurrentSelectGroupChat: (group: Group | null) => {
          setSelectedGroup(group);
        },
        setUser: (user) => {
          setCurrentUser(user);
        },
        setUserGroups: (groups) => {
          setUsergroups(groups);
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
