import NotFound from '@/app/not-found';
import { loadAppleMusicData } from '@/lib/lcp/applemusic';
import styles from '@/app/music-playlist/[id]/page.module.css';
import Nav from '@/ui/root/nav';
import Song from '@/ui/root/music/song';
import Copyright from '@/ui/root/copyright';
import { IBM_Plex_Mono } from 'next/font/google';
import LastUpdated from './lastUpdated';

const ibmPlexMono = IBM_Plex_Mono({
  weight: '700',
  subsets: ['latin'],
  style: 'italic',
});

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const appleMusicData = await loadAppleMusicData();
  const id = (await params).id;
  const playlist = appleMusicData.data.playlists[id];
  if (!playlist) {
    return <NotFound />;
  }
  return (
    <main className={styles.main}>
      <Nav maxWidth={1400} />

      <div className={styles.header}>
        <h1 className={`${styles.title} ${ibmPlexMono.className}`}>
          {playlist.name}
        </h1>
        <LastUpdated lastUpdated={playlist.last_modified} />
      </div>

      <div className={styles.songs}>
        {playlist.tracks.map((t) => (
          <Song
            key={t.id}
            song={t}
            className={styles.song}
            albumArtClassName={styles.songAlbumArt}
          />
        ))}
      </div>

      <Copyright />
    </main>
  );
}