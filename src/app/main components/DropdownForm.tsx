import React, { useState } from 'react';
import { TravelForm } from './TravelForm';
import { useNavigate } from 'react-router-dom';
import { AccomodationForm } from './AccomodationForm';
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { TripSaveForm } from './TripSaveRequest';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export default function DropdownForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user-data') || '{}');
  const handleLogout = () => {
    localStorage.removeItem('user-data');
    localStorage.removeItem('isAuthenticated');
    window.location.reload();
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsActive(!isActive);
  };
  const handleClose = () => {
    console.log('closed');
  };
  const onTripSave = () => {
    console.log('closed');
  };
  const handleProfileClick = () => {
    navigate(`/profile/${currentUser.id}`);
    window.location.reload();
  };
  const handleProfilesClick = () => {
    navigate(`/profiles`);
  };

  return (
    <div
      className="dropdown-menu-root relative inline-block"
      style={{ userSelect: 'none' }}
    >
      <div
        className="dropdown-menu-trigger outline-none mt-2"
        onClick={toggleDropdown}
        style={{ userSelect: 'none' }}
      >
        <span
          className={`material-symbols-outlined cursor-pointer transition-transform ${
            isActive ? 'transform rotate-90' : ''
          }`}
        >
          {isActive ? 'close' : 'menu'}
        </span>
      </div>

      {isOpen && (
        <div className="absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md top-full left-0 transform -translate-x-full">
          {' '}
          {/* Adjust position with translate */}
          <div className="dropdown-menu-group">
            <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm">
              <Dialog>
                <DialogTrigger >Create Trip</DialogTrigger>
                <DialogContent className=" sm:max-w-[425px]">
                  <TripSaveForm onClose={handleClose} />
                </DialogContent>
              </Dialog>
            </div>
            <div
              className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm"
              onClick={handleProfileClick}
            >
              My profile
            </div>
            {currentUser.role === 'agent' ||
            currentUser.role === 'validator' ? (
              <div
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm"
                onClick={handleProfilesClick}
              >
                Users
              </div>
            ) : null}

            <div className="-mx-1 my-1 h-px bg-muted"></div>
            <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm">
              <div className="cursor-pointer" onClick={handleLogout}>
                Log out
              </div>
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
