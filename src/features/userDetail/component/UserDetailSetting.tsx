import { useLocalSettingStore } from "@/store/useLocalSettingStore";
import { Theme } from "@/types/shared/Theme";
import { Switch, theme } from "antd";
import React, { use } from "react";

const UserDetailSetting = () => {
  const { changeTheme } = useLocalSettingStore();
  const isThemeDarkMode =
    useLocalSettingStore((state) => state.userSetting.theme) === Theme.DARK;
  return (
    <div className="flex flex-row justify-between items-center gap-2">
      <section className="left w-full ">
        <span className="text-center font-bold flex items-center gap-2">
          <Switch
            defaultChecked={isThemeDarkMode}
            onChange={(checked) => {
              if (checked) {
                changeTheme(Theme.DARK);
              } else {
                changeTheme(Theme.LIGHT);
              }
            }}
          />
          Dark Mode
        </span>
      </section>
    </div>
  );
};

export default UserDetailSetting;
