'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '@/ui/root/music/scrollingTitle.module.css';
import Marquee from 'react-fast-marquee';

export default function ScrollingTitle({
  text,
  className,
}: {
  text: string;
  className?: string | undefined;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const container = containerRef.current;
      const textElement = textRef.current;
      if (container && textElement) {
        setIsOverflowing(textElement.scrollWidth > container.clientWidth);
      }
    };

    checkOverflow();

    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [text]);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${!isOverflowing ? styles.notOverflow : ''}`}
    >
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
        <div ref={textRef} className={`${styles.text} ${className}`}>
          {text}
        </div>
      )}
    </div>
  );
}
