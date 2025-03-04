'use client';
import { Repository } from '@/lib/lcp/github';
import { exactFromNow } from '@/lib/time';
import Card from '@/ui/card';
import styles from '@/ui/root/projects/project.module.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
      <Link
        href={repo.url}
        target="_blank"
        className={styles.cardLink}
        title={`View ${repo.owner}/${repo.name} on GitHub`}
      >
        <div className={styles.highlightedProjectHeader}>
          <div className={styles.highlightedProjectName}>
            <p className={styles.name}>
              {repo.owner}/{repo.name}
            </p>
          </div>
          <p className={styles.highlightedProjectLanguage}>
            <span
              className={styles.highlightedProjectLanguageCircle}
              style={{ backgroundColor: repo.language_color }}
            />{' '}
            {repo.language}{' '}
          </p>
        </div>
        <div className={styles.highlightedProjectDetails}>
          <p>{repo.description}</p>
          <p
            className={styles.highlightedProjectUpdated}
            suppressHydrationWarning
          >
            {`Updated ${exactFromNow(updatedAt, currentTime)}`}
          </p>
        </div>
      </Link>
    </Card>
  );
}
