import { env } from 'process';
import Response from './response';

export async function loadGithubData() {
  const res = await fetch('https://lcp.dev.mattglei.ch/github/cache', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + env.API_KEY,
    },
    cache: 'no-store',
  });
  const responseData: Response<Repository[]> = await res.json();
  return responseData;
}

export interface Repository {
  name: string;
  owner: string;
  language: string;
  language_color: string;
  description: string;
  updated_at: Date;
  stargazers: number;
  id: string;
  url: string;
}
