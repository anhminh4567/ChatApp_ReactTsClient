import { create } from "zustand";
import { Group } from "@/types/group/Group";

interface UserGroupsState {
  userGroups: Group[] | null;
  currentSelectedGroup: Group | null;
  isLoading: boolean;
  isError: boolean;
  error?: Error;
  setUserGroups: (groups: Group[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error) => void;
  setCurrentSelectedGroup: (group: Group | null) => void;
}

const useUserGroupsStore = create<UserGroupsState>((set) => ({
  userGroups: null,
  isLoading: false,
  isError: false,
  error: undefined,
  currentSelectedGroup: null,
  setUserGroups: (groups) =>
    set({
      userGroups: groups,
      isLoading: false,
      isError: false,
      error: undefined,
    }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ isLoading: false, isError: true, error }),
  setCurrentSelectedGroup: (group) => set({ currentSelectedGroup: group }),
}));

export default useUserGroupsStore;
