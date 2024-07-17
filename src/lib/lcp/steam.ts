import { Cache, loadFromLCP } from './lcp';

export async function loadSteamData() {
  return loadFromLCP<Game[]>(Cache.Steam);
}

export interface Game {
  name: string;
  app_id: number;
  url: string;
  icon_url: string;
  header_url: string;
  library_url: string;
  playtime_forever: number;
  rtime_last_played: Date;
  achievement_progress: number | null;
  achievements: Achievement[] | null;
}

export interface Achievement {
  api_name: string;
  achieved: boolean;
  icon: string;
  display_name: string;
  description: string | null;
}
