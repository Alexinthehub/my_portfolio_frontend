// src/pages/Contact.jsx
import { useState, useEffect } from 'react';
import { sendContactMessage, getProfile } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Sparkles from '../components/Sparkles';

const Contact = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

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
      setTimeout(() => {
        setSuccess(null);
      }, 5000);
    } catch (err) {
      setError('❌ Failed to send message. Please try again later.');
      console.error(err);
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      setSubmitting(false);
    }
  };

  if (pageLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="contact-page page-container" style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      overflow: 'hidden',
    }}>
      {/* BACKGROUND */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        backgroundImage: `url("/images/contact-bg.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }} />

      {/* OVERLAY */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
      }} />

      {/* SPARKLES */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%' }}>
        <Sparkles />
      </div>

      {/* CONTENT */}
      <div className="page-content" style={{
        position: 'relative',
        zIndex: 3,
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '40px 20px 0',
        boxSizing: 'border-box',
        flex: 1,
      }}>
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: '40px',
        }}>
          <div className="contact-card">
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h1 className="contact-title" style={{
                fontSize: '36px',
                fontWeight: '700',
                color: 'white',
                marginBottom: '8px',
                fontFamily: "'Inter', 'Segoe UI', sans-serif"
              }}>
                Get In Touch
              </h1>
              <p style={{
                fontSize: '16px',
                color: '#9CA3AF'
              }}>
                Have a project in mind? Reach out!
              </p>
            </div>

            <form onSubmit={handleSubmit}>
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
                  className="contact-input"
                  placeholder="Enter your name"
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
                  className="contact-input"
                  placeholder="Enter your email"
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
                  className="contact-input"
                  style={{ resize: 'vertical', minHeight: '100px' }}
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
                  opacity: submitting ? 0.7 : 1,
                  fontFamily: "'Inter', 'Segoe UI', sans-serif"
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

            {/* Social Links */}
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
                {profile?.socialLinks?.discord && (
                  <a
                    href={profile.socialLinks.discord}
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
                    💬 Discord
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ✅ NO FOOTER HERE – Layout.jsx provides it */}
      </div>
    </div>
  );
};

export default Contact;