"use client";

import { DecryptResponse } from "@/app/api/decrypt/route";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import CreateNewSecretButton from "./CreateNewSecretButton";
import ViewSecretForm, { Values } from "./ViewSecretForm";
import ViewSecretResult from "./ViewSecretResult";
import Panel from "./Panel";

const decryptHandler = async ({
  id,
  password,
}: Values): Promise<DecryptResponse> => {
  const res = await fetch("/api/decrypt", {
    body: JSON.stringify({
      id,
      password,
    }),
    method: "POST",
  });

  if (res.status == 200) {
    return res.json();
  }

  if (res.status == 401) {
    throw new Error("Incorrect password");
  }

  throw new Error("An unexpected error occurred");
};

export type Props = {
  id: string;
  password?: string;
};

export default function ViewSecret({ id, password }: Props) {
  const router = useRouter();
  const { mutateAsync, data, isSuccess, error } = useMutation<
    DecryptResponse,
    Error,
    Values,
    any
  >({ mutationFn: decryptHandler });

  if (isSuccess) {
    return (
      <>
        <Panel title="Your One Time Secret">
          <ViewSecretResult secret={data.secret} />
        </Panel>
        <CreateNewSecretButton onClick={async () => await router.push("/")} />
      </>
    );
  }

  return (
    <Panel title="Your One Time Secret">
      <ViewSecretForm
        id={id}
        onSubmit={async (data: Values) => {
          await mutateAsync(data);
        }}
        error={error!}
        password={password}
      />
    </Panel>
  );
}
