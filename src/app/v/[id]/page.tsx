import ViewSecret from "@/components/ViewSecret";
import { notFound } from "next/navigation";

export const runtime = "edge";

async function checkSecretExists(id: string) {
  const { SECRETS } = process.env as unknown as { SECRETS: KVNamespace };
  const secret = await SECRETS.get(id, "arrayBuffer");
  if (secret == null) {
    return undefined;
  }
  return { id };
}

export default async function View({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams?: { p: string };
}) {
  const result = await checkSecretExists(id);

  if (!result?.id) {
    return notFound();
  }

  return <ViewSecret id={id} password={searchParams?.p}></ViewSecret>;
}
