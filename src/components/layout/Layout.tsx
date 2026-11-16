import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  if (isHome) {
    return (
      <div className="min-h-screen lg:h-screen lg:max-h-screen overflow-x-hidden lg:overflow-hidden flex flex-col bg-background text-foreground selection:bg-cyan-500/20 selection:text-cyan-400">
        <Navbar />
        <main className="flex-1 min-h-0 overflow-y-auto lg:overflow-hidden flex flex-col">
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-cyan-500/20 selection:text-cyan-400">
      <Navbar />
      <main className="flex-grow pt-24 sm:pt-28">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
