import { useLocalSettingStore } from "@/store/useLocalSettingStore";
import { Theme } from "@/types/shared/Theme";
import { ConfigProvider, ThemeConfig, theme } from "antd";
import React, { ReactNode, use, useMemo } from "react";

interface AntdProviderProps {
  children: ReactNode;
}
let MY_THEME_NORMAL: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
};
const AntdProvider: React.FC<AntdProviderProps> = ({ children }) => {
  const themeChoice = useLocalSettingStore((state) => state.userSetting.theme);
  // if (themeChoice === Theme.DARK) {
  //   MY_THEME_NORMAL.algorithm = theme.darkAlgorithm;
  // } else {
  //   MY_THEME_NORMAL.algorithm = theme.defaultAlgorithm;
  // }
  // console.log("is re-render theme: " + themeChoice);
  // Create a new ThemeConfig object whenever the theme changes
  const currentThemeConfig: ThemeConfig = useMemo(() => {
    return {
      algorithm:
        themeChoice === Theme.DARK
          ? theme.darkAlgorithm
          : theme.defaultAlgorithm,
    };
  }, [themeChoice]);
  return <ConfigProvider theme={currentThemeConfig}>{children}</ConfigProvider>;
};

export default AntdProvider;
