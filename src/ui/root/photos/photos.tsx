import Section from '@/ui/section/section';
import styles from '@/ui/root/photos/photos.module.css';
import ViewMore from '@/ui/viewMore';
import Image, { StaticImageData } from 'next/image';

// automatically generated from script in /scripts/photos
import RITRacing from '@photos/RITRacing.jpg';
import audiA4 from '@photos/audiA4.jpg';
import beach from '@photos/beach.jpg';
import cadillac from '@photos/cadillac.jpg';
import eggBeach from '@photos/eggBeach.jpg';
import eye from '@photos/eye.jpg';
import glass from '@photos/glass.jpg';
import ladybug from '@photos/ladybug.jpg';
import marcAudi from '@photos/marcAudi.jpg';
import motorcycle from '@photos/motorcycle.jpg';
import mtb1 from '@photos/mtb1.jpg';
import mtb2 from '@photos/mtb2.jpg';
import nyc from '@photos/nyc.jpg';
import porsche from '@photos/porsche.jpg';
import spider from '@photos/spider.jpg';
import up from '@photos/up.jpg';

interface Photo {
  data: StaticImageData;
  alt: string;
  width: number;
  height: number;
  horizontal: boolean;
}

// automatically generated from script in /scripts/photos
const photos: Photo[] = [
  {
    data: RITRacing,
    alt: 'RITRacing',
    width: 1919,
    height: 1280,
    horizontal: true,
  },
  {
    data: spider,
    alt: 'spider',
    width: 2352,
    height: 1568,
    horizontal: true,
  },
  {
    data: porsche,
    alt: 'porsche',
    width: 2335,
    height: 1557,
    horizontal: true,
  },
  {
    data: cadillac,
    alt: 'cadillac',
    width: 1609,
    height: 1074,
    horizontal: true,
  },
  {
    data: mtb2,
    alt: 'mtb2',
    width: 1440,
    height: 2160,
    horizontal: false,
  },
  {
    data: eye,
    alt: 'eye',
    width: 1263,
    height: 1894,
    horizontal: false,
  },
  {
    data: glass,
    alt: 'glass',
    width: 1037,
    height: 1554,
    horizontal: false,
  },
  {
    data: ladybug,
    alt: 'ladybug',
    width: 2069,
    height: 3100,
    horizontal: false,
  },
  {
    data: eggBeach,
    alt: 'eggBeach',
    width: 1020,
    height: 1529,
    horizontal: false,
  },
  {
    data: nyc,
    alt: 'nyc',
    width: 1259,
    height: 1888,
    horizontal: false,
  },
  {
    data: marcAudi,
    alt: 'marcAudi',
    width: 1129,
    height: 1693,
    horizontal: false,
  },
  {
    data: mtb1,
    alt: 'mtb1',
    width: 1136,
    height: 1704,
    horizontal: false,
  },
  {
    data: motorcycle,
    alt: 'motorcycle',
    width: 1394,
    height: 2091,
    horizontal: false,
  },
  {
    data: beach,
    alt: 'beach',
    width: 1138,
    height: 1707,
    horizontal: false,
  },
  {
    data: audiA4,
    alt: 'audiA4',
    width: 1237,
    height: 1855,
    horizontal: false,
  },
  {
    data: up,
    alt: 'up',
    width: 1520,
    height: 2278,
    horizontal: false,
  },
];

export default function Photos() {
  const shrinkFactor = 6;
  return (
    <Section name="Photos">
      <p>
        I&apos;ve been really into photography for about 7 years now. Starting
        with nature (mainly landscapes and macro) I&apos;ve gotten into
        automotive photography over the past few years at college especially
        with the RIT car club. I mainly take photos with Nikon gear, with my
        current camera being a Nikon Z7II. Here are a few of my best photos:
      </p>
      <div className={styles.photos}>
        {photos.map((p) => (
          <Image
            src={p.data}
            key={p.alt}
            alt={p.alt}
            width={(p.horizontal ? 2032 : 1355) / shrinkFactor}
            height={(p.horizontal ? 1355 : 2032) / shrinkFactor}
            placeholder="blur"
            className={styles.photo}
            unoptimized={p.horizontal}
            draggable={false}
          />
        ))}
      </div>
      <ViewMore
        locationName="Instagram"
        href="https://www.instagram.com/mattglei.ch/"
      />
    </Section>
  );
}
