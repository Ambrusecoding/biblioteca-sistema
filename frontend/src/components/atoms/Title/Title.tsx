// src/components/atoms/Title/Title.tsx

import type { FC, ReactNode } from "react";
import "./Title.css";

interface TitleProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export const Title: FC<TitleProps> = ({
  children,
  level = 1,
  className = "",
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const HeadingTag = `h${level}` as any;

  return (
    <HeadingTag className={`title title-${level} ${className}`}>
      {children}
    </HeadingTag>
  );
};
