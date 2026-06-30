// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { getProfile } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Sparkles from '../components/Sparkles';
import { getSkillIcon } from '../utils/skillIcons';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .then(res => setProfile(res.data.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
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
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .fade-slide-up {
          animation: fadeSlideUp 1s ease-out forwards;
        }
        .delay-1 { animation-delay: 0.2s; opacity: 0; }
        .delay-2 { animation-delay: 0.5s; opacity: 0; }
        @keyframes glowOrange {
          0%, 100% { text-shadow: 0 0 10px rgba(255, 107, 53, 0.2); }
          50% { text-shadow: 0 0 30px rgba(255, 107, 53, 0.6); }
        }
      `}</style>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, padding: 0, width: '100%' }}>
        
        {/* ===== HERO ===== */}
        <div className="hero-section" style={{ 
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '80px',
          paddingRight: '80px',
          position: 'relative',
          overflow: 'hidden',
          width: '100%'
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            backgroundColor: 'rgba(93, 214, 44, 0.05)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            pointerEvents: 'none'
          }} />
          
          <div className="hero-grid" style={{
            width: '100%',
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
            position: 'relative',
            zIndex: 10
          }}>
            
            {/* LEFT: Text */}
            <div className="hero-text" style={{ textAlign: 'left' }}>
              <p style={{ 
                color: '#5DD62C', 
                fontSize: '28px', 
                fontWeight: '600',
                letterSpacing: '3px',
                marginBottom: '12px',
                fontFamily: "'Chalkduster', 'Chalkboard SE', cursive"
              }}>
                HI THERE
              </p>
              
              <h1 className="hero-title" style={{
                fontSize: '64px',
                fontWeight: '700',
                lineHeight: '1.2',
                margin: 0,
                whiteSpace: 'nowrap',
                fontFamily: "'Inter', 'Segoe UI', sans-serif"
              }}>
                <span style={{ color: 'white' }}>I am</span>{' '}
                <span 
                  className="fade-slide-up delay-1"
                  style={{ 
                    color: '#FF6B35',
                    fontFamily: "'Lucida Handwriting', 'Apple Chancery', cursive",
                    animation: 'fadeSlideUp 1s ease-out forwards, glowOrange 2s ease-in-out infinite 1.2s'
                  }}
                >
                  {profile?.name || 'Alex Mwendwa'}
                </span>
              </h1>
              
              {profile?.title && (
                <p 
                  className="fade-slide-up delay-2"
                  style={{
                    fontSize: '24px',
                    color: '#5DD62C',
                    marginTop: '8px',
                    fontFamily: "'Inter', 'Segoe UI', sans-serif",
                    fontWeight: '500'
                  }}
                >
                  {profile.title}
                </p>
              )}
              

            </div>

            {/* RIGHT: Image */}
            <div className="hero-image" style={{ 
              display: 'flex', 
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  inset: '-16px',
                  backgroundColor: 'rgba(93, 214, 44, 0.2)',
                  borderRadius: '16px',
                  filter: 'blur(20px)',
                  zIndex: 0
                }} />
                <img
                  src={profile?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop'}
                  alt={profile?.name}
                  style={{
                    width: '100%',
                    maxWidth: '380px',
                    height: 'auto',
                    maxHeight: '480px',
                    objectFit: 'cover',
                    borderRadius: '16px',
                    border: '3px solid rgba(93, 214, 44, 0.4)',
                    boxShadow: '0 20px 60px rgba(93, 214, 44, 0.2)',
                    position: 'relative',
                    zIndex: 1,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 30px 80px rgba(93, 214, 44, 0.35)';
                    e.currentTarget.style.borderColor = '#5DD62C';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(93, 214, 44, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(93, 214, 44, 0.4)';
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ===== BIO CARD ===== */}
        <div className="bio-card" style={{
          maxWidth: '900px',
          margin: '-60px auto 0',
          padding: '0 32px 60px',
          position: 'relative',
          zIndex: 20
        }}>
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            borderRadius: '24px',
            padding: '48px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 60px rgba(93, 214, 44, 0.08)',
            textAlign: 'center'
          }}>
            <h2 className="bio-title" style={{
              fontSize: '32px',
              fontWeight: '700',
              color: 'white',
              marginBottom: '16px',
              textAlign: 'center',
              fontFamily: "'Inter', 'Segoe UI', sans-serif"
            }}>
              Who I'm I?
            </h2>
            
            <p className="bio-text" style={{
              color: '#D1D5DB',
              fontSize: '18px',
              lineHeight: '1.7',
              maxWidth: '700px',
              margin: '0 auto',
              fontFamily: "'Inter', 'Segoe UI', sans-serif"
            }}>
              {profile?.about || profile?.bio || "I'm a passionate developer who builds elegant solutions to complex problems."}
            </p>
            
            {profile?.resumeUrl && (
              <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#5DD62C',
                    color: '#0F0F0F',
                    fontWeight: '600',
                    padding: '14px 40px',
                    borderRadius: '9999px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 24px rgba(93, 214, 44, 0.2)',
                    fontSize: '18px',
                    fontFamily: "'Inter', 'Segoe UI', sans-serif"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#337418';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#5DD62C';
                    e.currentTarget.style.color = '#0F0F0F';
                  }}
                >
                  View Resume
                </a>
              </div>
            )}
          </div>
        </div>

        {/* ===== MY SKILLS ===== */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px 80px' }}>
          <h2 className="skills-title" style={{
            fontSize: '36px',
            fontWeight: '700',
            textAlign: 'center',
            color: 'white',
            marginBottom: '48px',
            fontFamily: "'Inter', 'Segoe UI', sans-serif"
          }}>
            My Skills
          </h2>

          <div style={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(12px)',
            borderRadius: '24px',
            padding: '48px',
            border: '1px solid rgba(255,255,255,0.05)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <div className="skills-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '24px'
            }}>
              {profile?.skills?.map((skill, idx) => (
                <div
                  key={idx}
                  className="skill-item"
                  style={{
                    backgroundColor: 'rgba(15, 15, 15, 0.5)',
                    borderRadius: '16px',
                    padding: '24px',
                    textAlign: 'center',
                    border: '1px solid rgba(93, 214, 44, 0.15)',
                    transition: 'all 0.3s ease',
                    cursor: 'default'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.borderColor = '#5DD62C';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.borderColor = 'rgba(93, 214, 44, 0.15)';
                  }}
                >
                  <div className="skill-icon" style={{ fontSize: '42px', marginBottom: '8px' }}>
                    {getSkillIcon(skill)}
                  </div>
                  <h3 className="skill-name" style={{ color: 'white', fontWeight: '600', fontSize: '18px', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
                    {skill}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <footer className="footer" style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(8px)',
          borderTop: '1px solid rgba(93, 214, 44, 0.1)',
          padding: '24px',
          textAlign: 'center',
          margin: 0
        }}>
          <div className="footer-links" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '28px',
            marginBottom: '16px',
            flexWrap: 'wrap'
          }}>
            {profile?.socialLinks?.github && (
              <a
                href={profile.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
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
                🐙 GitHub
              </a>
            )}
            {profile?.socialLinks?.linkedin && (
              <a
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
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
                💼 LinkedIn
              </a>
            )}
            {profile?.socialLinks?.twitter && (
              <a
                href={profile.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
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
                𝕏 X
              </a>
            )}
            {profile?.socialLinks?.discord && (
              <a
                href={profile.socialLinks.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
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
          <p className="footer-text" style={{ color: '#6B7280', fontSize: '14px', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
            © {new Date().getFullYear()} Alex Mwendwa. Built with ❤️
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Home;