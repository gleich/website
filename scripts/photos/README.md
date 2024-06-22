# photos

Script to codegen the imports and data array for photos from [/public/photos/](../../public/photos/).

Run the program by doing the following:

```bash
go run main.go
```

This will then output something like this:

```txt
    INFO      | Fri Jun 21 22:57:51 UTC 2024 | BOOTED

   SUCCESS    | Fri Jun 21 22:57:51 UTC 2024 | IMPORTS:

import RITRacing from '@photos/RITRacing.jpg'
import audiA4 from '@photos/audiA4.jpg'
import cadillac1 from '@photos/cadillac1.jpg'
import cadillac2 from '@photos/cadillac2.jpg'
import lexus from '@photos/lexus.jpg'
import motorcycle from '@photos/motorcycle.jpg'
import mtb1 from '@photos/mtb1.jpg'
import mtb2 from '@photos/mtb2.jpg'
import nyc from '@photos/nyc.jpg'
import porsche from '@photos/porsche.jpg'
import spider from '@photos/spider.jpg'
import svx from '@photos/svx.jpg'

   SUCCESS    | Fri Jun 21 22:57:51 UTC 2024 | DATA ARRAY:

const photos: Photo[] = [
        {
                data: RITRacing,
                alt: 'RITRacing',
                width: 2032,
                height: 1355,
        },
        {
                data: audiA4,
                alt: 'audiA4',
                width: 1237,
                height: 1855,
        },
        {
                data: cadillac1,
                alt: 'cadillac1',
                width: 1123,
                height: 1684,
        },
        {
                data: cadillac2,
                alt: 'cadillac2',
                width: 1936,
                height: 1291,
        },
        {
                data: lexus,
                alt: 'lexus',
                width: 2095,
                height: 1397,
        },
        {
                data: motorcycle,
                alt: 'motorcycle',
                width: 1355,
                height: 2032,
        },
        {
                data: mtb1,
                alt: 'mtb1',
                width: 1136,
                height: 1704,
        },
        {
                data: mtb2,
                alt: 'mtb2',
                width: 1440,
                height: 2160,
        },
        {
                data: nyc,
                alt: 'nyc',
                width: 1259,
                height: 1888,
        },
        {
                data: porsche,
                alt: 'porsche',
                width: 3830,
                height: 2553,
        },
        {
                data: spider,
                alt: 'spider',
                width: 2352,
                height: 1568,
        },
        {
                data: svx,
                alt: 'svx',
                width: 2544,
                height: 1696,
        },
];
```
