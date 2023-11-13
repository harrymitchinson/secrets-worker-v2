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
  const { SECRETS } = process.env as unknown as { SECRETS: KVNamespace };

  const { secret, ttl } = await request.json<any>();

  const id = generate(12);
  const password = generate(24);

  let encrypted: ArrayBufferLike;
  try {
    encrypted = await encrypt(secret, password);
  } catch (e) {
    return NextResponse.json(null, { status: 500 });
  }

  try {
    await SECRETS.put(id, encrypted, { expirationTtl: ttl });
  } catch (e) {
    return NextResponse.json(null, { status: 500 });
  }

  return NextResponse.json({ id, password });
};
