"use client";

import { useMutation } from "@tanstack/react-query";

import CreateSecretFrom, { Values, TTL } from "@/components/CreateSecretForm";
import CreateSecretResult from "@/components/CreateSecretResult";
import CreateAnotherSecretButton from "@/components/CreateAnotherSecretButton";
import Panel from "@/components/Panel";

import { EncryptResponse } from "@/app/api/encrypt/route";

const encryptHandler = async ({
  secret,
  ttl,
}: Values): Promise<EncryptResponse> => {
  const res = await fetch("/api/encrypt", {
    body: JSON.stringify({ secret, ttl }),
    method: "POST",
  });
  return res.json();
};

export type Props = {
  ttls: TTL[];
};

export default function CreateSecret({ ttls }: Props) {
  const { mutate, data, isPending, isSuccess, reset } = useMutation({
    mutationFn: encryptHandler,
  });

  if (isSuccess) {
    return (
      <>
        <Panel title="Share your secret">
          <CreateSecretResult
            url={`${window.location.href}v/${data.id}`}
            password={data.password}
          ></CreateSecretResult>
        </Panel>
        <CreateAnotherSecretButton
          onClick={() => reset()}
        ></CreateAnotherSecretButton>
      </>
    );
  }

  return (
    <Panel title="Create a secret">
      <CreateSecretFrom
        ttls={ttls}
        disabled={isPending}
        onSubmit={async (data: Values) => {
          await mutate(data);
        }}
      />
    </Panel>
  );
}

export type { TTL };
