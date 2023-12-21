import React, { useState } from "react";

const MainNav = () => {
  const [activeLink, setActiveLink] = useState("dashboard");

  const navLinks = [
    { name: "Dashboard", icon: "dashboard", href: "#dashboard" },
    { name: "Travel", icon: "flight", href: "#travel" },
    { name: "Accommodation", icon: "hotel", href: "#accommodation" },
  ];

  return (
    <div className="flex flex-col items-start  px-2">
      <h1 className="text-xl font-bold mb-4">Themis</h1>
      <nav>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={`nav-link flex items-center mb-2 ${activeLink === link.name.toLowerCase() ? "active" : ""}`}
            onClick={() => setActiveLink(link.name.toLowerCase())}
          >
            <span className="material-icons mr-2">{link.icon}</span>
            {link.name}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default MainNav;

