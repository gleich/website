import { Song as AppleMusicSong } from '@/lib/lcp/applemusic';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/ui/root/music/song.module.css';
import ScrollingTitle from './scrollingTitle';

export default function Song({
  song,
  className,
  albumArtClassName,
}: {
  song: AppleMusicSong;
  className?: string | undefined;
  albumArtClassName?: string | undefined;
}) {
  const songContent = (
    <>
      <Image
        src={song.album_art_url}
        alt={`${song.track} album art`}
        width={200}
        height={200}
        className={`${styles.albumArt} ${albumArtClassName}`}
      />
      <div className={`${styles.songText}`}>
        <ScrollingTitle text={song.track} />
        <ScrollingTitle className={styles.artist} text={song.artist} />
      </div>
    </>
  );

  return song.url != '' ? (
    <Link
      href={song.url}
      key={song.id}
      className={`${styles.song} ${className}`}
      target="_blank"
      title={`View "${song.track}" on Apple Music`}
    >
      {songContent}
    </Link>
  ) : (
    <div className={`${styles.song} ${className}`}>{songContent}</div>
  );
}
