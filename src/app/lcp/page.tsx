import { Metadata } from 'next';
import styles from '@/app/lcp/page.module.css';
import jetsPhoto from '../../../public/articles/lcp/jets.jpeg';
import overviewPhoto from '../../../public/articles/lcp/overview.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { IBM_Plex_Mono } from 'next/font/google';
import SVGIcon from '@/ui/svgIcon';
import Copyright from '@/ui/root/copyright';
import Nav from '@/ui/root/nav';

const title = 'lcp';
const description =
  "Lightweight cache proxy written in Rust. Backend service for caching, processing, and aggregating data from APIs like Strava and GitHub's.";
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
        <Nav maxWidth={1000} />
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
            <Link href="https://www.Rust-lang.org/" target="_blank">
              Rust programming language
            </Link>{' '}
            and runs in a Docker container on my{' '}
            <Link href="https://caprover.com/" target="_blank">
              Caprover server
            </Link>
            . The main goal of lcp is to provide <b>extremely fast</b> and very
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
              <b>Event-based cache</b>: Cache is updated based on an event like
              receiving a webhook. This is ideal as it provides real-time cache
              updates. An example of this is the Strava cache which receives
              webhook events for new activities.
            </li>
            <li>
              <b>Time-based cache</b>: Cache is updated based on a given time
              interval. An example of this is the Steam cache which refreshes
              every 5 minutes.
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
            wrapped with an{' '}
            <Link
              href="https://doc.Rust-lang.org/std/sync/struct.Arc.html"
              target="_blank"
            >
              atomic reference counter
            </Link>
            . All of this caching happens in different threads so to ensure
            thread-safe memory interactions this protected memory space is used.
          </p>
          <h2>Main Benefits</h2>
          <div className={styles.customList}>
            <b className={styles.benefit} style={{ paddingTop: '0px' }}>
              Fast response times
            </b>
            <p>
              When the site makes a request to load data from
              lcp.dev.mattglei.ch/strava/cache all it is doing is reading the
              cached data from memory. No expensive database queries or
              anything.
            </p>
            <b className={styles.benefit}>
              Data can be processed and aggregated
            </b>
            <p>
              With Steam, for example, there is no endpoint from the Steam REST
              API to get your games with the achievement data all in one
              request. So, for every game you need to make a request to load the
              achievement data. All of this is done by lcp so that when a
              request is made to lcp.dev.mattglei.ch/steam/cache it returns the
              games with their achievements all in one request. This cuts down
              +25 requests to the Steam REST API with each request taking +400ms
              down to one request that takes ~200ms.
            </p>
            <b className={styles.benefit}>Avoid hitting API rate limits</b>
            <p>
              Most major APIs have rate limits. The Strava API for example only
              allows 100 requests every 15 minutes. If I wasn&apos;t caching
              this data and was simply requesting the data every time that
              someone visited the site I could very easily encounter rate
              limiting. The REST API that is exposed by lcp has no rate limits,
              so my site can hit it every time a request is made without having
              to worry about rate limits.
            </p>
          </div>
          <h2>Design Decisions</h2>
          <div className={styles.customList}>
            <b>Couldn&apos;t this be simpler?</b>
            <p>
              There are simpler solutions to purely load data onto my website.
              Why did I build this then? Here are a few reasons why:
              <ul>
                <li>
                  Data caching and fetching are independent of the framework I
                  am using to build my website. This separation of
                  responsibilities is important as every so often I like to
                  rebuild my personal website and try out a new framework (hence
                  this being the 4th version of my personal website). My last
                  personal website was built in{' '}
                  <Link href="https://kit.svelte.dev/" target="_blank">
                    Svelte Kit
                  </Link>{' '}
                  for example.
                </li>
                <li>
                  I want to use this data in other projects. I am planning on
                  building a little{' '}
                  <Link
                    href="https://www.adafruit.com/product/3934"
                    target="_blank"
                  >
                    EINK-based display
                  </Link>{' '}
                  for some of Strava/Steam stats for example. To have a central
                  place to access all of this data instead of everything just
                  getting pulled from my site is a better architecture in my
                  opinion.
                </li>
                <li>
                  I wanted to learn and work more with Rust and I thought this
                  would be fun a project to push my skills in the language.
                </li>
              </ul>
            </p>
            <b style={{ paddingTop: '0px' }}>
              Why use the Rust programming language?
            </b>
            <p>
              Relative to languages like java, javaScript/typeScript, python,
              and go Rust is not a common option for building REST APIs. lcp is
              developed in Rust for a few key reasons:
              <ul>
                <li>
                  I like working with and writing Rust. I find that the
                  ecosystem, compiler, and language features make me write
                  higher-quality applications. I wanted to take this project as
                  an opportunity to learn more about the language.
                </li>
                <li>
                  Making a REST API in Rust has actually been a fantastic
                  experience. Using a framework called{' '}
                  <Link href="https://rocket.rs/" target="_blank">
                    rocket.rs
                  </Link>{' '}
                  I can very easily make a REST API without having to worry
                  about the low-level details like you might expect from a
                  language known for its performance and low-level capabilities.
                </li>
                <li>
                  Memory management system. The{' '}
                  <Link
                    href="https://doc.Rust-lang.org/book/ch04-01-what-is-ownership.html"
                    target="_blank"
                  >
                    Rust memory management system{' '}
                  </Link>{' '}
                  has made it easy to make sure that I am properly working with
                  memory between threads and throughout the application.
                </li>
              </ul>
            </p>
            <b style={{ paddingTop: '0px' }}>Why mix webhooks and polling?</b>
            <p>
              Using webhooks is ideal as it only reaches out to API when the
              data has actually changed. Not all APIs or data changes support
              webhooks which is why polling has to be used instead. For the
              GitHub API, there is no webhook for when the user&apos;s pinned
              repositories are changed (which is what the data is based on). For
              the Steam API, they simply don&apos;t support webhooks so polling
              is the only option.
            </p>
            <b>
              Why have three separate endpoints instead of bundling them all
              together in one?
            </b>
            <p>
              First of al, having each cache be independent of each other
              provides a separation of concerns which makes the application
              easier to maintain/work with. It also allows each section to load
              independently on the front end. Using features from Next.js like{' '}
              <Link
                href="https://nextjs.org/learn/dashboard-app/streaming"
                target="_blank"
              >
                streaming
              </Link>{' '}
              and even experimental features like{' '}
              <Link
                href="https://nextjs.org/docs/app/api-reference/next-config-js/partial-prerendering"
                target="_blank"
              >
                partial pre-rendering (PPR)
              </Link>{' '}
              allows for each section to quickly be loaded in asynchronously.
            </p>
          </div>
          <h2>Strava Maps</h2>
          <p>
            One interesting technical problem that I faced in this project was
            loading{' '}
            <Link href="https://www.mapbox.com/" target="_blank">
              Mapbox images
            </Link>{' '}
            from their API onto the site. These images are the maps of my recent
            workouts and are statically generated based on{' '}
            <Link href="https://geojson.org/" target="_blank">
              geojson data
            </Link>{' '}
            from Strava. Unfortunately, Mapbox static images don&apos;t work
            with the Next.js Image component, a React component for greatly
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
          <h2>Future Plans</h2>
          <p>
            I am looking into potentially making this a generic tool that can be
            configured to be used with any API. Keep an eye on the{' '}
            <Link href="https://github.com/gleich/lcp" target="_blank">
              GitHub repository
            </Link>{' '}
            for future updates
          </p>
        </div>
        <Copyright />
      </div>
    </main>
  );
}
