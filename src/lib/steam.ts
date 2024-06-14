import Response from '@/lib/response';
import { env } from 'process';

export async function loadSteamData() {
  const res = await fetch('https://api.mattglei.ch/steam/cache', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + env.API_KEY,
    },
    next: {
      tags: ['steam'],
    },
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
  playtime: Playtime;
}

export interface Playtime {
  minutes_last_2weeks: number;
  minutes_forever: number;
}
