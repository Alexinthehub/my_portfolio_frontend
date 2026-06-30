// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ isAuthenticated }) => {
  const location = useLocation();

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
    <nav style={{
      backgroundColor: '#0F0F0F',
      borderBottom: '1px solid rgba(93, 214, 44, 0.15)',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 50,
      padding: '16px 80px',
      boxShadow: '0 4px 30px rgba(0,0,0,0.5)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
      }}>
        {/* Logo with Lucida Handwriting */}
        <Link to="/" style={{
          fontSize: '40px',
          fontWeight: '700',
          color: 'white',
          textDecoration: 'none',
          letterSpacing: '1px',
          transition: 'color 0.3s ease',
          fontFamily: "'Lucida Handwriting', 'Apple Chancery', cursive"
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#5DD62C'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
        >
          My Portfolio
        </Link>

        <div style={{ display: 'flex', gap: '40px' }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                color: location.pathname === link.path ? '#5DD62C' : 'white',
                fontSize: '24px',
                fontWeight: '500',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                textShadow: location.pathname === link.path ? '0 0 20px rgba(93, 214, 44, 0.4)' : 'none',
                position: 'relative'
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
    </nav>
  );
};

export default Navbar;