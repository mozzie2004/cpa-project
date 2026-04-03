import type { ReactNode } from 'react';

export const highlightText = (
  text: string,
  target: string,
  className: string
): ReactNode[] => {
  return text.split(new RegExp(`(${target})`, 'i')).map((part, i) =>
    part.toLowerCase() === target.toLowerCase() ? (
      <span key={i} className={className}>
        {part}
      </span>
    ) : (
      part
    )
  );
};
