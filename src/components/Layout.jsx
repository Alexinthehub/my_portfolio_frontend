import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#02060e] text-white">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* THIS IS CRUCIAL - it renders the page content */}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;