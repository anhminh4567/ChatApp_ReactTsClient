import { Group } from "../group/Group";
import { User } from "../user/User";
import { UserFriend } from "../user/UserFriend";
import { UserLetter } from "../user/UserLetter";
import { DataFetchState } from "./DataFetchState";

export type UserContextType = {
  User?: DataFetchState<User>;
  IdentityId: string;
  UserGroups: DataFetchState<Group[]>;
  UserFriends?: UserFriend[];
  UserLetters?: UserLetter[];
  CurrentSelectGroupChat?: Group;
  setCurrentSelectGroupChat: (group: Group | null) => void;
  setUser?: (user: User) => void;
  setUserGroups: (groups: Group[]) => void;
};
