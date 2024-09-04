import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const MainNav = () => {
  const userString = localStorage.getItem('user-data');
  if (!userString) return null;
  const userData = JSON.parse(userString);
  const userId = userData?.id;
  const userRole = userData?.role;
  const location = useLocation();
  let navLinks = [
   // { name: "Dashboard", icon: "dashboard", path: "/" },
  

    {name: 'Financial', icon: 'account_balance', path: '/financial'},
    {name: 'Trips', icon: 'flight_takeoff', path: '/'},
    //{ name: "Accommodation", icon: "hotel", path: "/accommodation" },
  ];
  if (userRole === 'traveller') {
    navLinks = navLinks.filter(link => link.name !== "Trips");
  }
  if (userRole === 'traveller') {
    navLinks = navLinks.filter(link => link.name !== "Financial");
  }

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

