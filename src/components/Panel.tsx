import Link from "next/link";
import { PropsWithChildren } from "react";

export type Props = {
  title: string;
};

export default function Panel({ title, children }: PropsWithChildren<Props>) {
  return (
    <>
      <header className="w-full max-w-screen-md sm:rounded-t bg-indigo-700 dark:bg-gray-700 shadow-md py-8 px-4 sm:p-8 font-bold text-center font-bold text-2xl">
        <h1 className="text-2xl text-indigo-100 dark:text-gray-200">{title}</h1>
      </header>
      <main className="w-full max-w-screen-md bg-gray-100 dark:bg-gray-800 shadow-md py-8 px-4 sm:px-8">
        {children}
      </main>
      <footer className="w-full max-w-screen-md sm:rounded-b bg-gray-200 dark:bg-gray-700 shadow-md py-4 px-4 sm:px-8 text-center flex justify-between items-center">
        <div>Read the{" "}<Link
          className="transition text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-500 font-bold rounded focus:outline focus:outline-indigo-600 focus:outline-2 focus:outline-offset-2"
          href="/faq"
          tabIndex={0}
        >
          FAQs
        </Link></div>
        <div>
         View source code on{" "}
        <a
          title="harrymitchinson/secrets-worker-v2"
          className="transition text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-500 font-bold rounded focus:outline focus:outline-indigo-600 focus:outline-2 focus:outline-offset-2"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/harrymitchinson/secrets-worker-v2"
          tabIndex={0}
        >
          GitHub
        </a></div>
      </footer>
    </>
  );
}
