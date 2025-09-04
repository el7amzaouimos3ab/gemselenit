import React from "react";
import { twMerge } from "tailwind-merge";
interface Props {
  children: React.ReactNode;
  className?: string;
}
const Title = ({ children, className }: Props) => {
  return (
    <h2 className={twMerge("text-3xl text-gray-200 font-semibold ", className)}>{children}</h2>
  );
};

export default Title;
