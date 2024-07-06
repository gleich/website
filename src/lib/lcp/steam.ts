import Response from '@/lib/lcp/response';
import { env } from 'process';

export async function loadSteamData() {
  const res = await fetch('https://lcp.dev.mattglei.ch/steam/cache', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + env.API_KEY,
    },
    cache: 'no-store',
  });
  const responseData: Response<Game[]> = await res.json();
  return responseData;
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
}
