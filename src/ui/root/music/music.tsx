import { loadAppleMusicData } from '@/lib/lcp/applemusic';
import LiveSection from '@/ui/section/liveSection';
import styles from '@/ui/root/music/music.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { Inconsolata } from 'next/font/google';
import ScrollingTitle from './scrollingTitle';
import Card from '@/ui/card';
import Song from './song';

const inconsolata = Inconsolata({ subsets: ['latin'] });

export default async function Music() {
  const appleMusicData = await loadAppleMusicData();
  const recentlyPlayed = appleMusicData.data.recently_played;
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
      <Card className={styles.recentSongsContainer}>
        <h2 className={styles.recentSongsTitle}>Recently Played Songs</h2>
        <div className={styles.recentSongs}>
          {recentlyPlayed.slice(0, 3).map((s) => (
            <Song song={s} key={s.id} />
          ))}
        </div>
      </Card>
    </LiveSection>
  );
}
