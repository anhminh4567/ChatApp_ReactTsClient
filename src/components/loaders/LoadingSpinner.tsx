import { Spin } from "antd";
import { HTMLAttributes } from "react";
import { ImSpinner8 } from "react-icons/im";

export interface LoadingSpinnerProps extends HTMLAttributes<HTMLDivElement> {
  Content?: React.ReactElement;
}

const DEFAULT_CONTENT: React.ReactElement = (
  <div className="flex flex-col justify-center">
    <ImSpinner8 className="animate-spin text-main-gold w-full h-full " />
    <p className="font-bold text-sm">Loading</p>
  </div>
);
const DEFAULT_PROPS: LoadingSpinnerProps = {
  Content: undefined,
};

const LoadingSpinner = (props: LoadingSpinnerProps) => {
  const { className, Content, ...remainProps } = { ...DEFAULT_PROPS, ...props };

  return (
    <Spin
      tip="Loading"
      size="large"
      className={`w-full h-full ${className}`}
      {...remainProps}
    >
      {Content}
    </Spin>
  );
};

export default LoadingSpinner;
