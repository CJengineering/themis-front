import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const StatusSteps = () => {
    const statusTravel = 'Request'
  const location = useLocation();
  const navLinks = [
    { name: 'Request', icon: 'unknown_document', path: '/' },
    { name: 'Authentication', icon: 'grading', path: '/travel' },
    { name: 'Validation', icon: 'outgoing_mail', path: '/accommodation' },
    { name: 'Approval', icon: 'task_alt', path: '/accommodation' },
    { name: 'Finalisation', icon: 'north_east', path: '/accommodation' }
  ];

  return (
    <div className="flex flex-col items-start ">
       <h6 className='scroll-m-20 text-sm mb-2 text-muted-foreground tracking-tight'>PROGRESS</h6>
    <div className=' w-full  ' >
        {navLinks.map((link) => (
          <div
            key={link.name}
           
            className={` flex items-center text-sm text-muted-foreground mb-4 ${
             statusTravel=== link.name ? 'activeStatus' : ''
            }`}
          >
            <span className="material-symbols-outlined text-sm mr-1" style={{fontSize:'13px'}}>{link.icon}</span>
            {link.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusSteps;
