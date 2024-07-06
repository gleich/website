import { IBM_Plex_Mono } from 'next/font/google';
import Logo from '../root/header/logo';
import Section from './section';
import styles from '@/ui/section/loading.module.css';

const ibmPlexMono = IBM_Plex_Mono({ weight: '700', subsets: ['latin'] });

export default function LoadingSection({
  name,
  expectedHeight,
}: {
  name: string;
  expectedHeight: number;
}) {
  return (
    <Section name={name}>
      <div className={styles.container} style={{ height: expectedHeight }}>
        <Logo className={styles.logo} />
        <p className={`${styles.loadingText} ${ibmPlexMono.className}`}>
          Loading{' '}
        </p>
      </div>
    </Section>
  );
}
