import { FC, ReactNode } from "react"; // Importar FC y ReactNode como tipos
import "./Title.css";

// Definimos la interfaz (no necesitas HTMLAttributes si no usas props como onClick, style, etc.)
interface TitleProps {
  children: ReactNode; // ReactNode es suficiente si está importado
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

// Usamos FC<TitleProps> para tipar la función
export const Title: FC<TitleProps> = ({
  children,
  level = 1,
  className = "",
}) => {
  // Cast estricto para la etiqueta dinámica (¡Esto es correcto!)
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <HeadingTag className={`title title-${level} ${className}`}>
      {children}
    </HeadingTag>
  );
};
