import LiveSection from '@/ui/section/liveSection';
import styles from '@/ui/root/projects/projects.module.css';
import Card from '@/ui/card';
import { loadGithubData } from '@/lib/github';
import Link from 'next/link';
import Resume from './resume';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Inconsolata } from 'next/font/google';
import SVGIcon from '@/ui/svgIcon';

const inconsolata = Inconsolata({ subsets: ['latin'] });

dayjs.extend(relativeTime);

export default async function Projects() {
  const githubData = await loadGithubData();
  const repositories = githubData.data;
  return (
    <LiveSection
      name="Projects"
      source="GitHub"
      sourceURL="https://github.com"
      lastUpdated={githubData.last_updated}
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
        in Rust to creating{' '}
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
          {repositories.map((r) => {
            const lastUpdated = dayjs(r.updated_at);
            return (
              <Card key={r.id} className={styles.highlightedProject}>
                <div className={styles.highlightedProjectHeader}>
                  <div className={styles.highlightedProjectName}>
                    <SVGIcon
                      src="/icons/book.svg"
                      alt="Folder Icon"
                      width={15}
                      height={15}
                    />

                    <Link href={r.url} target="_blank">
                      {r.owner}/{r.name}
                    </Link>
                  </div>
                  <p className={styles.highlightedProjectLanguage}>
                    <span
                      className={styles.highlightedProjectLanguageCircle}
                      style={{ backgroundColor: r.language_color }}
                    />{' '}
                    {r.language}{' '}
                  </p>
                </div>
                <div
                  className={`${styles.highlightedProjectDetails} ${inconsolata.className}`}
                >
                  <p>{r.description}</p>
                  <p className={styles.highlightedProjectUpdated}>
                    Updated {lastUpdated.fromNow()}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </LiveSection>
  );
}
