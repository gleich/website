'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '@/ui/root/music/scrollingTitle.module.css';

export default function ScrollingTitle({
  text,
  className,
}: {
  text: string;
  className?: string | undefined;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainTextRef = useRef<HTMLHeadingElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const text = mainTextRef.current;
    if (container && text) {
      const checkOverflow = () => {
        if (container && mainTextRef.current) {
          setIsOverflowing(
            mainTextRef.current.scrollWidth > container.clientWidth,
          );
        }
      };
      checkOverflow();
      window.addEventListener('resize', checkOverflow);
      return () => window.removeEventListener('resize', checkOverflow);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${!isOverflowing ? styles.notOverflow : ''}`}
    >
      <div
        ref={mainTextRef}
        className={`${styles.text} ${className} ${isOverflowing ? styles.scroll : ''}`}
      >
        {text}
      </div>
      {isOverflowing && (
        <div className={`${styles.text} ${className} ${styles.scroll}`}>
          {text}
        </div>
      )}
    </div>
  );
}
