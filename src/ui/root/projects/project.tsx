'use client';
import { Repository } from '@/lib/lcp/github';
import { exactFromNow } from '@/lib/time';
import Card from '@/ui/card';
import styles from '@/ui/root/projects/project.module.css';
import SVGIcon from '@/ui/svgIcon';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Inconsolata } from 'next/font/google';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const inconsolata = Inconsolata({ subsets: ['latin'] });

dayjs.extend(relativeTime);

export default function Project({ repo }: { repo: Repository }) {
  const updatedAt = dayjs(repo.updated_at);
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className={styles.highlightedProject}>
      <div className={styles.highlightedProjectHeader}>
        <div className={styles.highlightedProjectName}>
          <SVGIcon
            src="/icons/book.svg"
            alt="Folder Icon"
            width={15}
            height={15}
          />

          <Link href={repo.url} target="_blank">
            {repo.owner}/{repo.name}
          </Link>
        </div>
        <p className={styles.highlightedProjectLanguage}>
          <span
            className={styles.highlightedProjectLanguageCircle}
            style={{ backgroundColor: repo.language_color }}
          />{' '}
          {repo.language}{' '}
        </p>
      </div>
      <div
        className={`${styles.highlightedProjectDetails} ${inconsolata.className}`}
      >
        <p>{repo.description}</p>
        <p className={styles.highlightedProjectUpdated}>
          Updated {exactFromNow(updatedAt, currentTime)}
        </p>
      </div>
    </Card>
  );
}
