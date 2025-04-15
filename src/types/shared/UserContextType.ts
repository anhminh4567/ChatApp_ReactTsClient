import { Group } from "../group/Group";
import { User } from "../user/User";
import { UserFriend } from "../user/UserFriend";
import { UserLetter } from "../user/UserLetter";

export type UserContextType = {
  User?: User;
  UserId: string;
  UserGroups: Group[];
  UserFriends?: UserFriend[];
  UserLetters?: UserLetter[];
  CurrentSelectGroupChat?: Group;
  setCurrentSelectGroupChat: (group: Group | null) => void;
  setUser?: (user: User) => void;
  setUserGroups: (groups: Group[]) => void;
};
