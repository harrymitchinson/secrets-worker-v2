import React, { PropsWithChildren } from "react";

export interface Props {
  type?: "submit" | "button";
  onClick?: () => void;
  colour?: string;
  hover?: string;
  text?: string;
  disabled?: boolean;
  title: string;
  outline?: string;
  ref?: React.MutableRefObject<any>;
}
export default function Button({
  children,
  onClick,
  type = "submit",
  text = "text-gray-100",
  colour = "bg-green-600",
  hover = "hover:bg-green-700 hover:text-gray-200",
  outline = "focus:outline focus:outline-green-600 focus:outline-2 focus:outline-offset-2",
  disabled = false,
  title,
  ref,
}: PropsWithChildren<Props>) {
  if (disabled) {
    hover = "";
  }
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      title={title}
      className={`transition w-full ${colour} ${hover} ${text} rounded font-bold py-4 px-4 ${outline} disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:text-gray-400`}
      tabIndex={0}
    >
      {children}
    </button>
  );
}
