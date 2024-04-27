"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Error from "./Error";

export interface TTL {
  name: string;
  value: number;
  default?: boolean;
}

export interface Props {
  ttls: TTL[];
  onSubmit: (data: Values) => Promise<void>;
}

export interface Values {
  secret: string;
  ttl: number;
}

export default function CreateSecretForm({ ttls, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isValid, isSubmitting },
  } = useForm<Values>();

  useEffect(() => {
    setFocus("secret");
  }, [setFocus]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-s">
        <div className="mb-8">
          <label htmlFor="secret">
            <div className="font-bold">Secret content</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              The data that you wish to share secretly
            </div>
          </label>

          <textarea
            id="secret"
            rows={7}
            title="Secret content"
            className="mt-4 font-mono block appearance-none w-full rounded bg-gray-100 dark:bg-gray-700 border border-gray-300  dark:border-gray-600 dark:hover:border-gray-500 px-4 py-2 pr-8 shadow focus:outline focus:outline-indigo-500 focus:outline-2 focus:outline-offset-2"
            {...register("secret", { required: "This is required", min: 1 })}
          />
          {errors.secret && <Error>{errors.secret.message?.toString()}</Error>}
        </div>

        <div className="mb-8">
          <label htmlFor="ttl">
            <div className="font-bold">Time to live (TTL)</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              How long the secret should exist for before deletion if not viewed
            </div>
          </label>

          <div className="inline-block relative w-full mt-2">
            <select
              id="ttl"
              title="Time to live"
              className="block appearance-none rounded w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500 mt-2 px-4 py-2 pr-8 shadow focus:outline focus:outline-indigo-500 focus:outline-2 focus:outline-offset-2"
              {...register("ttl", { required: true })}
              defaultValue={ttls.find((x) => x.default == true)!.value}
            >
              {ttls.map(({ name, value }) => (
                <option key={value} value={value}>
                  {name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-7 right-0 flex items-center px-2">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <Button
          disabled={isSubmitting || !isValid}
          title={isSubmitting ? "Loading..." : "Create secret link"}
        >
          {isSubmitting ? "Loading..." : "Create secret link"}
        </Button>
      </form>
    </>
  );
}
