// import Link from "next/link";

// eslint-disable-next-line next-on-pages/no-nodejs-runtime
// export const runtime = "nodejs";

export default function NotFound() {
  return (
    <>
      <main className="w-full max-w-screen-md md:flex">
        <div className="font-mono w-full p-8 md:pr-4 pb-8 md:border-r border-indigo-700 dark:border-indigo-200 text-center md:text-right text-6xl">
          <h1>404</h1>
        </div>
        <div className="w-full p-8 md:pl-4 block">
          The secret you requested could not be found, or no longer exists. Try
          the{" "}
          <a
            className="transition text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-500 font-bold rounded focus:outline focus:outline-indigo-500 focus:outline-2 focus:outline-offset-2"
            href="/"
          >
            home page
          </a>{" "}
          instead.
        </div>
      </main>
    </>
  );
}
