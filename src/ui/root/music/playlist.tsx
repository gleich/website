import { Playlist as AppleMusicPlaylist } from '@/lib/lcp/applemusic';
import styles from '@/ui/root/music/playlist.module.css';
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const ibmPlexMono = IBM_Plex_Mono({
  weight: '700',
  subsets: ['latin'],
});

const ibmPlexSans = IBM_Plex_Sans({ subsets: ['latin'], weight: '500' });

export default function Playlist({
  playlist,
  className,
}: {
  playlist: AppleMusicPlaylist;
  className?: string | undefined;
}) {
  return (
    <Link
      href={`/music-playlist/${playlist.id}`}
      className={`${styles.container} ${className}`}
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
        <button
          className={`${styles.viewTracksButton} ${ibmPlexSans.className}`}
        >
          View {playlist.tracks.length} tracks
        </button>
      </div>
    </Link>
  );
}