'use client';

import Image from 'next/image';

export default function Map({
  polyline,
  mapboxToken,
}: {
  polyline: string;
  mapboxToken: string;
}) {
  const mapWidth = 200;
  const mapHeight = 200;
  return (
    <Image
      src={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/path-2+000(${encodeURIComponent(polyline)})/auto/${mapHeight}x${mapWidth}@2x?access_token=${encodeURIComponent(mapboxToken)}`}
      alt="Map"
      width={mapWidth}
      height={mapHeight}
    />
  );
}
