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
  'Lightweight cache proxy written in Go. Backend service for caching, processing, and aggregating data from APIs like the Strava and GitHub API.';
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
            href="https://github.com/gleich/lcp-v2"
            target="_blank"
            className={styles.githubLink}
          >
            {' '}
            <SVGIcon
              src="/icons/logos/githubOfficial.svg"
              alt="GitHub"
              title="View on GitHub"
              height={20}
              width={20}
            />{' '}
            gleich/lcp-v2
          </Link>
        </div>
        <div className={styles.content}>
          <h2>What is lcp?</h2>
          <p>
            lcp is a backend service I wrote that aggregates, processes, and
            caches data from a number of APIs. This data is then exposed as a
            REST API. It is written in the{' '}
            <Link href="https://go.dev/" target="_blank">
              Go programming language
            </Link>{' '}
            and runs in a Docker container on my{' '}
            <Link href="https://caprover.com/" target="_blank">
              Caprover server
            </Link>
            . The main goal of lcp is to provide{' '}
            <i>
              <b>extremely fast</b>
            </i>{' '}
            and very simplified data fetching for my website. This is mainly
            thanks to the way that caching is done in a protected memory space
            and that data is aggregated from multiple sources. Down below is
            more technical explanations of how lcp works.
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
            <b className={styles.benefit}>Prevent hitting API rate limits</b>
            <p>
              Most major APIs have rate limits. The Strava API for example only
              allows 100 requests every 15 minutes. If I wasn&apos;t caching
              this data and was simply requesting the data every time that
              someone visited the site I could very easily encounter rate
              limiting. The REST API that is exposed by lcp has no rate limits,
              so my site can hit it every time a request is made without having
              to worry about rate limits.
            </p>
            <b className={styles.benefit}>Prevent downtime</b>
            <p>
              Sometimes APIs have problems and are down. Because lcp caches the
              data and is essentially saving a copy, it does&apos;t have to
              depend about the source data being up. Downtime is more often than
              people realize and when you&apos;re using multiple APIs, the
              chance of one of them being down is even greater.
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
                  I want to use this data in other projects. For example, I use
                  lcp in the{' '}
                  <Link
                    href="https://github.com/gleich/terminal"
                    target="_blank"
                  >
                    ssh version of this website
                  </Link>
                  . To have a central place to access all of this data instead
                  of everything just getting pulled from my site is a better
                  architecture in my opinion.
                </li>
                <li>
                  It has been a little while since I worked in Go and wanted to
                  do a new project in the language.
                </li>
              </ul>
            </p>
            <b style={{ paddingTop: '0px' }}>
              Why use the Go programming language?
            </b>
            <p>
              Go is a popular language for building REST APIs. I&apos;ve been
              using the language for a few years now and have a few reasons why
              I selected it for V2 of lcp:
              <ul>
                <li>
                  The standard library makes it very easy to work with. I
                  don&apos;t have to import a bunch of different packages for
                  working with things like JSON and requests. A lot of these
                  features come straight out of the box with the fantastic
                  standard library.
                </li>
                <li>
                  Go is very fast. Although I am not handling massive amounts of
                  web traffic, being able to handle a request on the microsecond
                  scale (literally) is great. Very happy with the performance I
                  am getting.
                </li>
                <li>
                  I have a lot of experience writing Go code and am very
                  comfortable in the language.
                </li>
              </ul>
            </p>
            <b style={{ paddingTop: '0px' }}>Why is lcp on version 2?</b>
            <p>
              <Link href="https://github.com/gleich/lcp" target="_blank">
                V1 of lcp
              </Link>{' '}
              was written in the{' '}
              <Link href="https://www.rust-lang.org/" target="_blank">
                Rust programming language
              </Link>
              . There are a few reasons why I wanted to rewrite lcp and create a
              second version:
              <ul>
                <li>
                  I wanted to make a more generic cache. In V1 of lcp a lot of
                  the codebase was a cache specific. This added a lot of code
                  for each cache with zero benefits. Making a generic cache
                  greatly reduced the amount of code/complexity of lcp V2.
                </li>
                <li>
                  Go is easier to make APIs with compared to Rust in my opinion.
                  Rust is pretty easy using the{' '}
                  <Link href="https://rocket.rs/" target="_blank">
                    rocket.rs
                  </Link>{' '}
                  framework, but working with the Go standard library makes
                  things easier.
                </li>
                <li>
                  V1 of lcp used AWS S3 which I ended up replacing with a{' '}
                  <Link href="https://min.io/" target="_blank">
                    Minio
                  </Link>{' '}
                  instance running on my Caprover server. The current Minio
                  library for Rust is not stable, but the one for Go is.
                  Switching to Go allows me to use the stable Minio library and
                  cut out using S3. I replaced S3 with Minio because I
                  didn&apos;t want to pay any costs associated with storing
                  images from mapbox (see below for more details).
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
              First of all, having each cache be independent of each other
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
                href="https://nextjs.org/docs/app/building-your-application/rendering/partial-prerendering"
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
        </div>
        <Copyright />
      </div>
    </main>
  );
}
