import styles from '@/ui/root/header/social.module.css';
import SVGIcon from '@/ui/svgIcon';

export default function Social({ name, href }: { name: string; href: string }) {
  return (
    <a href={href} className={styles.root} target="_blank">
      <SVGIcon
        src={`/icons/${name}.svg`}
        width={30}
        height={30}
        alt={`${name} icon`}
      />
    </a>
  );
}
