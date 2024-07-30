import styles from './page.module.css';
import Header from '@/ui/root/header/header';
import Link from 'next/link';
import Games from '@/ui/root/games/games';
import Workouts from '@/ui/root/workouts/workouts';
import Copyright from '@/ui/root/copyright';
import Photos from '@/ui/root/photos/photos';
import { Suspense } from 'react';
import LoadingSection from '@/ui/section/loading';
import Projects from '@/ui/root/projects/projects';
import Resume from '@/ui/root/projects/resume';
import Nav from '@/ui/root/nav';

export default async function Home() {
  return (
    <>
      <main className={styles.main}>
        <Nav maxWidth={1500} hide={true} />
        <div className={styles.header}>
          <Header />
          <div>
            <p className={styles.introduction}>
              Hey! I&apos;m Matt Gleich, a college student attending the{' '}
              <Link href="https://rit.edu" target="_blank">
                Rochester Institute of Technology (RIT)
              </Link>
              . I&apos;m going into my 3<sup>rd</sup> year studying computer
              science there and in my free time I really enjoy cycling (gravel,
              road, & mountain bike) and photography. Below are a few sections
              featuring parts of who I am! Want to get in touch? Feel free to
              shoot me an email over at{' '}
              <Link href="mailto:email@mattglei.ch">email@mattglei.ch</Link>.
              More of my professional work is detailed in my <Resume />.
            </p>
          </div>
        </div>

        <div className={styles.sections}>
          <Suspense
            fallback={<LoadingSection name="Workouts" expectedHeight={460.5} />}
          >
            <Workouts />
          </Suspense>
          <Suspense
            fallback={<LoadingSection name="Projects" expectedHeight={346} />}
          >
            <Projects />
          </Suspense>
          <Photos />
          <Suspense
            fallback={<LoadingSection name="Games" expectedHeight={279.24} />}
          >
            <Games />
          </Suspense>
        </div>
      </main>
      <Copyright />
    </>
  );
}
