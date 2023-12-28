import React, { useState } from 'react';
import { TravelForm } from './TravelForm';
import { AccomodationForm } from './AccomodationForm';

export default function DropdownForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsActive(!isActive); // Toggle the active state
  };

  return (
    <div className="relative mt-1">
      <div
        className={`flex items-center justify-center h-8 w-8 rounded-full cursor-pointer transition duration-300 ease-in-out text-white transform ${
          isActive ? 'bg-red-500 rotate-45' : 'bg-blue-500'
        }`}
        style={{ userSelect: 'none' }}
        onClick={toggleDropdown}
      >
        <span className="material-icons">add</span>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white p-4 z-20">
          <TravelForm />
          <div className="my-2"></div> {/* Divider between forms */}
          <AccomodationForm />
        </div>
      )}
    </div>
  );
}
