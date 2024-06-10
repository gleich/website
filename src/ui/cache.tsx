import styles from "@/ui/cache.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Inconsolata } from "next/font/google";

const inconsolata = Inconsolata({ subsets: ["latin"] });

export default function Cache({
  name,
  lastUpdate,
}: {
  name: string;
  lastUpdate: Date;
}) {
  dayjs.extend(relativeTime);
  const lastUpdateRelative = dayjs(lastUpdate).fromNow();
  const lastUpdateExact = dayjs(lastUpdate).format("DD/MM/YYYY hh:MM A");
  return (
    <div className={`${styles.cache} ${inconsolata.className}`}>
      <div className={styles.status}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.icon}
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <p>{name} online</p>
      </div>
      <div className={styles.details}>
        <p>Auto updated {lastUpdateRelative}</p>
        <p>{lastUpdateExact}</p>
      </div>
    </div>
  );
}
