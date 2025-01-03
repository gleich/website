'use client';

import styles from './playlists.module.css';
import { Playlist } from '@/lib/lcp/applemusic';
import Link from 'next/link';
import Image from 'next/image';
import localFont from 'next/font/local';
import Card from '@/ui/card';

const ibmPlexMonoBoldItalic = localFont({
  src: '../../../../public/fonts/ibm_plex_mono/bold_italic.otf',
});

export default function Playlists({ playlists }: { playlists: Playlist[] }) {
  return (
    <Card className={styles.card}>
      <div className={styles.container}>
        {playlists.map((p) => (
          <Link
            key={p.id}
            href={`/music-playlist/${p.id}`}
            className={styles.playlist}
            title={`View the ${p.tracks.length} tracks from my ${p.name} playlist`}
          >
            <div className={styles.collageContainer}>
              <div className={styles.collage}>
                {p.tracks.slice(0, 4).map((t) => (
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
              <p
                className={`${ibmPlexMonoBoldItalic.className} ${styles.name}`}
              >
                {p.name}
              </p>
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.viewTracksButton}>
                View {p.tracks.length} tracks
              </button>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
}
