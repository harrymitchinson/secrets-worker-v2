import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "../../../api/crypto";

export const runtime = "edge";

export type DecryptResponse = {
  secret: string;
};

export const POST = async (request: NextRequest): Promise<Response> => {
  const { SECRETS } = process.env as unknown as { SECRETS: KVNamespace };

  if (request.method != "POST") {
    return new Response(null, { status: 405 });
  }
  const { id, password } = await request.json<any>();

  const encrypted = await SECRETS.get(id, "arrayBuffer");
  if (encrypted == null) {
    return NextResponse.json(null, { status: 404 });
  }

  let secret: ArrayBuffer;
  try {
    secret = await decrypt(encrypted!, password);
  } catch (e) {
    return NextResponse.json(null, { status: 401 });
  }

  try {
    await SECRETS.delete(id);
  } catch (e) {
    return NextResponse.json(null, { status: 500 });
  }

  return NextResponse.json({ secret: new TextDecoder().decode(secret) });
};
