import React from 'react';

import { Outlet, useLocation } from 'react-router-dom';
import MainNavBar from './main-nav-bar';
import MainNav from '../main components/MainNav';
import TopRightNavBar from './top-right-navbar';
import TopRightNav from '../main components/TopNavBar';
import MainContent from './main-content';
import { Toaster } from '@/components/ui/toaster';

const MainLayout = () => {
  const formatPathname = (pathname:string) => {
    if (pathname === '/') return 'Travel';
  
   
    const parts = pathname.slice(1).split('/');
  
    
    return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
  };
  
  const location = useLocation();
  
  const currentPath = formatPathname(location.pathname);

  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="hidden md:block md:col-span-2">
        <MainNavBar>
          <MainNav />
        </MainNavBar>
      </div>

      <div className="col-span-12 md:col-span-10 flex flex-col">
        <TopRightNavBar>
          <TopRightNav currentPage={currentPath} /> 
        </TopRightNavBar>
        <div className="flex-grow overflow-auto">
          <MainContent>
            <Outlet />
          </MainContent>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default MainLayout;
