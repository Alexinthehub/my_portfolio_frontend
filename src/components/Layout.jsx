// src/components/Layout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = ({ isAuthenticated }) => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar isAuthenticated={isAuthenticated} />
      <main style={{ 
        paddingTop: '64px',
        minHeight: '100vh'
      }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;