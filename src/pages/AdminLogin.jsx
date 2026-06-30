// src/pages/AdminLogin.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Sparkles from '../components/Sparkles';

  const AdminLogin = ({ setIsAuthenticated }) => {
  const [pageLoading, setPageLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await adminLogin(email, password);
      localStorage.setItem('token', response.data.token);
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
      setIsAuthenticated(true);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%', backgroundColor: '#02060E' }}>
      
      {/* Glowing Orb */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(93,214,44,0.12) 0%, rgba(0,0,0,0) 70%)',
        borderRadius: '50%',
        zIndex: 0,
        pointerEvents: 'none',
        animation: 'pulseGlow 3s ease-in-out infinite',
      }} />

      <Sparkles />

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        }
      `}</style>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        
        <div style={{
          maxWidth: '420px',
          width: '100%',
          backgroundColor: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(16px)',
          borderRadius: '24px',
          padding: '48px 40px',
          border: '1px solid rgba(93, 214, 44, 0.3)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 40px rgba(93, 214, 44, 0.15)',
        }}>
          
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>🔐</div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'white', marginBottom: '4px' }}>
              Login
            </h1>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
              Welcome back, please login to your account
            </p>
          </div>

          {error && (
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '12px',
              padding: '12px 16px',
              color: '#FCA5A5',
              fontSize: '14px',
              textAlign: 'center',
              marginBottom: '20px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '500',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '6px'
              }}>
                User Name
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '18px',
                  opacity: 0.6
                }}>
                  👤
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px 14px 48px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    fontSize: '16px',
                    color: 'white',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#5DD62C';
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
                  }}
                  placeholder="admin@example.com"
                  disabled={loading}
                />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '500',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '6px'
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '18px',
                  opacity: 0.6
                }}>
                  🔒
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px 14px 48px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    fontSize: '16px',
                    color: 'white',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#5DD62C';
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
                  }}
                  placeholder="••••••••"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.4)',
                    cursor: 'pointer',
                    fontSize: '18px',
                    padding: 0
                  }}
                >
                  {showPassword ? '👁️' : '🙈'}
                </button>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: '#5DD62C',
                  cursor: 'pointer',
                  marginRight: '10px'
                }}
              />
              <label htmlFor="rememberMe" style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '14px',
                cursor: 'pointer'
              }}>
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: '#5DD62C',
                color: '#0F0F0F',
                fontSize: '18px',
                fontWeight: '700',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: loading ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = '#4CAF50';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = '#5DD62C';
                }
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            {/* ❌ "Signup" link removed — no need for single-user admin */}
            
            <div style={{
              textAlign: 'center',
              marginTop: '20px',
              color: 'rgba(255,255,255,0.2)',
              fontSize: '12px'
            }}>
              Created by Alex Mwendwa
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;