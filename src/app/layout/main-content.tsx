// src/app/components/MainContent.tsx
import React from "react";

interface MainContentProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return <div className=" p-4">{children}</div>;
};

export default MainContent;
