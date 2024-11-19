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
          {games
            .filter((g) => typeof g.library_url === 'string')
            .slice(0, 4)
            .map((g, i) => {
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
                  <Link
                    href={g.url}
                    className={styles.gameLink}
                    target="_blank"
                    title={g.name}
                  >
                    <Image
                      src={g.library_url as string}
                      height={455}
                      width={303}
                      alt={g.name}
                      className={styles.headerImage}
                    />
                    <div className={styles.gameDetails}>
                      <div className={styles.statsContainer}>
                        <Stats className={styles.stats} stats={stats} />
                      </div>
                      {/* if game was played in the last 5 minutes */}
                      {i == 0 &&
                        Date.now() - new Date(g.rtime_last_played).getTime() <
                          5 * 60 * 1000 && (
                          <p
                            className={`${inconsolata.className} ${styles.inGame}`}
                          >
                            IN GAME
                          </p>
                        )}
                    </div>
                  </Link>
                </Card>
              );
            })}
        </div>
      </div>
    </LiveSection>
  );
}
