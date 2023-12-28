import React from 'react';

import { Outlet } from 'react-router-dom';
import MainNavBar from './main-nav-bar';
import MainNav from '../main components/MainNav';
import TopRightNavBar from './top-right-navbar';
import TopRightNav from '../main components/TopNavBar';
import MainContent from './main-content';

const MainLayout = () => {
  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="hidden md:block md:col-span-2">
        <MainNavBar>
          <MainNav />
        </MainNavBar>
      </div>

      <div className="col-span-12 md:col-span-10 flex flex-col">
        <TopRightNavBar>
          <TopRightNav currentPage="Dashboard" /> 
        </TopRightNavBar>
        <div className="flex-grow overflow-auto">
          <MainContent>
            <Outlet />
          </MainContent>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
