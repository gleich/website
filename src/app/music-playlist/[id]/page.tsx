import NotFound from '@/app/not-found';
import { loadAppleMusicData } from '@/lib/lcp/applemusic';
import styles from '@/app/music-playlist/[id]/page.module.css';
import Nav from '@/ui/root/nav';
import Song from '@/ui/root/music/song';
import Copyright from '@/ui/root/copyright';
import LastUpdated from './lastUpdated';
import { Metadata } from 'next';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dayjs from 'dayjs';
import localFont from 'next/font/local';
import { renderDuration } from '@/lib/time';

dayjs.extend(advancedFormat);
dayjs.extend(timezone);
dayjs.extend(utc);

const ibmPlexMonoBoldItalic = localFont({
  src: '../../../../public/fonts/ibm_plex_mono/bold_italic.otf',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const appleMusicData = await loadAppleMusicData();
  const id = (await params).id;
  const playlist = appleMusicData.data.playlists[id];

  if (!playlist) {
    return {
      title: 'Playlist Not Found',
      description: 'The requested playlist could not be found.',
    };
  }

  const description = `Enjoy the ${playlist.tracks.length} tracks from my "${playlist.name}" playlist. Last updated ${dayjs(playlist.last_modified).tz('America/New_York').format('MMMM Do YYYY [at] h:mma z')}.`;
  return {
    title: playlist.name,
    description: description,
    openGraph: {
      title: playlist.name,
      siteName: 'mattglei.ch',
      description: description,
      url: `https://mattglei.ch/music-playlist/${id}`,
    },
    twitter: {
      title: playlist.name,
      description: description,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const appleMusicData = await loadAppleMusicData();
  const id = (await params).id;
  const playlist = appleMusicData.data.playlists[id];
  const totalTime = playlist.tracks.reduce(
    (total: number, s: { duration_in_millis: number }) =>
      total + s.duration_in_millis,
    0,
  );
  if (!playlist) {
    return <NotFound />;
  }
  return (
    <main className={styles.main}>
      <Nav maxWidth={1600} />

      <div className={styles.header}>
        <h1 className={`${styles.title} ${ibmPlexMonoBoldItalic.className}`}>
          {playlist.name}
        </h1>
        <div className={styles.headerText}>
          <p>
            {playlist.tracks.length} songs - {renderDuration(totalTime / 1000)}
          </p>
          <LastUpdated lastUpdated={playlist.last_modified} />
        </div>
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
