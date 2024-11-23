import { Song as AppleMusicSong } from '@/lib/lcp/applemusic';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/ui/root/music/song.module.css';
import ScrollingTitle from './scrollingTitle';

export default function Song({ song }: { song: AppleMusicSong }) {
  return (
    <Link href={song.url} key={song.id} className={styles.song} target="_blank">
      <Image
        src={song.album_art_url}
        alt={song.track}
        width={200}
        height={200}
        className={styles.albumArt}
      />
      <div className={`${styles.songText}`}>
        <ScrollingTitle text={song.track} />
        <ScrollingTitle className={styles.artist} text={song.artist} />
      </div>
    </Link>
  );
}
