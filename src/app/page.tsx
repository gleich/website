import styles from './page.module.css';
import Header from '@/ui/root/header/header';
import Link from 'next/link';
import Games from '@/ui/root/games/games';
import Workouts from '@/ui/root/workouts/workouts';
import Copyright from '@/ui/root/copyright';
import Photos from '@/ui/root/photos/photos';
import { Suspense } from 'react';
import LoadingSection from '@/ui/section/loading';
import SVGIcon from '@/ui/svgIcon';
import Image from 'next/image';

export default async function Home() {
  return (
    <>
      <main className={styles.main}>
        <Header />

        <div>
          <p className={styles.introduction}>
            Hey! I&apos;m Matt Gleich, a college student attending the{' '}
            <Link href="https://rit.edu" target="_blank">
              Rochester Institute of Technology (RIT)
            </Link>
            . I&apos;m studying computer science and in my free I really enjoy
            cycling (gravel, road, & mountain bike) and photography. Below are a
            few sections featuring parts of who I am! Want to get in touch? Feel
            free to shoot me an email over at{' '}
            <Link href="email@mattglei.ch">email@mattglei.ch</Link>. More of my
            professional work is detailed in my{' '}
            <Link
              href="/resume.pdf"
              target="_blank"
              className={styles.resumeLink}
            >
              <Image
                src="/icons/file-text.svg"
                alt="text file icon"
                width={14}
                height={14}
                className={styles.resumeFileIcon}
              />
              résumé
            </Link>
            .
          </p>
        </div>

        <div className={styles.sections}>
          <Suspense
            fallback={<LoadingSection name="Workouts" expectedHeight={613} />}
          >
            <Workouts />
          </Suspense>
          <Photos />
          <Suspense
            fallback={<LoadingSection name="Games" expectedHeight={443.5} />}
          >
            <Games />
          </Suspense>
        </div>
      </main>
      <Copyright />
    </>
  );
}
