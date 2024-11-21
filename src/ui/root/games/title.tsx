'use client';
import { useEffect, useRef, useState } from 'react';
import styles from '@/ui/root/games/title.module.css';

export default function Title({ name }: { name: string }) {
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
  }, [name]);

  return (
    <div ref={containerRef} className={styles.container}>
      <h3
        ref={textRef}
        className={`${styles.text} ${isOverflowing ? styles.scroll : ''}`}
      >
        {name}
      </h3>
      {isOverflowing ? (
        <h3
          ref={textRef}
          className={`${styles.text} ${isOverflowing ? styles.scroll : ''}`}
        >
          {name}
        </h3>
      ) : (
        <></>
      )}
    </div>
  );
}
