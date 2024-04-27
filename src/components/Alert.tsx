import { PropsWithChildren } from "react";

export default function Alert({ children }: PropsWithChildren) {
  return (
    <div
      className="rounded space-y-2 border-l-4 p-4 bg-orange-100 border-orange-500 text-orange-700 dark:bg-orange-800 dark:border-orange-600 dark:text-orange-300"
      role="alert"
    >
      {children}
    </div>
  );
}
