import { loadSteamData } from '@/lib/lcp/steam';
import Link from 'next/link';
import styles from '@/ui/root/games/games.module.css';
import LiveSection from '../../section/liveSection';
import Image from 'next/image';
import { renderDuration } from '@/lib/time';
import Stats from '@/ui/stats';
import Card from '@/ui/card';
import { Inconsolata } from 'next/font/google';

const inconsolata = Inconsolata({ subsets: ['latin'] });

export default async function Games() {
  const steamData = await loadSteamData();
  const games = steamData.data;
  return (
    <LiveSection
      name="Games"
      sourceIcon="steam"
      source="Steam"
      sourceURL="https://store.steampowered.com/about/"
      lastUpdated={steamData.updated}
    >
      <div>
        <p>
          To relax, I love playing video games with some of my friends. Here are
          my recently played titles from{' '}
          <Link href="https://store.steampowered.com/about/" target="_blank">
            Steam
          </Link>
          :
        </p>
        <div className={styles.games}>
          {games.slice(0, 5).map((g) => {
            const stats = new Map<string, string>([
              ['Playtime', renderDuration(g.playtime_forever * 60)],
              [
                'Achievements',
                g.achievement_progress == undefined
                  ? 'N/A'
                  : `${g.achievement_progress?.toPrecision(3)}%`,
              ],
            ]);
            return (
              <Card key={g.app_id} className={styles.game}>
                <Image
                  src={g.header_url}
                  height={217}
                  width={465}
                  alt={g.name}
                  className={styles.headerImage}
                />
                <div className={styles.gameDetails}>
                  <Stats stats={stats} />
                </div>
                {/* if game was played in the last 5 minutes */}
                {g.rtime_last_played - Date.now() < 300 && (
                  <p className={`${inconsolata.className} ${styles.inGame}`}>
                    CURRENTLY PLAYING
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </LiveSection>
  );
}
