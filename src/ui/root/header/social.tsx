import styles from '@/ui/root/header/social.module.css';
import SVGIcon from '@/ui/svgIcon';
import Link from 'next/link';

export default function Social({ name, href }: { name: string; href: string }) {
  return (
    <Link href={href} className={styles.icon} target="_blank">
      <SVGIcon
        src={`/icons/${name}.svg`}
        width={30}
        height={30}
        alt={`${name} icon`}
      />
    </Link>
  );
}
