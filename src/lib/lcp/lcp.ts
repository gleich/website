import { env } from 'process';

export interface Response<T> {
  updated: Date;
  data: T;
}

export enum Cache {
  Workouts,
  GitHub,
  Steam,
  AppleMusic,
}

export async function loadFromLCP<T>(cache: Cache): Promise<Response<T>> {
  let pathName: string;
  switch (cache) {
    case Cache.Workouts:
      pathName = 'workouts';
      break;
    case Cache.GitHub:
      pathName = 'github';
      break;
    case Cache.Steam:
      pathName = 'steam';
      break;
    case Cache.AppleMusic:
      pathName = 'applemusic';
      break;
  }
  const res = await fetch(`${env.LCP_URL}/${pathName}`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${env.LCP_TOKEN}`,
    },
  });
  const data: Response<T> = await res.json();
  return data;
}
