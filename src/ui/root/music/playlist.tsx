import { Playlist as AppleMusicPlaylist } from '@/lib/lcp/applemusic';
import styles from '@/ui/root/music/playlist.module.css';
import { IBM_Plex_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import Image from 'next/image';
import Link from 'next/link';

const ibmPlexMonoBoldItalic = localFont({
  src: '../../../../public/fonts/ibm_plex_mono/bold_italic.otf',
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
      title={`View the ${playlist.tracks.length} tracks from my ${playlist.name} playlist`}
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
        <p className={`${ibmPlexMonoBoldItalic.className} ${styles.name}`}>
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
