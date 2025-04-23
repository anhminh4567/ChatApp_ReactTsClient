import { useSettingStorageService } from "@/services/storageServices/useSettingStorage";
import { Theme } from "@/types/shared/Theme";
import { UserLocalSetting } from "@/types/shared/UserLocalSetting";
import { theme } from "antd";
import { create } from "zustand";

export interface useLocalSettingStoreType {
  userSetting: UserLocalSetting;
  setSetting: (newSetting: UserLocalSetting) => void;
  changeTheme: (themeName: Theme) => void;
}
const initialUserSetting: UserLocalSetting = useSettingStorageService.get();

export const useLocalSettingStore = create<useLocalSettingStoreType>(
  (set, get) => ({
    userSetting: initialUserSetting,
    setSetting: (newSetting: UserLocalSetting) => {
      useSettingStorageService.set(newSetting);
      set({ userSetting: newSetting });
    },
    changeTheme: (themeName: Theme) => {
      const newSetting = { ...get().userSetting, theme: themeName };
      useSettingStorageService.set(newSetting);
      set({ userSetting: newSetting });
    },
  })
);
