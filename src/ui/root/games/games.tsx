import { loadSteamData } from '@/lib/lcp/steam';
import Link from 'next/link';
import styles from '@/ui/root/games/games.module.css';
import LiveSection from '../../section/liveSection';
import Image from 'next/image';
import Card from '@/ui/card';
import { renderDuration } from '@/lib/time';
import Stats from '@/ui/stats';
import ScrollingText from '@/ui/scrollingText';
import localFont from 'next/font/local';

const ibmPlexMonoMedium = localFont({
  src: '../../../../public/fonts/ibm_plex_mono/medium.otf',
});

export default async function Games() {
  const steamData = await loadSteamData();
  const games = steamData.data;
  return (
    <LiveSection
      name="Games"
      sources={[
        {
          name: 'Steam',
          icon: 'steam.svg',
          url: 'https://store.steampowered.com/about/',
        },
      ]}
      lastUpdated={steamData.updated}
    >
      <div>
        <p>
          To relax, I like to occasionally play some video games with some of my
          friends. Here are my recently played titles from{' '}
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
                      className={styles.gameTitleLink}
                      title={`View "${g.name}" on Steam`}
                    >
                      <Image
                        src={g.icon_url}
                        alt={g.name}
                        width={20}
                        height={20}
                        className={styles.gameIcon}
                      />
                      <ScrollingText
                        text={g.name}
                        className={styles.gameTitle}
                      />
                    </Link>
                    <div className={styles.stats}>
                      <Stats stats={stats} />
                    </div>
                    {(() => {
                      if (g.achievements == undefined) {
                        return (
                          <div
                            className={`${styles.noAchievements} ${ibmPlexMonoMedium.className}`}
                          >
                            Game has no achievements
                          </div>
                        );
                      } else if (g.achievement_progress == 0.0) {
                        return (
                          <div
                            className={`${styles.noAchievements} ${ibmPlexMonoMedium.className}`}
                          >
                            No achievements earned
                          </div>
                        );
                      } else {
                        return (
                          <>
                            <p
                              className={`${styles.recentAchievements} ${ibmPlexMonoMedium.className}`}
                            >
                              Recent Achievements
                            </p>
                            <div
                              className={`${styles.achievements} ${ibmPlexMonoMedium.className}`}
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
                                      className={styles.achievementIcon}
                                    />
                                    <ScrollingText
                                      text={a.display_name}
                                      className={styles.achievement}
                                    />
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
