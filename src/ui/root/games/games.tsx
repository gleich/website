import { loadSteamData } from '@/lib/steam';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/ui/root/games/games.module.css';
import LiveSection from '../../section/liveSection';
import { Inconsolata } from 'next/font/google';

const inconsolata = Inconsolata({ subsets: ['latin'] });

function truncateText(text: string, length: number): string {
  if (text.length <= length) {
    return text;
  }

  return text.slice(0, length) + '\u2026';
}

function formatPlaytime(playtime_minutes: number): string {
  if (playtime_minutes >= 60) {
    const hours = playtime_minutes / 60;
    return hours === 1 ? `${hours}hr` : `${hours.toFixed(1)}hrs`;
  } else {
    return playtime_minutes === 1
      ? `${playtime_minutes}min`
      : `${playtime_minutes}mins`;
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
          To relax, I love playing video games with some of my friends. Here are
          my recently played titles on{' '}
          <Link href="https://store.steampowered.com/about/" target="_blank">
            Steam
          </Link>
          , ranked by recent activity:
        </p>
        <div className={styles.games}>
          <div className={styles.gameCovers}>
            {games
              .filter((g) => g.library_url != null)
              .slice(0, 10)
              .map((g, i) => (
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
                  <p
                    className={`${styles.libraryRanking} ${inconsolata.className}`}
                  >
                    #{i + 1}
                  </p>
                </Link>
              ))}
          </div>
          <div className={`${styles.gameTable} ${inconsolata.className}`}>
            <table style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th className={styles.gameRankHeader} />
                  <th>Name</th>
                  <th className={styles.gamePlaytimeHeader}>Time Played</th>
                  <th>Achievement Progress</th>
                </tr>
              </thead>
              <tbody>
                {games
                  .filter((g) => g.library_url != null)
                  .slice(0, 20)
                  .map((g, i) => (
                    <tr key={g.app_id} className={styles.gameData}>
                      <td className={styles.gameRank}>#{i + 1}</td>
                      <td className={styles.gameNameContainer}>
                        <div className={styles.gameName}>
                          <Image
                            src={g.icon_url}
                            alt={`${g.name} icon`}
                            height={18}
                            width={18}
                            draggable={false}
                          />
                          <Link href={g.url} target="_blank" title={g.name}>
                            {truncateText(g.name, 27)}
                          </Link>
                        </div>
                      </td>
                      <td className={styles.gamePlaytime}>
                        {formatPlaytime(g.playtime_forever)}
                      </td>
                      <td className={styles.gameProgress}>
                        <div className={styles.gameProgressContainer}>
                          {g.achievement_progress != null ? (
                            <>
                              <p className={styles.gameProgressValue}>
                                {g.achievement_progress.toPrecision(3)}%
                              </p>
                              <progress
                                className={styles.gameProgressBar}
                                max={100}
                                style={
                                  {
                                    '--progress-bar-value-color':
                                      g.achievement_progress == 100.0
                                        ? '#30ce75'
                                        : '#e1dc3f',
                                  } as React.CSSProperties
                                }
                                value={g.achievement_progress}
                              />
                            </>
                          ) : (
                            <p>N/A</p>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LiveSection>
  );
}
