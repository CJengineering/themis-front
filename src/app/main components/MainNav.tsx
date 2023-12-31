import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const MainNav = () => {

  const location = useLocation();
  const navLinks = [
    { name: "Dashboard", icon: "dashboard", path: "/" },
    { name: "Travel", icon: "flight", path: "/travel" },
    //{ name: "Accommodation", icon: "hotel", path: "/accommodation" },
  ];

  return (
    <div className="flex flex-col items-start  px-2">
      <h1 className="text-xl font-bold mb-4">Themis</h1>
      <nav>
        {navLinks.map((link) => (
         <Link
         key={link.name}
         to={link.path}
         className={`nav-link flex items-center mb-2 ${location.pathname === link.path ? "active" : ""}`}
       >
         <span className="material-icons mr-2">{link.icon}</span>
         {link.name}
       </Link>
        ))}
      </nav>
    </div>
  );
};

export default MainNav;

