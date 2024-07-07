import { Cache, loadFromLCP } from './lcp';

export async function loadGitHubData() {
  return loadFromLCP<Repository[]>(Cache.GitHub);
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
