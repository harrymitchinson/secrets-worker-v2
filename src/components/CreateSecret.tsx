"use client";

import { useMutation } from "@tanstack/react-query";

import CreateSecretFrom, { Values, TTL } from "@/components/CreateSecretForm";
import CreateSecretResult from "@/components/CreateSecretResult";
import CreateNewSecretButton from "@/components/CreateNewSecretButton";
import Panel from "@/components/Panel";

import { EncryptResponse } from "@/app/api/encrypt/route";

export type Props = {
  ttls: TTL[];
};

export default function CreateSecret({ ttls }: Props) {
  const { mutateAsync, data, isSuccess, reset, isError, error } = useMutation({
    mutationFn: async ({ secret, ttl }: Values): Promise<EncryptResponse> => {
      const res = await fetch("/api/encrypt", {
        body: JSON.stringify({ secret, ttl }),
        method: "POST",
      });
      if (res.status == 200) {
        return res.json();
      }
      throw new Error(`bad api response: ${res.status}`);
    },
  });

  if (isError) {
    throw error;
  }

  if (isSuccess) {
    return (
      <>
        <Panel title="Share your secret">
          <CreateSecretResult
            url={`${window.location.href}v/${data.id}`}
            password={data.password}
          />
        </Panel>
        <CreateNewSecretButton onClick={() => reset()} />
      </>
    );
  }

  return (
    <Panel title="Create a secret">
      <CreateSecretFrom
        ttls={ttls}
        onSubmit={async (data: Values) => {
          await mutateAsync(data);
        }}
      />
    </Panel>
  );
}

export type { TTL };
