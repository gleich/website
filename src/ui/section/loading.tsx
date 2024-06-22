import Logo from '../root/header/logo';
import Section from './section';
import styles from '@/ui/section/loading.module.css';

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
        <p>Loading...</p>
      </div>
    </Section>
  );
}
