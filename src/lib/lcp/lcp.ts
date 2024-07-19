import { env } from 'process';

export interface Response<T> {
  updated: Date;
  data: T;
}

export enum Cache {
  Strava,
  GitHub,
  Steam,
}

export async function loadFromLCP<T>(cache: Cache): Promise<Response<T>> {
  let pathName: string;
  switch (cache) {
    case Cache.Strava:
      pathName = 'strava';
      break;
    case Cache.GitHub:
      pathName = 'github';
      break;
    case Cache.Steam:
      pathName = 'steam';
      break;
  }
  const res = await fetch(`https://lcp.dev.mattglei.ch/${pathName}/cache`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + env.LCP_ACCESS_TOKEN,
    },
    cache: 'no-store',
  });
  const responseData: Response<T> = await res.json();
  return responseData;
}
