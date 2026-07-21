// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = ({ isAuthenticated }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Vision', path: '/vision' },
    { name: 'Contact', path: '/contact' },
  ];

  if (isAuthenticated) {
    navLinks.push({ name: 'Admin', path: '/admin' });
  }

  if (location.pathname === '/admin/dashboard') {
    return null;
  }

  return (
    <nav className="navbar" style={{
      backgroundColor: '#0F0F0F',
      borderBottom: '1px solid rgba(93, 214, 44, 0.15)',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 50,
      padding: '12px 20px',
      boxShadow: '0 4px 30px rgba(0,0,0,0.5)',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}>
        {/* Logo — Larger on mobile */}
        <Link to="/" className="navbar-logo" style={{
          fontSize: '28px',
          fontWeight: '700',
          color: 'white',
          textDecoration: 'none',
          letterSpacing: '1px',
          transition: 'color 0.3s ease',
          fontFamily: "'Lucida Handwriting', 'Apple Chancery', cursive",
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#5DD62C'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
        >
          My Portfolio
        </Link>

        {/* Hamburger Icon */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger-btn"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '30px',
            cursor: 'pointer',
            padding: '4px 8px',
            lineHeight: 1,
          }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        {/* Navigation Links */}
        <div className={`nav-links ${menuOpen ? 'open' : ''}`} style={{
          display: 'flex',
          gap: '28px',
          alignItems: 'center',
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="navbar-link"
              onClick={() => setMenuOpen(false)}
              style={{
                color: location.pathname === link.path ? '#5DD62C' : 'white',
                fontSize: '18px',
                fontWeight: '500',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                textShadow: location.pathname === link.path ? '0 0 20px rgba(93, 214, 44, 0.4)' : 'none',
                position: 'relative',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#5DD62C';
                e.currentTarget.style.textShadow = '0 0 20px rgba(93, 214, 44, 0.4)';
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== link.path) {
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.textShadow = 'none';
                }
              }}
            >
              {link.name}
              {location.pathname === link.path && (
                <span style={{
                  position: 'absolute',
                  bottom: '-4px',
                  left: 0,
                  width: '100%',
                  height: '2px',
                  backgroundColor: '#5DD62C',
                  boxShadow: '0 0 15px rgba(93, 214, 44, 0.6)'
                }} />
              )}
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hamburger-btn {
            display: block !important;
          }
          .nav-links {
            display: none !important;
            flex-direction: column !important;
            position: absolute;
            top: 60px;
            left: 0;
            width: 100%;
            background-color: #0F0F0F;
            padding: 20px;
            gap: 16px !important;
            border-bottom: 1px solid rgba(93, 214, 44, 0.15);
          }
          .nav-links.open {
            display: flex !important;
          }
          .navbar-link {
            font-size: 20px !important;
            white-space: normal !important;
          }
          /* ✅ Increased logo size on mobile */
          .navbar-logo {
            font-size: 24px !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;