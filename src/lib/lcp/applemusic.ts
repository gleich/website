import { Cache, loadFromLCP } from './lcp';

export async function loadAppleMusicData() {
  return loadFromLCP<CacheData>(Cache.AppleMusic);
}

export interface CacheData {
  recently_played: Song[];
  playlists: Record<string, Playlist>;
}

export interface Song {
  track: string;
  artist: string;
  album: string;
  genres: string[];
  release_date: Date;
  duration_in_millis: number;
  album_art_url: string;
  url: string;
  id: string;
}

export interface Playlist {
  name: string;
  tracks: Song[];
  last_modified: Date;
}
