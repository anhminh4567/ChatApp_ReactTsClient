import { Theme } from "./Theme";

export type UserLocalSetting = {
  theme: Theme;
};
export const DEFAULT_USER_LOCAL_SETTING: UserLocalSetting = {
  theme: Theme.LIGHT,
};
