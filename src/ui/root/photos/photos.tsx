import Section from '@/ui/section/section';
import styles from '@/ui/root/photos/photos.module.css';
import Button from '@/ui/button';
import { Gallery, Image as GalleryImage } from 'next-gallery';

// automatically generated from script in /scripts/photos
const images: GalleryImage[] = [
  {
    src: '/photos/RITRacing.jpg',
    alt: 'RITRacing',
    aspect_ratio: 1.499219,
    nextImageProps: {
      placeholder: 'blur',
      blurDataURL:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAGCAIAAACepSOSAAAAm0lEQVR4nATAvW6DMBAA4PP9GB8GYVTUB+gLdKrUue+/dq3UJVK2IEUEYh+Xj/Hrewn2TscUT5FUIa0H/N3u2/+VfwYGB3RCxIASqUMIH9ouRflz6a21xx52CxZHT2MDLBzfzsZzzq3WhLQbmRboJwuksYtuvFoCYBcRjWko3k9PoIpER+XfTTTQLFxUJWfXXB2tnbXbXgEAAP//kVo5LIj8PmoAAAAASUVORK5CYII=',
      draggable: false,
    },
  },
  {
    src: '/photos/audiA4.jpg',
    alt: 'audiA4',
    aspect_ratio: 0.666846,
    nextImageProps: {
      placeholder: 'blur',
      blurDataURL:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAJCAIAAACe+MrKAAAAeklEQVR4nBzI3Q6DIBBE4ZnZBSn+xL7/gxpE2YaenKvPAeSE+l3JEb0bFheQSspLNeJliyEvpaz7uW+HCb213h+vx1nXY5vE26+r3b58avnvpMBB85xzSil7djHe8Qz4TBLnJnNPMpEgIxAByGgugogY0xAQ9QsAAP//PeQl4t6G9/cAAAAASUVORK5CYII=',
      draggable: false,
    },
  },
  {
    src: '/photos/mtb2.jpg',
    alt: 'mtb2',
    aspect_ratio: 0.666667,
    nextImageProps: {
      placeholder: 'blur',
      blurDataURL:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAKCAIAAAD3rtNaAAAApklEQVR4nFSNMaqFMBBFg3MxaJxISFATsFGwyBLc/07cgGBhoZjPN+8V7zbDORwYEu/GcZznuaqqfd+FEEW2AIgopZTxY5m5ruui+Eb5OOeY+TiOn3YYhr7vQwgZ/7+t6xpjtNYCKMty2zYsyzJNk/eemaWU13U55xBjDCF0Xae1llI+z2OMgffeWmuMadsWwH3fSilorZumUe9SSud5EtFfAAAA///8GiLyr4tWmgAAAABJRU5ErkJggg==',
      draggable: false,
    },
  },
  {
    src: '/photos/marcAudi.jpg',
    alt: 'marcAudi',
    aspect_ratio: 0.666864,
    nextImageProps: {
      placeholder: 'blur',
      blurDataURL:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAIAAAC+k6JsAAAAcElEQVR4nATAMZLCMAwF0G9JVsaZ7CwtJQ0Nh+QYnBQzRPIXz15PfPiYdTs6/keYKaScFELQYPu4f+cRZ1/Nq0HGdjX9i7UlRrXDVC8NztVJJ90y9lpqNFlaqTZnz1O8RAMIyHxLhjiaJhH8BQAA//+PEzIMpisfLwAAAABJRU5ErkJggg==',
      draggable: false,
    },
  },
  {
    src: '/photos/spider.jpg',
    alt: 'spider',
    aspect_ratio: 1.5,
    nextImageProps: {
      placeholder: 'blur',
      blurDataURL:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAHCAIAAABRDCAKAAAAl0lEQVR4nByLS24jQRTDpPepnokRIPc/abqrnhTYC3JF1vX9w8haV/eqyiQCso4k2WPWVYEIEwYAZrAiAvGuRs+oXv96zMc8coFd/X9lJyTd++DZtTqOsLePLCMjVteqsGXyeW8W9JGoGWnstOEPgOu+7xFngoYO941fzhRtP2fmDF9fy0ixmV2Zq7gSGQAx4Jh/AQAA//9GcmtexyuSKQAAAABJRU5ErkJggg==',
      draggable: false,
    },
  },
  {
    src: '/photos/eye.jpg',
    alt: 'eye',
    aspect_ratio: 0.666843,
    nextImageProps: {
      placeholder: 'blur',
      blurDataURL:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAJCAIAAACe+MrKAAAAqUlEQVR4nATAu06GMBgG4Ja+PdAKChEPhDAb79DRO3NwcTVOTg7GGBmEiNCvJe3/4Onx4X/6/Xp9m9Znkoy9MARlydB+ZjbFo8p8YFgubuckP/v2m90Lo6XlmC/7H4F3uv4Qf31ZOVfiaLpQ5CVerdihnZEObV0lRnehGwq6gbLRYLTqPJWaGp+oylmDY5Rs07I2NQWvw44U0InkwbU0/rAiHYh0CgAA///xVEK2xAU7QwAAAABJRU5ErkJggg==',
      draggable: false,
    },
  },
  {
    src: '/photos/glass.jpg',
    alt: 'glass',
    aspect_ratio: 0.66731,
    nextImageProps: {
      placeholder: 'blur',
      blurDataURL:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAIAAABPxRC5AAAAdklEQVR4nATASw7CIBAG4H+YwZRHq9joqolLF648hve/gkujphFBEerHx9PF+N38vAKYDmcZbCdk3uMW5bV2RvZhkwxpTFR/IQQZnF1JVW2kVr3zQmiaubf9UouwkhhnVtDSLUD5ftT9ccs5KwiBUor/AAAA//9DTCL3O6s5LgAAAABJRU5ErkJggg==',
      draggable: false,
    },
  },
  {
    src: '/photos/cadillac.jpg',
    alt: 'cadillac',
    aspect_ratio: 1.498138,
    nextImageProps: {
      placeholder: 'blur',
      blurDataURL:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAIAAAD38zoCAAAAe0lEQVR4nATAqQ7CQBAG4Dn+md2mLYGQ8DS8NwKFJSgUSBIkAsG1PWb5cDiehclUEuCmpiw0UhQ8H3cmVhGHNY6kJHWsc8H1tAsSYs+WF26tVo0yDx/cLnvW3tKm9b6IvOug0yumL7DeNimvumXn2eag8uMYoPUfAAD//xwCKjpIR8eqAAAAAElFTkSuQmCC',
      draggable: false,
    },
  },
  {
    src: '/photos/ladybug.jpg',
    alt: 'ladybug',
    aspect_ratio: 0.667419,
    nextImageProps: {
      placeholder: 'blur',
      blurDataURL:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAPCAIAAABSnclZAAABJElEQVR4nCyQXW4UQQyEq2z3zJLwBkfgPhyEgwckpGjDbnq62z9oNrHKT5/K+mT7+etHVWaO5X0ct/fbvF9xf0V/hb9BCo8hea4oqQJViAIK+8SgiJi21mrf3Pdce60GywIfbRFrtmFjXTSmz+7Hnh+YepZVrekuCI2px4VsyzxLWEIKVQ0J1s61w7ZiK3MvJdQeF6iiLINZqSVFba1MgQHJT/tTQ0QogNocYQJLaUAAAlQ+EmdsdE+hRa2iJoXls2JWrMpRdtw8FOqiKfAPnKPH6hn3tH6dbpQL6RJNBPCZ/Z/Pt4g/Ye9/R9vAZ6kls5FFP+q4Zn9ZjuAF3J749B1fvtKaVIjfMV6qH9ER50MVeL5g/wZtiMH1W2bVQgL4HwAA//+Rx7W+j32e1AAAAABJRU5ErkJggg==',
      draggable: false,
    },
  },
  {
    src: '/photos/porsche.jpg',
    alt: 'porsche',
    aspect_ratio: 1.499679,
    nextImageProps: {
      placeholder: 'blur',
      blurDataURL:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAHCAIAAABRDCAKAAAAgUlEQVR4nITO0Q2DMAyE4dhxQmEEZmL/AZiA1zjnc9Wiqo98z6fTr+XJ88KO44iIMYa7i8i6rtu29d5FZM45xrB930m6OwBVvRfLspRSALi7mRnJzFTVWmv/+RSoiohd10USAMla65wTQGvt/3GeJ8mIyMzW2uvLzDLz7ngHAAD//1w8UfrnKNIxAAAAAElFTkSuQmCC',
      draggable: false,
    },
  },
  {
    src: '/photos/up.jpg',
    alt: 'up',
    aspect_ratio: 0.667252,
    nextImageProps: {
      placeholder: 'blur',
      blurDataURL:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAALCAIAAAA88gD/AAAAy0lEQVR4nDyPzUrDQBRGz01vkzZq03aiQjeCiC58Al/JpxUEN7oS7ULThNa2k8nPRBLBs7qLA+d++ggWPuEJKniAG9COnhBW0A5HB1qDBCT3q2huOpG4yP3zh1Ywvr1Irq5TswRpknnjnFaXjBfpqTFn5waRH5F8kWoVzeJoEk4n8UmMiNsffTQNfIcfCv/0Nfa71pbOlofDsXetpbQ6Kmg32TZbul6SelMERaYKzdtXHmq92/59Nnv91tEwKX9Zv7P2cAcJ/AYAAP//AqtQZ57H6pAAAAAASUVORK5CYII=',
      draggable: false,
    },
  },
  {
    src: '/photos/motorcycle.jpg',
    alt: 'motorcycle',
    aspect_ratio: 0.666667,
    nextImageProps: {
      placeholder: 'blur',
      blurDataURL:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAIAAAAYbLhkAAAAsElEQVR4nATATVLDIBQHcMj7w6MkYGqc6bhw4cKFZ/CM3sJreQBnzPgxbUqAB/3h4/0N1syzXo4Xtm3b71FqUYOuQiJSa5a64/+8sgvOHTa+FvOVcsb37+fkn50lQxtozbLi50816SNrUgSorhR6e61lSmm0pC0nmIRjeAENvWuRQHpxTHh8eJLWes/GdO9tjA6n5ZRyvqSNWYdpuosj5hDP11SaYh78IXofbwEAAP//6uVLTy3bT8EAAAAASUVORK5CYII=',
      draggable: false,
    },
  },
  {
    src: '/photos/hayhay.jpg',
    alt: 'hayhay',
    aspect_ratio: 1.499663,
    nextImageProps: {
      placeholder: 'blur',
      blurDataURL:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAHCAIAAABRDCAKAAAAxUlEQVR4nBTIXUrDQBAH8PnPzn4mBmwKBfEW+uj9r2EFn9S0tGoTNtkZ8fUnL89Pa62X6fzzee0P+8Pjw/04phTrWs/T1/vxVVLfyRZJfNntUi7dMKSSvffGiKXcjXsZxtHMBlUQQog5l5gSM/taFTARyX1HRAAciw8+hChO/oWRTQ0k2hoRnGOQgYy0KcjUWttMN5DKZToBxMwiznsfQnDOEdFa67wsyzzLx/HNSMlUBDGnlHOIkYFtrbff79v19BcAAP//IRlPxwpY3pgAAAAASUVORK5CYII=',
      draggable: false,
    },
  },
  {
    src: '/photos/mtb1.jpg',
    alt: 'mtb1',
    aspect_ratio: 0.666667,
    nextImageProps: {
      placeholder: 'blur',
      blurDataURL:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAIAAAC+k6JsAAAAf0lEQVR4nATATa7CIBAH8HnDn1IeqIkSFx7a43gAD8LO6EKNsRYa+Rh/OJ+ORKzNYKwlAvJSmBUxExeRjuvt/W+1c2OXbxVCjPcQ7Hbt8txTrbjEB7eVLm16llfO0HPqE5oBlsKfhMMOI/ehNe8Vi8Y+GBE1Kt74AervFwAA//9uEDUQwfV6TAAAAABJRU5ErkJggg==',
      draggable: false,
    },
  },
  {
    src: '/photos/flowers.jpg',
    alt: 'flowers',
    aspect_ratio: 1.5,
    nextImageProps: {
      placeholder: 'blur',
      blurDataURL:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAKCAIAAAAy3EnLAAABH0lEQVR4nCyQQa7cMAxDSUn2JJn5q56gFyh6/0MV6KLtn9gmiwQf0ErAexJZP35+tzHlz+m/p3+9Nf4Jb2MZHduT3454Hblv0XtUsVqGbBBdXqFX6HcupUD35EdEJxMiCNhGPbcme811UmV1vT/WKYw0WsvWeqtWUQHCkFiv/WF7zjFSnefA58IfFJLIQnazBSoVFryuC8d+AzkSLcYkFaBuIMnWUG1ljcgTXETtx9PSnJXBpCanclHvZM96Re3KPlm8JFh29e2wFLOBQZCks9MrWVkPZndUMHzVJstVfZfkqAJliqncaEdkZIssRxpotiRKFfWAdb1jUiSC0WmAcacuRiQgq2lR617ZNJi6x0DZ8BeQCBJIr0ur+B8AAP//AvetW9cpE1UAAAAASUVORK5CYII=',
      draggable: false,
    },
  },
  {
    src: '/photos/beach.jpg',
    alt: 'beach',
    aspect_ratio: 0.666667,
    nextImageProps: {
      placeholder: 'blur',
      blurDataURL:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAIAAAC+k6JsAAAAZklEQVR4nCTKPQqEIQyE4dH1hwQLsRVr738ab2BtI8FGlvi93cOMA9B7r7Wec+ac6hACERljnHNqZs45iwgRqWOMKSVrrffe4mVe917d90tE9t6/b2TmtdYY47ujtVZKAfAPAAD///glHtpwFeYBAAAAAElFTkSuQmCC',
      draggable: false,
    },
  },
  {
    src: '/photos/nyc.jpg',
    alt: 'nyc',
    aspect_ratio: 0.666843,
    nextImageProps: {
      placeholder: 'blur',
      blurDataURL:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAJCAIAAACe+MrKAAAAiUlEQVR4nCTMQRKCMAyF4SZtITMoysgJHBfe/2B0Q6WJTeoU/937Fi88X29EAIBatbCoagAAIqJxZOa+PQbv8X6bl2XJOYt88SQ/z9d1fQxD3LYUY+xERJdpqrUOvfi/7iFiCB7xFBE5jiIszjlVC865nD8ppcJsrVmVTvuezay1ZmYs8gsAAP//pClFmGQTWssAAAAASUVORK5CYII=',
      draggable: false,
    },
  },
  {
    src: '/photos/eggBeach.jpg',
    alt: 'eggBeach',
    aspect_ratio: 0.667103,
    nextImageProps: {
      placeholder: 'blur',
      blurDataURL:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAIAAABPxRC5AAAAb0lEQVR4nATAXQrCMAwH8Cb5J/0YTPFtFxJ89P4XGChjClpnq9kP5+vFRE/jsQx5fT4ATRBVmLFoIGg+RNGShoKwETNLFE0Ki8T2d9Tty07d8KPWP1XGafLeMnlodV1uMtMLrRchb+/7Mu8BAAD//xWcJFkinQABAAAAAElFTkSuQmCC',
      draggable: false,
    },
  },
];

export default function Photos() {
  const widths = [600, 1200];
  const ratios = [2.2, 4, 6];
  return (
    <Section name="Photos">
      <p className={styles.text}>
        I&apos;ve been really into photography for about seven years now.
        Starting with nature photography, mainly landscapes and macro, I&apos;ve
        recently delved into automotive photography, especially during my time
        at college with the RIT car club. I primarily use Nikon gear, with my
        current camera being a Nikon Z7II. Here are a some of my best photos:
      </p>
      <div className={styles.photos}>
        <Gallery
          widths={widths}
          ratios={ratios}
          images={images}
          gap="2px"
          lastRowBehavior="fill"
        />
      </div>
      <div className={styles.viewMore}>
        <Button
          text="View more on Instagram"
          href="https://www.instagram.com/mattglei.ch/"
        />
      </div>
    </Section>
  );
}
