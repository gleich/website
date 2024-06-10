import styles from "./page.module.css";
import Header from "@/ui/root/header/header";
import Link from "next/link";
import Cache from "@/ui/cache";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.introduction}>
        <p>
          Hey! I&apos;m Matt Gleich, a college student attending the{" "}
          <Link href="https://rit.edu">
            Rochester Institute of Technology (RIT)
          </Link>
          . I&apos;m studying computer science and in my free I really enjoy
          cycling (gravel, road, & mountain bike) and photography. This website
          pulls in a bunch of data automatically from my proxy cache api built
          in rust (<Link href="https://github.com/gleich/lcp">gleich/lcp</Link>
          )! Here is the status of each cache:
        </p>
        <div className={styles.caches}>
          <Cache
            name="Strava"
            lastUpdate={new Date("2024-06-08T05:17:33.463127299Z")}
          />
          <Cache
            name="Steam"
            lastUpdate={new Date("2024-05-09T20:44:48.539286381Z")}
          />
        </div>
      </div>
    </main>
  );
}
