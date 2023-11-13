import CreateSecret, { TTL } from "@/components/CreateSecret";
import { duration } from "moment";

export const runtime = "edge";

function getTTLs() {
  const ttls: TTL[] = [
    { duration: duration(5, "minutes") },
    { duration: duration(30, "minutes"), default: true },
    { duration: duration(1, "hour") },
    { duration: duration(4, "hours") },
    { duration: duration(1, "day") },
    { duration: duration(3, "days") },
    { duration: duration(7, "days") },
  ].map((d) => ({
    name: d.duration.humanize({ d: 7, w: 4 }),
    value: d.duration.asSeconds(),
    default: d.default == true,
  }));
  return ttls;
}

export default function Index() {
  const ttls = getTTLs();
  return <CreateSecret ttls={ttls}></CreateSecret>;
}
