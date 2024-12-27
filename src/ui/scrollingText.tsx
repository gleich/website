'use client';

import { useLayoutEffect, useRef, useState } from 'react';
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

  const checkOverflow = () => {
    const container = containerRef.current;
    const measurementElement = measurementRef.current;
    if (container && measurementElement) {
      setIsOverflowing(
        measurementElement.scrollWidth > container.clientWidth + 1,
      );
    }
  };

  useLayoutEffect(() => {
    checkOverflow();

    const observer = new ResizeObserver(() => {
      checkOverflow();
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
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
          speed={20}
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
