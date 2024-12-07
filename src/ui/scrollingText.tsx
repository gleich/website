'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '@/ui/scrollingText.module.css';
import Marquee from 'react-fast-marquee';

export default function ScrollingText({
  text,
  className,
}: {
  text: string;
  className?: string | undefined;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measurementRef = useRef<HTMLSpanElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const container = containerRef.current;
      const measurementElement = measurementRef.current;
      if (container && measurementElement) {
        setIsOverflowing(
          measurementElement.scrollWidth > container.clientWidth,
        );
      }
    };

    checkOverflow();

    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [text]);

  return (
    <div ref={containerRef} className={styles.container}>
      <span
        ref={measurementRef}
        className={`${styles.measurement} ${styles.text} ${className}`}
      >
        {text}
      </span>

      {isOverflowing ? (
        <Marquee
          gradient={false}
          speed={Math.min(70, 1.2 * text.length)}
          delay={2}
          className={`${styles.marquee} ${className}`}
        >
          <span className={styles.marqueeText}>{text}</span>
        </Marquee>
      ) : (
        <div className={`${styles.text} ${className}`}>{text}</div>
      )}
    </div>
  );
}
