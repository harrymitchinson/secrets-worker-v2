"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { copyToClipboard } from "./Clipboard";

export interface Props {
  url: string;
  password: string;
}

type Values = {
  link: string;
};

export default function CreateSecretResult({ url, password }: Props) {
  const link = `${url}?p=${password}`;

  const { register, setFocus, handleSubmit } = useForm<Values>({
    defaultValues: { link: link },
  });

  useEffect(() => {
    setFocus("link", { shouldSelect: true });
  }, [setFocus]);

  return (
    <form
      className="w-full max-w-s"
      onSubmit={handleSubmit((_, e) => e?.preventDefault())}
    >
      <div className="">
        <div className="mb-4">
          Your secret has been created and your sharing link is ready. Once you
          leave this page, you will not be able to see the sharing link again.
        </div>
        <label className="font-bold">Your sharing link</label>
        <input
          {...register("link")}
          className="transition mt-4 block w-full rounded bg-gray-100 dark:bg-gray-700 border border-gray-300  dark:border-gray-600 dark:hover:border-gray-500 px-4 py-2 pr-8 shadow focus:outline focus:outline-indigo-500 focus:outline-2 focus:outline-offset-2"
          type="text"
          readOnly={true}
          title="Sharing link"
          onClick={copyToClipboard("sharing link", link)}
        />
      </div>
    </form>
  );
}
