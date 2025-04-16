import React from "react";
import { Button, ButtonProps } from "antd";

export interface MainButtonProps
  extends Omit<ButtonProps, "type" | "shape" | "color"> {}

const MainButton = (param: MainButtonProps) => {
  return (
    <Button type="primary" shape="default" {...param}>
      {param.children}
    </Button>
  );
};

export default MainButton;
