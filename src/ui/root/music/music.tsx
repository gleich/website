import { loadAppleMusicData } from '@/lib/lcp/applemusic';
import LiveSection from '@/ui/section/liveSection';
import styles from '@/ui/root/music/music.module.css';
import Card from '@/ui/card';
import Song from './song';
import Playlist from './playlist';

export default async function Music() {
  const appleMusicData = await loadAppleMusicData();
  const recentlyPlayed = appleMusicData.data.recently_played;
  const playlists = appleMusicData.data.playlists;
  return (
    <LiveSection
      name="Music"
      source="Apple Music"
      sourceIcon="applemusic"
      sourceURL="https://music.apple.com/"
      lastUpdated={appleMusicData.updated}
    >
      <p>
        One of my favorite things in the whole world is music. Here are a few of
        the playlists I&apos;ve built up over the last few years and my recently
        played songs. I am into everything from electronic to bossa nova. A few
        of my favorite artists are The Smiths, Coldplay, Daft Punk, and Earth
        Wind & Fire.
      </p>
      <div className={styles.sections}>
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Playlists</h4>
          <Card className={`${styles.playlists}`}>
            <Playlist playlist={playlists['p.qQXLxPLtA75zg8e']} />
            <Playlist playlist={playlists['p.LV0PXNoCl0EpDLW']} />
            <Playlist playlist={playlists['p.AWXoZoxHLrvpJlY']} />
            <Playlist
              className={styles.fourthPlaylist}
              playlist={playlists['p.LV0PX3EIl0EpDLW']}
            />
          </Card>
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