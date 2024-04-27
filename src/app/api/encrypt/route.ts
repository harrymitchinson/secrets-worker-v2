import { createLogger } from "@/api/logger";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest, NextResponse } from "next/server";
import { encrypt } from "../../../api/crypto";

export const runtime = "edge";

export type EncryptResponse = {
  id: string;
  password: string;
};

const generate = (length = 8) =>
  Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map(
      (x, i) => (
        (i = ((x / 255) * 61) | 0),
        String.fromCharCode(i + (i > 9 ? (i > 35 ? 61 : 55) : 48))
      )
    )
    .join("");

export const POST = async (request: NextRequest): Promise<Response> => {
  const logger = createLogger("http.encrypt");

  const { secret, ttl } = await request.json<any>();

  const id = generate(12);
  const password = generate(24);

  const scope = logger.with("secret", { secret_id: id });

  let encrypted: ArrayBufferLike;
  try {
    encrypted = await encrypt(secret, password);
  } catch (e) {
    if (e instanceof Error) {
      scope.error(e, "failed to encrypt secret");
    }
    return NextResponse.json(null, { status: 500 });
  }
  scope.info("encrypted secret", {
    byte_length: encrypted.byteLength,
  });

  try {
    await getRequestContext().env.SECRETS.put(
      id,
      new Blob([encrypted]).stream(),
      {
        expirationTtl: ttl,
      }
    );
  } catch (e) {
    if (e instanceof Error) {
      scope.error(e, "failed to store secret in kv");
    }
    return NextResponse.json(null, { status: 500 });
  }
  scope.info("secret stored in kv");

  return NextResponse.json({ id, password });
};
