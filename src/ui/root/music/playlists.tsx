'use client';

import styles from './playlists.module.css';
import { PlaylistSummary } from '@/lib/lcp/applemusic';
import Link from 'next/link';
import Image from 'next/image';
import localFont from 'next/font/local';
import Card from '@/ui/card';

const ibmPlexMonoSemiBoldItalic = localFont({
  src: '../../../../public/fonts/ibm_plex_mono/semibold_italic.otf',
});

export default function Playlists({
  playlists,
}: {
  playlists: PlaylistSummary[];
}) {
  return (
    <Card className={styles.card}>
      <div className={styles.container}>
        {playlists.map((p) => (
          <Link
            key={p.id}
            href={`/playlists/${p.id}`}
            className={styles.playlist}
            title={`View the ${p.track_count} tracks from my ${p.name} playlist`}
          >
            <div className={styles.collageContainer}>
              <div className={styles.collage}>
                {p.first_four_tracks.map((t) => (
                  <Image
                    key={t.id}
                    src={t.album_art_url}
                    alt={t.track}
                    height={100}
                    width={100}
                    className={styles.collageImage}
                    placeholder="blur"
                    blurDataURL={t.album_art_blurhash}
                  />
                ))}
              </div>
              <p
                className={`${ibmPlexMonoSemiBoldItalic.className} ${styles.name}`}
              >
                {p.name}
              </p>
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.viewTracksButton}>
                View {p.track_count} tracks
              </button>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
}
