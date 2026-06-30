// src/pages/Contact.jsx
import { useState, useEffect } from 'react';
import { sendContactMessage } from '../services/api';
import { getProfile } from '../services/api'; // 👈 Import getProfile
import LoadingSpinner from '../components/LoadingSpinner';
import Sparkles from '../components/Sparkles';

const Contact = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [profile, setProfile] = useState(null); // 👈 Add profile state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Fetch profile for social links
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res.data.data);
      } catch (err) {
        console.error('Failed to load profile:', err);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccess(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);
    setError(null);

    try {
      await sendContactMessage(formData);
      setSuccess('✅ Message sent successfully! I will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError('❌ Failed to send message. Please try again later.');
      console.error(err);
    } finally {
      setSubmitting(false);
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
        flexDirection: 'column',
        padding: '40px 80px 0',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: '40px'
        }}>
          <div style={{
            maxWidth: '600px',
            width: '100%',
            backgroundColor: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            padding: '48px',
            border: '1px solid rgba(93, 214, 44, 0.3)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 40px rgba(93, 214, 44, 0.15)',
          }}>
            
            {/* Form Header */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h1 style={{
                fontSize: '36px',
                fontWeight: '700',
                color: 'white',
                marginBottom: '8px'
              }}>
                Get In Touch
              </h1>
              <p style={{
                fontSize: '16px',
                color: '#9CA3AF'
              }}>
                Have a project in mind or want to collaborate? Reach out!
              </p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit}>
              {/* ... your existing form fields ... */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#D1D5DB',
                  marginBottom: '6px'
                }}>
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
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
                  placeholder="John Doe"
                  disabled={submitting}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#D1D5DB',
                  marginBottom: '6px'
                }}>
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
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
                  placeholder="john@example.com"
                  disabled={submitting}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#D1D5DB',
                  marginBottom: '6px'
                }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    fontSize: '16px',
                    color: 'white',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#5DD62C';
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
                  }}
                  placeholder="Tell me about your project..."
                  disabled={submitting}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '12px',
                  backgroundColor: '#5DD62C',
                  color: '#0F0F0F',
                  fontSize: '18px',
                  fontWeight: '600',
                  border: 'none',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: submitting ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!submitting) {
                    e.currentTarget.style.backgroundColor = '#4CAF50';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!submitting) {
                    e.currentTarget.style.backgroundColor = '#5DD62C';
                  }
                }}
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>

              {success && (
                <div style={{
                  marginTop: '16px',
                  padding: '12px 16px',
                  backgroundColor: 'rgba(93, 214, 44, 0.15)',
                  borderRadius: '12px',
                  color: '#5DD62C',
                  textAlign: 'center',
                  fontSize: '15px',
                  fontWeight: '500'
                }}>
                  {success}
                </div>
              )}
              {error && (
                <div style={{
                  marginTop: '16px',
                  padding: '12px 16px',
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  borderRadius: '12px',
                  color: '#FCA5A5',
                  textAlign: 'center',
                  fontSize: '15px',
                  fontWeight: '500'
                }}>
                  {error}
                </div>
              )}
            </form>

            {/* ✨ SOCIAL LINKS SECTION — BELOW THE FORM */}
            <div style={{
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              textAlign: 'center'
            }}>
              <p style={{
                color: '#9CA3AF',
                fontSize: '14px',
                marginBottom: '16px',
                letterSpacing: '1px',
                fontFamily: "'Inter', 'Segoe UI', sans-serif"
              }}>
                Connect with me
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '28px',
                flexWrap: 'wrap'
              }}>
                {profile?.socialLinks?.linkedin && (
                  <a
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#9CA3AF',
                      textDecoration: 'none',
                      fontSize: '16px',
                      fontWeight: '500',
                      transition: 'all 0.3s ease',
                      fontFamily: "'Inter', 'Segoe UI', sans-serif"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#5DD62C';
                      e.currentTarget.style.textShadow = '0 0 20px rgba(93,214,44,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#9CA3AF';
                      e.currentTarget.style.textShadow = 'none';
                    }}
                  >
                    💼 LinkedIn
                  </a>
                )}
                {profile?.socialLinks?.twitter && (
  <a
    href={profile.socialLinks.twitter}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      color: '#9CA3AF',
      textDecoration: 'none',
      fontSize: '16px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      fontFamily: "'Inter', 'Segoe UI', sans-serif"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.color = '#5DD62C';
      e.currentTarget.style.textShadow = '0 0 20px rgba(93,214,44,0.3)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color = '#9CA3AF';
      e.currentTarget.style.textShadow = 'none';
    }}
  >
    𝕏 X
  </a>
)}
                {profile?.socialLinks?.github && (
                  <a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#9CA3AF',
                      textDecoration: 'none',
                      fontSize: '16px',
                      fontWeight: '500',
                      transition: 'all 0.3s ease',
                      fontFamily: "'Inter', 'Segoe UI', sans-serif"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#5DD62C';
                      e.currentTarget.style.textShadow = '0 0 20px rgba(93,214,44,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#9CA3AF';
                      e.currentTarget.style.textShadow = 'none';
                    }}
                  >
                    🐙 GitHub
                  </a>
                )}
                {profile?.socialLinks?.email && (
                  <a
                    href={`mailto:${profile.socialLinks.email}`}
                    style={{
                      color: '#9CA3AF',
                      textDecoration: 'none',
                      fontSize: '16px',
                      fontWeight: '500',
                      transition: 'all 0.3s ease',
                      fontFamily: "'Inter', 'Segoe UI', sans-serif"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#5DD62C';
                      e.currentTarget.style.textShadow = '0 0 20px rgba(93,214,44,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#9CA3AF';
                      e.currentTarget.style.textShadow = 'none';
                    }}
                  >
                    📧 Email
                  </a>
                )}

                {profile?.socialLinks?.discord && (
  <a
    href={profile.socialLinks.discord}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      color: '#6B7280',
      textDecoration: 'none',
      fontSize: '15px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      fontFamily: "'Inter', 'Segoe UI', sans-serif"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.color = '#5DD62C';
      e.currentTarget.style.textShadow = '0 0 20px rgba(93,214,44,0.3)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color = '#6B7280';
      e.currentTarget.style.textShadow = 'none';
    }}
  >
    💬 Discord
  </a>
)}
              </div>
            </div>
          </div>
        </div>


        {/* Footer */}
        <footer style={{
          maxWidth: '1400px',
          margin: '0 auto',
          textAlign: 'center',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: '24px 0',
          width: '100%',
          marginTop: 'auto'
        }}>
          <p style={{ color: '#6B7280', fontSize: '14px' }}>
            © {new Date().getFullYear()} Alex Mwendwa. Built with ❤️
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Contact;