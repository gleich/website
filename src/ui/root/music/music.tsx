import { loadAppleMusicData } from '@/lib/lcp/applemusic';
import LiveSection from '@/ui/section/liveSection';
import styles from '@/ui/root/music/music.module.css';
import Card from '@/ui/card';
import Song from './song';
import Link from 'next/link';
import Playlists from './playlists';

export default async function Music() {
  const appleMusicData = await loadAppleMusicData();
  const recentlyPlayed = appleMusicData.data.recently_played;
  const playlists = appleMusicData.data.playlist_summaries.slice(0, 4);
  return (
    <LiveSection
      name="Music"
      source="Apple Music"
      sourceIcon="applemusic"
      sourceURL="https://music.apple.com/"
      lastUpdated={appleMusicData.updated}
    >
      <p>
        One of my favorite things in this world is music. I am into everything
        from electronic to bossa nova. A few of my favorite artists are{' '}
        <Link href="https://en.wikipedia.org/wiki/The_Smiths" target="_blank">
          The Smiths
        </Link>
        ,{' '}
        <Link href="https://en.wikipedia.org/wiki/Coldplay" target="_blank">
          Coldplay
        </Link>
        ,{' '}
        <Link href="https://en.wikipedia.org/wiki/Daft_Punk" target="_blank">
          Daft Punk
        </Link>
        , and{' '}
        <Link
          href="https://en.wikipedia.org/wiki/Fleetwood_Mac"
          target="_blank"
        >
          Fleetwood Mac
        </Link>
        . Here are a few of the playlists I&apos;ve built up over the last few
        years and my recently played songs:
      </p>
      <div className={styles.sections}>
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Playlists</h4>
          <Playlists playlists={playlists} />
        </div>

        <div className={styles.section}>
          <h4 className={`${styles.recentSongsTitle} ${styles.sectionTitle}`}>
            Recently Played Songs
          </h4>
          <Card className={`${styles.recentSongsContainer}`}>
            <div className={styles.recentSongs}>
              {recentlyPlayed.slice(0, 3).map((s) => (
                <Song
                  song={s}
                  key={s.id}
                  className={styles.recentSong}
                  albumArtClassName={styles.recentSongAlbumArt}
                />
              ))}
              <Song
                song={recentlyPlayed[3]}
                className={styles.fourthRecentSong}
                albumArtClassName={styles.recentSongAlbumArt}
              />
            </div>
          </Card>
        </div>
      </div>
    </LiveSection>
  );
}
