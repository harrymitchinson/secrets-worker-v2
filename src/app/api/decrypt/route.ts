import { createLogger } from "@/api/logger";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "../../../api/crypto";

export const runtime = "edge";

export type DecryptResponse = {
  secret: string;
};

async function toBuffer(stream: ReadableStream<any>) {
  const list = [];
  const reader = stream.getReader();
  while (true) {
    const { value, done } = await reader.read();
    if (value) list.push(value);
    if (done) break;
  }
  return Buffer.concat(list);
}

export const POST = async (request: NextRequest): Promise<Response> => {
  const logger = createLogger("http.decrypt");

  const { env, ctx } = getRequestContext();
  const { SECRETS } = env;

  if (request.method != "POST") {
    return new Response(null, { status: 405 });
  }
  const { id, password } = await request.json<any>();

  const scope = logger.with("secret", {
    secret_id: id,
  });

  const encrypted = await SECRETS.get(id, "stream");
  if (encrypted == null) {
    return NextResponse.json(null, { status: 404 });
  }

  scope.info("decrypting secret");

  let secret: ArrayBuffer;
  try {
    secret = await decrypt(await toBuffer(encrypted), password);
  } catch (e) {
    if (e instanceof DOMException && e.name == "InvalidAccessError") {
      return NextResponse.json(null, { status: 401 });
    }
    if (e instanceof Error) {
      scope.error(e, "failed to decrypt secret");
    }
    return NextResponse.json(null, { status: 500 });
  }

  scope.info("decrypted secret");

  ctx.waitUntil(SECRETS.delete(id));
  return NextResponse.json({ secret: new TextDecoder().decode(secret) });
};
