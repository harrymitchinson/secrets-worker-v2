import { PropsWithChildren } from "react";

export default function TextError({ children }: PropsWithChildren) {
  return (
    <div className="text-red-600 dark:text-red-500 text-sm text-bold pt-2 font-medium">
      {children}
    </div>
  );
}
