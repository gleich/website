import { Game } from '@/lib/steam';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/ui/root/games.module.css';
import Section from '../section';

export default function Games({ games }: { games: Game[] }) {
  return (
    <Section
      name="Games"
      description="To relax I love to play video games with some of my friends. Here are my recently played titles over on Steam:"
    >
      <div className={styles.games}>
        {games
          .filter((g) => g.library_url != null)
          .slice(0, 12)
          .map((g) => (
            <Link key={g.app_id} href={g.url} target="_blank">
              <Image
                key={g.app_id}
                src={g.library_url}
                alt={g.name}
                width={133.33}
                height={200}
              />
            </Link>
          ))}
      </div>
    </Section>
  );
}
