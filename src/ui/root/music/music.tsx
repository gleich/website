import { loadAppleMusicData } from '@/lib/lcp/applemusic';
import LiveSection from '@/ui/section/liveSection';
import styles from '@/ui/root/music/music.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { Inconsolata } from 'next/font/google';
import ScrollingTitle from './scrollingTitle';
import Card from '@/ui/card';
import Song from './song';
import Playlist from './playlist';

const inconsolata = Inconsolata({ subsets: ['latin'] });

export default async function Music() {
  const appleMusicData = await loadAppleMusicData();
  const recentlyPlayed = appleMusicData.data.recently_played;
  const playlists = appleMusicData.data.playlists;
  return (
    <LiveSection
      name="Music"
      source="Apple Music"
      sourceIcon="appleMusic"
      sourceURL="https://music.apple.com/"
      lastUpdated={appleMusicData.updated}
    >
      <p>
        One of my favorite things in this whole world is music. Here are a few
        of the playlists I&apos;ve built up over the last few years. Some of my
        favorite music of all time, that stretches across a lot of different
        genres. I am into everything from 90s rap to 1930s jazz.
      </p>
      <div className={styles.sections}>
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Playlists</h4>
          <Card className={`${styles.playlists}`}>
            <Playlist playlist={playlists['p.qQXLxPLtA75zg8e']} />
            <Playlist playlist={playlists['p.LV0PXNoCl0EpDLW']} />
            <Playlist playlist={playlists['p.AWXoZoxHLrvpJlY']} />
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
            </div>
          </Card>
        </div>
      </div>
    </LiveSection>
  );
}
