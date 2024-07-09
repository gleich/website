import styles from '@/ui/root/header/social.module.css';
import SVGIcon from '@/ui/svgIcon';
import Link from 'next/link';

export default function Socials() {
  return (
    <>
      <Social name="github" href="https://github.com/gleich" />
      <Social name="instagram" href="https://www.instagram.com/mattglei.ch/" />
      <Social name="strava" href="https://www.strava.com/athletes/mattgleich" />
      <Social name="linkedin" href="https://www.linkedin.com/in/matt-gleich/" />
    </>
  );
}

function Social({ name, href }: { name: string; href: string }) {
  return (
    <Link href={href} className={styles.icon} target="_blank">
      <SVGIcon
        src={`/icons/socials/${name}.svg`}
        width={30}
        height={30}
        alt={`${name} icon`}
        title={name.charAt(0).toUpperCase() + name.slice(1)}
      />
    </Link>
  );
}
