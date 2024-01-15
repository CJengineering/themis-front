import React from 'react';

interface TypographyH1Props {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

function TypographyH1({ children, color, className }: TypographyH1Props) {

  const textStyle = color ? { color } : {};

  return (
    <h1 className={`scroll-m-20 text-4xl font-extrabold special-font tracking-tight lg:text-5xl ${className}`} style={textStyle}>
      {children}
    </h1>
  );
}

export default TypographyH1;
