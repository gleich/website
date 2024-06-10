import Image from 'next/image';
import styles from '@/ui/root/header/social.module.css';
import { Oxanium } from 'next/font/google';

const oxanium = Oxanium({ subsets: ['latin'] });

export default function Social({ name, href }: { name: string; href: string }) {
  return (
    <a href={href} className={styles.root} target="_blank">
      <Image
        src={`/icons/${name}.svg`}
        width={30}
        height={30}
        alt={`${name} icon`}
        className={styles.image}
      />
    </a>
  );
}
