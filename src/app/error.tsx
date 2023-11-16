"use client";

import { useEffect } from "react";

export const runtime = "edge";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="w-full max-w-screen-md md:flex text-gray-400">
      <div className="w-full p-8 md:pr-4 pb-8 md:border-r border-gray-800 text-center md:text-right text-6xl">
        <h1>500</h1>
      </div>
      <div className="w-full p-8 md:pl-4 block">
        An unexpected error occurred. Try the{" "}
        <a
          className="transition text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-500 font-bold rounded focus:outline focus:outline-indigo-500 focus:outline-2 focus:outline-offset-2"
          href="/"
        >
          home page
        </a>{" "}
        instead.
      </div>
    </main>
  );
}
