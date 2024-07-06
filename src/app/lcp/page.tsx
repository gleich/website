import { Metadata } from 'next';
import styles from '@/app/lcp/page.module.css';
import jetsPhoto from '../../../public/articles/lcp/jets.jpeg';
import stravaDiagram from '../../../public/articles/lcp/strava.svg';
import Image from 'next/image';
import Logo from '@/ui/root/header/logo';
import Link from 'next/link';
import { IBM_Plex_Mono } from 'next/font/google';
import SVGIcon from '@/ui/svgIcon';
import Copyright from '@/ui/root/copyright';

export const metadata: Metadata = {
  title: 'lcp - Lightweight Cache Proxy',
  description: 'Lightweight cache proxy written in rust. gleich/lcp',
};

const ibmPlexMono = IBM_Plex_Mono({
  weight: '700',
  subsets: ['latin'],
  style: 'italic',
});

export default function Lcp() {
  return (
    <main className={styles.main}>
      <div className={styles.article}>
        <div>
          <Link href="/" className={styles.header}>
            <Logo className={styles.headerLogo} />
            <h1>Matt Gleich</h1>
          </Link>
        </div>
        <div className={styles.title}>
          <Image
            src={jetsPhoto}
            alt="Jets Flying over Castle in Germany"
            className={styles.titlePhoto}
          />
          <h1 className={`${styles.titleText} ${ibmPlexMono.className}`}>
            lcp - Lightweight Cache Proxy
          </h1>
          <Link
            href="https://github.com/gleich/lcp"
            target="_blank"
            className={styles.githubLink}
          >
            {' '}
            <SVGIcon
              src="/icons/socials/github.svg"
              alt="GitHub"
              height={20}
              width={20}
            />{' '}
            gleich/lcp
          </Link>
        </div>
        <div className={styles.content}>
          <h2>What is lcp?</h2>
          <p>
            lcp is a backend service that aggregates, processes, and caches data
            from a number of APIs. This data is then exposed as a REST API. It
            is written in the{' '}
            <Link href="https://www.rust-lang.org/" target="_blank">
              rust programming language
            </Link>{' '}
            and runs in a Docker container on my{' '}
            <Link href="https://caprover.com/" target="_blank">
              Caprover server
            </Link>
            . The main goal of lcp is provide <b>extremely fast</b> and very
            simplified data fetching for my website. This is mainly thanks to
            the way that caching is done in a protected memory space and that
            data is aggregated from multiple sources. Down below is more
            technical explanations of how lcp works.
          </p>
          <h2>System Overview</h2>
          <Image
            src={'/articles/lcp/overview.svg'}
            alt="Overview Diagram"
            height={551}
            width={986}
            className={styles.overviewImage}
          />
          <p>
            The diagram above illustrates how each cache gets updated. There are
            two main types of caches here:
          </p>
          <ol>
            <li>
              <b>Event based cache</b>: Cache is updated based on an event like
              receiving a webhook. This is more ideal as it provides realtime
              cache updates. Example of this is the Strava cache which receives
              webhook events for new activities.
            </li>
            <li>
              <b>Time based cache</b>: Cache is updated based on a given time
              interval. Example of this is the Steam cache which refreshes every
              5 minutes.
            </li>
          </ol>
          <p>
            A <b>protected memory space</b> in this context is just a{' '}
            <Link
              href="https://en.wikipedia.org/wiki/Lock_(computer_science)"
              target="_blank"
            >
              mutex lock
            </Link>{' '}
            wrapped with a{' '}
            <Link
              href="https://doc.rust-lang.org/std/sync/struct.Arc.html"
              target="_blank"
            >
              atomic reference counter
            </Link>
            . All of this caching happens in different threads so to ensure
            thread-safe memory interactions this protected memory space is used.
          </p>
          <h2>Caching Benefits</h2>
          <ul>
            <li>
              <b>Fast response times.</b> When the site makes a request to load
              data from lcp.dev.mattglei.ch/strava/cache all it is doing is
              reading the cached data from memory. No expensive database queries
              or anything.
            </li>
            <li>
              <b>Expensive operations can be done before the request is made</b>
              . With Steam for example, there is no endpoint from the Steam REST
              API to get your games with the achievement data all in one
              request. So, for every game you need to make a request to load in
              the achievement data. All of this is done by lcp so that when a
              request is made to lcp.dev.mattglei.ch/steam/cache it returns the
              games with their achievements all in one request. This cuts down
              25+ requests to the Steam REST API with each request taking +400ms
              down to one request that takes ~200ms.
            </li>
          </ul>
          <h2>Strava Maps</h2>
          <p>
            One interesting technical problem that I faced in this project was
            loading{' '}
            <Link href="https://www.mapbox.com/" target="_blank">
              mapbox images
            </Link>{' '}
            from their API onto the site. These images are the maps of my recent
            workouts and are statically generated based off{' '}
            <Link href="https://geojson.org/" target="_blank">
              geojson data
            </Link>{' '}
            from Strava. Unfortunately mapbox static images don&apos;t work with
            the Next.js Image component, a React component for greatly
            optimizing images for the web. This is mainly due to the way in
            which Mapbox tokens are secured and how Next.js optimizes images on
            the server. I took this problem as an opportunity to learn{' '}
            <Link href="https://aws.amazon.com/pm/serv-s3/?sc_channel=ps">
              AWS&apos;s S3 object storage
            </Link>{' '}
            so that lcp could just request these images and send them to S3.
            Once they are on S3 Next.js can load the images properly and still
            utilize all of its optimization features. This is yet another
            expensive operation that can be done by lcp when a cache is
            updating.
          </p>
        </div>
        <Copyright />
      </div>
    </main>
  );
}
