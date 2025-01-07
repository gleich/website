import { env } from 'process';
import { Cache, loadFromLCP } from './lcp';

export async function loadAppleMusicData() {
  return loadFromLCP<CacheData>(Cache.AppleMusic);
}

export async function loadAppleMusicPlaylist(
  id: string,
): Promise<Playlist | null> {
  const res = await fetch(
    `https://lcp.dev.mattglei.ch/applemusic/playlists/${id}`,
    {
      method: 'GET',
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${env.LCP_TOKEN}`,
      },
    },
  );

  if (res.status === 404) {
    return null;
  }

  const data: Playlist = await res.json();
  return data;
}

export interface CacheData {
  recently_played: Song[];
  playlist_summaries: PlaylistSummary[];
}

export interface Song {
  track: string;
  artist: string;
  duration_in_millis: number;
  album_art_url: string;
  url: string;
  id: string;
}

export interface PlaylistSummary {
  name: string;
  id: string;
  track_count: number;
  first_four_tracks: Song[];
}

export interface Playlist {
  name: string;
  id: string;
  tracks: Song[];
  last_modified: Date;
  url: string;
}
