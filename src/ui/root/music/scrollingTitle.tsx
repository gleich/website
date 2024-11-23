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
  const textRef = useRef<HTMLHeadingElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (container && text) {
      const checkOverflow = () => {
        setIsOverflowing(text.scrollWidth > container.clientWidth);
      };
      checkOverflow();
      window.addEventListener('resize', checkOverflow);
      return () => window.removeEventListener('resize', checkOverflow);
    }
  }, [text]);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${isOverflowing ? '' : styles.notOverflow}`}
    >
      <div
        ref={textRef}
        className={`${styles.text} ${className} ${isOverflowing ? styles.scroll : ''}`}
      >
        {text}
      </div>
      {isOverflowing ? (
        <div
          ref={textRef}
          className={`${styles.text} ${className} ${isOverflowing ? styles.scroll : ''}`}
        >
          {text}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
