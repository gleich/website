'use client';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useId } from 'react';

type TextMorphProps = {
  children: string;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
};

export function TextMorph({
  children,
  as: Component = 'span',
  className,
  style,
}: TextMorphProps) {
  const uniqueId = useId();

  const characters = useMemo(() => {
    const charCounts: Record<string, number> = {};

    return children.split('').map((char) => {
      // Convert normal space to non-breaking space
      const displayedChar = char === ' ' ? '\u00A0' : char;

      const lowerChar = displayedChar.toLowerCase();
      charCounts[lowerChar] = (charCounts[lowerChar] || 0) + 1;

      return {
        id: `${uniqueId}-${lowerChar}${charCounts[lowerChar]}`,
        label: displayedChar,
      };
    });
  }, [children, uniqueId]);

  return (
    <Component className={className} aria-label={children} style={style}>
      <AnimatePresence mode="popLayout" initial={false}>
        {characters.map((character) => (
          <motion.span
            key={character.id}
            layoutId={character.id}
            aria-hidden="true"
            style={{ display: 'inline-flex' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {character.label}
          </motion.span>
        ))}
      </AnimatePresence>
    </Component>
  );
}
