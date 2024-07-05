import Link from 'next/link';
import Image from 'next/image';
import styles from '@/ui/root/projects/resume.module.css';

export default function Resume() {
  return (
    <Link href="/resume.pdf" target="_blank" className={styles.resume}>
      <Image
        src="/icons/file-text.svg"
        alt="text file icon"
        width={14}
        height={14}
        className={styles.fileIcon}
      />
      résumé
    </Link>
  );
}
