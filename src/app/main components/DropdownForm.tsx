import React, { useState } from 'react';
import { TravelForm } from './TravelForm';
import { AccomodationForm } from './AccomodationForm';
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export default function DropdownForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem('user-data');
    localStorage.removeItem('isAuthenticated');
    window.location.reload();
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsActive(!isActive); // Toggle the active state
  };

  return (
    <div className="dropdown-menu-root relative inline-block"style={{ userSelect: 'none' }}>
    <div className="dropdown-menu-trigger outline-none mt-2" onClick={toggleDropdown} style={{ userSelect: 'none' }}>
      <span className={`material-symbols-outlined transition-transform ${isActive ? 'transform rotate-90' : ''}`}>
        {isActive ? 'close' : 'menu'}
      </span>
    </div>

    {isOpen && (
      <div className="absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md top-full left-0 transform -translate-x-full"> {/* Adjust position with translate */}
        <div className="dropdown-menu-group">
          <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm">
            <TravelForm />
          </div>
          <div className="-mx-1 my-1 h-px bg-muted"></div>
          <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm">
            <div onClick={handleLogout}>Log out</div>
          </div>
         
        </div>
      </div>
    )}
  </div>
  );
}
{
  /* <div
        className={`flex items-center justify-center h-8 w-8 rounded-full cursor-pointer transition duration-300 ease-in-out text-white transform ${
          isActive ? 'bg-gray-500 rotate-45' : 'bg-blue-500'
        }`}
        style={{ userSelect: 'none' }}
        onClick={toggleDropdown}
      >
       <div className="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm">
          
          </div>
        <span className="material-icons">add</span>
      </div> */
}
