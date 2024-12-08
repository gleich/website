import { Song as AppleMusicSong } from '@/lib/lcp/applemusic';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/ui/root/music/song.module.css';
import ScrollingText from '../../scrollingText';

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
    <div>
      <Image
        src={song.album_art_url}
        alt={`${song.track} album art`}
        width={200}
        unoptimized
        height={200}
        className={`${styles.albumArt} ${albumArtClassName}`}
      />
      <div className={`${styles.songText}`}>
        <ScrollingText className={styles.track} text={song.track} />
        <ScrollingText className={styles.artist} text={song.artist} />
      </div>
    </div>
  );

  return song.url != '' ? (
    <Link
      href={song.url}
      key={song.id}
      className={`${styles.song} ${className}`}
      target="_blank"
      title={`View "${song.track}" by ${song.artist} on Apple Music`}
    >
      {songContent}
    </Link>
  ) : (
    <div className={`${styles.song} ${className}`}>{songContent}</div>
  );
}
