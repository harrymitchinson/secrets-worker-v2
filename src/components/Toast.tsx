import { PropsWithChildren } from "react";
import toast from "react-hot-toast";

export enum State {
  Success = 0,
  Error,
}

export type Props = {
  id: string;
  visible: boolean;
  state?: State;
};

export default function Toast({
  id,
  visible,
  state,
  children,
}: PropsWithChildren<Props>) {
  const styles = new Map<
    State,
    { main: string; border: string; button: string }
  >([
    [
      State.Success,
      {
        main: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200",
        border: "border-gray-200 dark:border-gray-700",
        button:
          "text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 hover:bg-gray-100 dark:hover:text-indigo-500 dark:hover:bg-gray-700",
      },
    ],
    [
      State.Error,
      {
        main: "bg-red-500 text-gray-100",
        border: " border-red-400",
        button: "hover:text-red-800 hover:bg-red-600 hover:text-gray-200",
      },
    ],
  ]);

  const style = styles.get(state || State.Success);

  return (
    <>
      <span className="animate-enter hidden"></span>
      <div
        className={`${
          visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full ${
          style?.main
        } shadow-lg rounded pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium">{children}</p>
            </div>
          </div>
        </div>
        <div className={`flex border-l ${style?.border}`}>
          <button
            onClick={() => toast.dismiss(id)}
            className={`transition w-full border border-transparent rounded-r p-4 flex items-center justify-center text-sm ${style?.button} font-bold focus:outline-none`}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
