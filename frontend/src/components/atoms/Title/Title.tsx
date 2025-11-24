import React, { FC, ReactNode, HTMLAttributes } from "react";
import "./Title.css";

// 1. Definimos la interfaz de props
interface TitleProps {
  children: React.ReactNode;
  // level es el número que forma la etiqueta h1, h2, etc.
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

// 2. 🚨 Usamos FC<TitleProps> para tipar la función, lo que ayuda a TS a encontrar el contexto JSX.
export const Title: FC<TitleProps> = ({
  children,
  level = 1,
  className = "",
}) => {
  // 3. El cast estricto es correcto y crucial para usar el tag dinámico.
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <HeadingTag className={`title title-${level} ${className}`}>
      {children}
    </HeadingTag>
  );
};
