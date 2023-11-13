"use client";

import { useForm } from "react-hook-form";
import { copyToClipboard } from "./Clipboard";
import { useEffect } from "react";

export interface Props {
  secret: string;
}

type Values = {
  secret: string;
};

export default function ViewSecretResult({ secret }: Props) {
  const { register, setFocus, handleSubmit } = useForm<Values>();

  useEffect(() => {
    setFocus("secret", { shouldSelect: true });
  }, [setFocus]);

  return (
    <form
      className="w-full max-w-s"
      onSubmit={handleSubmit((_, e) => e?.preventDefault())}
    >
      <div className="">
        <div className="mb-4">
          You will not be able to view this secret again again. The encrypted
          value and password have been destroyed and the secret now only exists
          in your this current browser session.
        </div>
        <textarea
          {...register("secret")}
          className="font-mono block appearance-none rounded w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 px-4 py-2 pr-8 shadow focus:outline focus:outline-indigo-500 focus:outline-2 focus:outline-offset-2"
          value={secret}
          rows={7}
          readOnly={true}
          onClick={copyToClipboard("secret", secret)}
        />
      </div>
    </form>
  );
}
