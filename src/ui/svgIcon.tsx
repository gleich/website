import Image from 'next/image';
import styles from '@/ui/svgIcon.module.css';

export default function SVGIcon({
  src,
  alt,
  className,
  width,
  height,
  title,
}: {
  src: string;
  alt: string;
  className?: string;
  width: number;
  height: number;
  title: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      title={title}
      draggable={false}
      className={`${styles.image} ${className}`}
      width={width}
      height={height}
      priority={true}
    />
  );
}
