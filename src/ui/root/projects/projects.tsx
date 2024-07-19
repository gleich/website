import LiveSection from '@/ui/section/liveSection';
import styles from '@/ui/root/projects/projects.module.css';
import { loadGitHubData } from '@/lib/lcp/github';
import Link from 'next/link';
import Resume from './resume';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Project from './project';

dayjs.extend(relativeTime);

export default async function Projects() {
  const githubData = await loadGitHubData();
  const repositories = githubData.data;
  return (
    <LiveSection
      name="Projects"
      source="GitHub"
      sourceURL="https://github.com/about"
      lastUpdated={githubData.updated}
    >
      <p>
        For the past five years, I have been passionately pursuing programming.
        From developing{' '}
        <Link href="https://github.com/gleich/pcbs" target="_blank">
          PCBs
        </Link>{' '}
        with{' '}
        <Link href="https://github.com/gleich/is31fl3731" target="_blank">
          custom integrated circuit drivers
        </Link>{' '}
        written in Rust to creating{' '}
        <Link href="https://github.com/gleich/fgh" target="_blank">
          CLIs
        </Link>{' '}
        (command-line interfaces) and{' '}
        <Link href="https://github.com/gleich/website" target="_blank">
          websites
        </Link>
        , I have explored various facets of the programming world. My journey
        includes cloud automation work at{' '}
        <Link href="https://bottomline.com" target="_blank">
          Bottomline Technologies
        </Link>
        , where I utilized Python, Puppet, Docker, and Grafana. At{' '}
        <Link href="https://rootly.com/" target="_blank">
          Rootly
        </Link>
        , I developed their{' '}
        <Link href="https://github.com/rootlyhq/cli" target="_blank">
          official CLI
        </Link>{' '}
        in Golang. More recently, I contributed to{' '}
        <Link href="https://stainlessapi.com" target="_blank">
          Stainless API
        </Link>{' '}
        as an engineering developer, automating customer deployments and product
        testing. Learn more about my work on{' '}
        <Link href="https://www.linkedin.com/in/matt-gleich/" target="_blank">
          LinkedIn
        </Link>
        , my{' '}
        <Link href="https://github.com/gleich" target="_blank">
          GitHub
        </Link>{' '}
        account, and in my <Resume />.
      </p>
      <div className={styles.highlightedProjectsContainer}>
        <div className={styles.highlightedProjects}>
          {repositories.map((r) => (
            <Project repo={r} key={r.id} />
          ))}
        </div>
      </div>
    </LiveSection>
  );
}
