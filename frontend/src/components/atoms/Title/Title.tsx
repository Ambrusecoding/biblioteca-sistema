// src/components/atoms/Title/Title.tsx

import React, { FC, ReactNode } from "react"; // 🚨 Cambiar a importación de valor (sin el 'import type')
import "./Title.css";

// El resto del código es correcto
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
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <HeadingTag className={`title title-${level} ${className}`}>
      {children}
    </HeadingTag>
  );
};
