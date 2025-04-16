import React from "react";
import { Outlet } from "react-router-dom";
import AppIconDefault from "@/assets/gemini-gen.png";
import AppIconSecond from "@/assets/gemini-gen-trans.jpg";
const EmptyLayout = () => {
  return (
    <div
      className="h-screen w-screen flex justify-center items-center  bg-contain bg-center bg-no-repeat  "
      style={{
        backgroundColor: "#f5f5f5",
        backgroundImage: `url(${AppIconSecond})`,
      }}
    >
      <div
        className="container w-[90%] h-[80%] relative rounded-lg "
        style={{
          backgroundColor: "rgba(2, 2, 2, 0.7)",
          backdropFilter: "blur(16px) saturate(180%) ",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default EmptyLayout;
