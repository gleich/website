import { Metadata } from 'next';
import styles from '@/app/lcp/page.module.css';
import jetsPhoto from '../../../public/articles/lcp/jets.jpeg';
import overviewPhoto from '../../../public/articles/lcp/overview.jpg';
import Image from 'next/image';
import Logo from '@/ui/root/header/logo';
import Link from 'next/link';
import { IBM_Plex_Mono } from 'next/font/google';
import SVGIcon from '@/ui/svgIcon';
import Copyright from '@/ui/root/copyright';

const title = 'lcp';
const description =
  "Lightweight cache proxy written in rust. Backend service for caching, processing, and aggregating data from APIs like Strava and GitHub's.";
const ogImage = {
  url: 'https://mattglei.ch/articles/lcp/opengraph.png',
  width: 1200,
  height: 630,
};

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title: title,
    siteName: 'mattglei.ch',
    description: description,
    images: [ogImage],
    url: 'https://mattglei.ch/lcp',
  },
  twitter: {
    title: title,
    description: description,
    images: [ogImage],
  },
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
        <div className={styles.header}>
          <Link href="/" className={styles.headerLink}>
            <Logo className={styles.headerLogo} />
            <h1>Matt Gleich</h1>
          </Link>
        </div>
        <div className={styles.title}>
          <Image
            src={jetsPhoto}
            alt="Jets Flying over Castle in Germany"
            className={styles.titlePhoto}
            placeholder="blur"
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
              title="View on GitHub"
              height={20}
              width={20}
            />{' '}
            gleich/lcp
          </Link>
        </div>
        <div className={styles.content}>
          <h2>What is lcp?</h2>
          <p>
            lcp is a backend service I wrote that aggregates, processes, and
            caches data from a number of APIs. This data is then exposed as a
            REST API. It is written in the{' '}
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
            src={overviewPhoto}
            alt="Overview Diagram"
            className={styles.overviewImage}
            placeholder="blur"
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
          <h2>Main Benefits</h2>
          <div className={styles.cacheBenefit}>
            <b className={styles.cacheBenefitTitle}>Fast response times</b>
            <p className={styles.cacheBenefitBody}>
              When the site makes a request to load data from
              lcp.dev.mattglei.ch/strava/cache all it is doing is reading the
              cached data from memory. No expensive database queries or
              anything.
            </p>
          </div>
          <div className={styles.cacheBenefit}>
            <b className={styles.cacheBenefitTitle}>
              Data can be processed and aggregated
            </b>
            <p className={styles.cacheBenefitBody}>
              With Steam for example, there is no endpoint from the Steam REST
              API to get your games with the achievement data all in one
              request. So, for every game you need to make a request to load in
              the achievement data. All of this is done by lcp so that when a
              request is made to lcp.dev.mattglei.ch/steam/cache it returns the
              games with their achievements all in one request. This cuts down
              +25 requests to the Steam REST API with each request taking +400ms
              down to one request that takes ~200ms.
            </p>
          </div>
          <div className={styles.cacheBenefit}>
            <b className={styles.cacheBenefitTitle}>
              Avoid hitting API rate limits
            </b>
            <p className={styles.cacheBenefitBody}>
              Most major APIs have rate limits. The Strava API for example only
              allows 100 requests every 15 minutes. If I wasn&apos;t caching
              this data and was simply requesting the data every time that
              someone visited the site I could very easily encounter rate
              limiting. The REST API that is exposed by lcp has no rate limits,
              so my site can hit it every time a request is made without having
              to worry about rate limits.
            </p>
          </div>
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
            which{' '}
            <Link
              href="https://docs.mapbox.com/accounts/guides/tokens/#url-restrictions"
              target="_blank"
            >
              Mapbox tokens are secured
            </Link>{' '}
            and how Next.js optimizes images on the server. I took this problem
            as an opportunity to learn{' '}
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
