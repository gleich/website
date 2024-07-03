import { loadSteamData } from '@/lib/steam';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/ui/root/games/games.module.css';
import LiveSection from '../../section/liveSection';
import { Inconsolata } from 'next/font/google';

const inconsolata = Inconsolata({ subsets: ['latin'] });

function formatPlaytime(playtime_minutes: number): string {
  if (playtime_minutes >= 60) {
    const hours = playtime_minutes / 60;
    return hours % 1 === 0 ? `${hours} hrs` : `${hours.toFixed(1)} hrs`;
  } else {
    return playtime_minutes === 1
      ? `${playtime_minutes} min`
      : `${playtime_minutes} mins`;
  }
}

export default async function Games() {
  const steamData = await loadSteamData();
  const games = steamData.data;
  return (
    <LiveSection
      name="Games"
      source="Steam"
      sourceURL="https://store.steampowered.com/about/"
      lastUpdated={steamData.last_updated}
    >
      <div>
        <p>
          To relax I love to play video games with some of my friends. Here are
          my recently played titles over on{' '}
          <Link href="https://store.steampowered.com/about/" target="_blank">
            Steam
          </Link>
          :
        </p>
        <div className={styles.games}>
          {games
            .filter((g) => g.library_url != null)
            .slice(0, 20)
            .map((g) => (
              <Link
                key={g.app_id}
                href={g.url}
                target="_blank"
                className={styles.gameLink}
              >
                <Image
                  key={g.app_id}
                  src={g.library_url}
                  alt={g.name}
                  width={600 / 4.5}
                  height={900 / 4.5}
                  draggable={false}
                />
                <p className={`${styles.playTime} ${inconsolata.className}`}>
                  {formatPlaytime(g.playtime_forever)}
                </p>
              </Link>
            ))}
        </div>
      </div>
    </LiveSection>
  );
}
