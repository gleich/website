import { Game } from '@/lib/steam';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/ui/steam/recentGames.module.css';
import { Inconsolata, Inter } from 'next/font/google';

const inconsolata = Inconsolata({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export default function RecentGames({ games }: { games: Game[] }) {
  return (
    <div className={styles.recentGames}>
      <h2 className={styles.title}>Games</h2>
      <p className={styles.description}>
        To relax I love to play video games with some of my friends. Here are my
        most recently played titles on{' '}
        <Link href="https://store.steampowered.com/">Steam</Link>:
      </p>
      <div className={styles.games}>
        {games.slice(0, 3).map((g) => (
          <div key={g.app_id} className={styles.game}>
            <Image src={g.header_url} alt={g.name} width={288} height={134} />
            <div className={`${styles.gameInfo} ${inconsolata.className}`}>
              <h3 className={`${styles.gameTitle} ${inter.className}`}>
                {g.name}
              </h3>
              <p>
                {(g.playtime.minutes_forever / 60).toPrecision(2)}hrs in total
              </p>
              <p>
                {(g.playtime.minutes_last_2weeks / 60).toPrecision(2)}hrs
                recently
              </p>
              <Link href={g.url} target="_blank">
                See in Steam store
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
