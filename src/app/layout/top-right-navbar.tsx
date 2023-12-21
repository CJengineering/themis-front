// src/app/components/TopRightNavBar.tsx
import React from "react";

interface TopRightNavBarProps {
  children: React.ReactNode;
}

const TopRightNavBar = ({ children }:TopRightNavBarProps) => {
  return <div className="  p-4">{children}</div>;
};

export default TopRightNavBar;
