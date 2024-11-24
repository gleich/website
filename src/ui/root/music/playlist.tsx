import { Playlist as AppleMusicPlaylist } from '@/lib/lcp/applemusic';
import styles from '@/ui/root/music/playlist.module.css';
import { IBM_Plex_Mono } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const ibmPlexMono = IBM_Plex_Mono({
  weight: '700',
  subsets: ['latin'],
  style: 'italic',
});

export default function Playlist({
  playlist,
}: {
  playlist: AppleMusicPlaylist;
}) {
  return (
    <Link
      href="https://google.com"
      target="_blank"
      className={styles.container}
    >
      <div className={styles.collageContainer}>
        <div className={styles.collage}>
          {playlist.tracks.slice(0, 4).map((t) => (
            <Image
              key={t.id}
              src={t.album_art_url}
              alt={t.track}
              height={100}
              width={100}
              className={styles.collageImage}
            />
          ))}
        </div>
        <p className={`${ibmPlexMono.className} ${styles.name}`}>
          {playlist.name}
        </p>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.viewTracksButton}>
          View {playlist.tracks.length} tracks
        </button>
      </div>
    </Link>
  );
}
