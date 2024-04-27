"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import TextError from "./Error";

export type Props = {
  id: string;
  onSubmit: (data: Values) => Promise<void>;
  error?: Error;
  password?: string;
};

export type Values = {
  id: string;
  password: string;
};

export default function ViewSecretForm({
  id,
  onSubmit,
  error,
  password,
}: Props) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<Values>({
    defaultValues: {
      id: id,
      password: password || "",
    },
  });

  const [hidePassword, setHidePassword] = useState(password != undefined);

  useEffect(() => {
    if (error != null) {
      setError("password", { type: "custom", message: error.message });
      setHidePassword(false);
    }
  }, [setError, error]);

  useEffect(() => {
    if (password != undefined) {
      setHidePassword(true);
    }
  }, [setHidePassword, password]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-s">
        <input {...register("id")} hidden={true} />
        <div className="mb-8 space-y-4">
          <p>{`You've been sent a secret!`}</p>
          <p>
            Once you have viewed the secret, you will not be able to view it
            again. The secret will be destroyed when you click the button below
            and will only exist in your browser session.
          </p>
        </div>
        <div className={`mb-8 ${hidePassword ? "hidden" : ""}`}>
          <label className="block font-bold mb-4" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="text"
            className="block appearance-none rounded w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 mt-2 px-4 py-2 pr-8 shadow focus:outline focus:outline-indigo-500 focus:outline-2 focus:outline-offset-2"
            {...register("password", {
              required: "This is required",
              min: 1,
            })}
            hidden={hidePassword}
          />
          {errors.password && (
            <TextError>{errors.password.message?.toString()}</TextError>
          )}
        </div>
        <Button
          type="submit"
          disabled={isSubmitting || !isValid}
          title={isSubmitting ? "Loading..." : "View secret"}
        >
          {isSubmitting ? "Loading..." : "View secret"}
        </Button>
      </form>
    </>
  );
}
