import React from "react";
import { MdErrorOutline } from "react-icons/md";
export interface ErrorOutlineProps
  extends React.HTMLAttributes<HTMLDivElement> {
  Message?: string;
  IconSize: "small" | "medium" | "large";
}
const SMALL = "w-6 h-6";
const MEDIUM = "w-10 h-10";
const LARGE = "w-14 h-14";
const ErrorOutline = (param: ErrorOutlineProps) => {
  const { className, Message, IconSize, ...remainProps } = param;
  return (
    <div
      className={`flex flex-col justify-center items-center ${className} text-red-500`}
      {...remainProps}
    >
      <MdErrorOutline className={IconSize} />
      {Message && <p className="font-bold text-sm">{Message}</p>}
    </div>
  );
};

export default ErrorOutline;
