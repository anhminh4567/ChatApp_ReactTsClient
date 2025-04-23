import { APP_CONFIG } from "@/config/appConfig";
import {
  DEFAULT_USER_LOCAL_SETTING,
  UserLocalSetting,
} from "@/types/shared/UserLocalSetting";

function set(newSetting: UserLocalSetting) {
  localStorage.setItem(
    APP_CONFIG.LOCAL_SETTING_KEY,
    JSON.stringify(newSetting)
  );
}

function get(): UserLocalSetting {
  let userSettingString = localStorage.getItem(APP_CONFIG.LOCAL_SETTING_KEY);
  let userSetting: UserLocalSetting | undefined = undefined;
  if (userSettingString) {
    userSetting = JSON.parse(userSettingString) as UserLocalSetting;
  } else {
    userSetting = DEFAULT_USER_LOCAL_SETTING;
    set(userSetting);
  }
  return userSetting;
}
export const useSettingStorageService = {
  set,
  get,
};
