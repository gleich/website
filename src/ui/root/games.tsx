import { Game } from '@/lib/steam';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/ui/root/games.module.css';
import { Inconsolata, Inter } from 'next/font/google';
import Section from '../section';

const inconsolata = Inconsolata({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export default function Games({ games }: { games: Game[] }) {
  return (
    <div className={styles.recentGames}>
      <Section
        name="Games"
        description="To relax I love to play video games with some of my friends. Here are my recently played titles over on Steam:"
      >
        <div className={styles.games}>
          {games.slice(0, 4).map((g) => (
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
      </Section>
    </div>
  );
}
