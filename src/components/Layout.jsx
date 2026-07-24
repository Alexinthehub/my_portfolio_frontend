import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#02060e] text-white">
      {/* Navbar is fixed; we'll offset its height with pt-16 (64px) */}
      <Navbar />
      
      {/* Main content: flex-1 pushes footer down, pt-16 prevents navbar overlap */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      
      {/* Footer will stick to bottom because flex-1 pushes it */}
      <Footer />
    </div>
  );
}

export default Layout;