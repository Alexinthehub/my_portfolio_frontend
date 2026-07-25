// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#02060e] text-white" style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      minHeight: '100dvh',
    }}>
      <Navbar />
      
      <main className="flex-1 pt-16" style={{
        flex: '1 0 auto',
        width: '100%',
      }}>
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}

export default Layout;