import { loadSteamData } from '@/lib/lcp/steam';
import Link from 'next/link';
import styles from '@/ui/root/games/games.module.css';
import LiveSection from '../../section/liveSection';
import { Inconsolata } from 'next/font/google';
import Image from 'next/image';
import Card from '@/ui/card';
import { renderDuration } from '@/lib/time';
import Stats from '@/ui/stats';
import Title from './title';

const inconsolata = Inconsolata({ subsets: ['latin'] });

export default async function Games() {
  const steamData = await loadSteamData();
  const games = steamData.data;
  return (
    <LiveSection
      name="Games"
      source="Steam"
      sourceURL="https://store.steampowered.com/about/"
      lastUpdated={steamData.updated}
    >
      <div>
        <p>
          To relax, I love playing video games with some of my friends. Here are
          my recently played titles on{' '}
          <Link href="https://store.steampowered.com/about/" target="_blank">
            Steam
          </Link>
          :
        </p>
        <div className={styles.games}>
          {games
            .filter((g) => g.library_url != null)
            .slice(0, 3)
            .map((g) => {
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
                    src={g.library_url as string}
                    alt={g.name}
                    width={129.8304}
                    height={194.7456}
                    className={styles.gameLibraryImage}
                  />
                  <div className={styles.gameDetails}>
                    <Link
                      href={g.url}
                      target="_blank"
                      className={styles.gameTitle}
                      title={`View ${g.name} on Steam`}
                    >
                      <Image
                        src={g.icon_url}
                        alt={g.name}
                        width={20}
                        height={20}
                      />
                      <Title name={g.name} />
                    </Link>
                    <div className={styles.stats}>
                      <Stats stats={stats} />
                    </div>
                    {(() => {
                      if (g.achievements == undefined) {
                        return (
                          <div
                            className={`${styles.noAchievements} ${inconsolata.className}`}
                          >
                            Game has no achievements
                          </div>
                        );
                      } else if (g.achievement_progress == 0.0) {
                        return (
                          <div
                            className={`${styles.noAchievements} ${inconsolata.className}`}
                          >
                            No achievements earned
                          </div>
                        );
                      } else {
                        return (
                          <>
                            <p
                              className={`${styles.recentAchievements} ${inconsolata.className}`}
                            >
                              Recent Achievements
                            </p>
                            <div
                              className={`${styles.achievements} ${inconsolata.className}`}
                            >
                              {g.achievements
                                ?.filter((a) => a.achieved)
                                .slice(0, 3)
                                .map((a) => (
                                  <div
                                    key={a.api_name}
                                    className={styles.achievement}
                                    title={a.description}
                                  >
                                    <Image
                                      src={a.icon}
                                      alt={a.display_name}
                                      width={25}
                                      height={25}
                                    />
                                    <p>{a.display_name}</p>
                                  </div>
                                ))}
                            </div>
                          </>
                        );
                      }
                    })()}
                  </div>
                </Card>
              );
            })}
        </div>
      </div>
    </LiveSection>
  );
}
