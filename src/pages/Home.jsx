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
    <div className="home-page" style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#02060E',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
        backgroundImage: `url("/images/home-bg.jpg")`,
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
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      }} />

      {/* SPARKLES */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%' }}>
        <Sparkles />
      </div>

      {/* CONTENT */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        width: '100%',
        maxWidth: '1400px',
        padding: '60px 60px 40px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
        {/* HERO */}
        <div className="hero-grid">
          <div className="hero-text">
            <p className="fade-slide-up delay-1" style={{
              color: '#5DD62C',
              fontSize: 'clamp(18px, 2.5vw, 24px)',
              fontWeight: '600',
              letterSpacing: '4px',
              marginBottom: '4px',
              fontFamily: "'Chalkduster', 'Chalkboard SE', 'Segoe UI', cursive",
            }}>
              HI THERE,
            </p>

            <h1 className="hero-title-wrapper fade-slide-up delay-1" style={{
              fontWeight: '700',
              lineHeight: '1.2',
              margin: 0,
              fontFamily: "'Lucida Handwriting', 'Apple Chancery', cursive",
              fontSize: 'clamp(36px, 6vw, 56px)',
            }}>
              <span className="iam-part" style={{ color: '#FFFFFF' }}>I am </span>
              <span className="name-part glow-name" style={{ color: '#FF6B35' }}>
                {profile?.name || 'Alex Mwendwa'}
              </span>
            </h1>

            {profile?.title && (
              <p className="fade-slide-up delay-2" style={{
                fontSize: 'clamp(16px, 2vw, 22px)',
                color: '#5DD62C',
                marginTop: '4px',
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
                fontWeight: '500',
                letterSpacing: '2px',
              }}>
                {profile.title}
              </p>
            )}
          </div>

          {/* RIGHT: Photo */}
          <div className="hero-image">
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '380px',
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '-12px',
                right: '-12px',
                bottom: '-12px',
                background: 'linear-gradient(135deg, rgba(93,214,44,0.3), rgba(93,214,44,0.05))',
                borderRadius: '20px',
                filter: 'blur(20px)',
                zIndex: 0,
              }} />
              <img
                src={profile?.avatar || 'https://i.imgur.com/q5jPf1h.jpeg'}
                alt={profile?.name || 'Alex Mwendwa'}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: '16px',
                  border: '3px solid rgba(93, 214, 44, 0.3)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                  position: 'relative',
                  zIndex: 1,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 25px 80px rgba(0,0,0,0.8), 0 0 40px rgba(93,214,44,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.6)';
                }}
              />
            </div>
          </div>
        </div>

        {/* BIO */}
        <div className="bio-card">
          <div style={{
            width: '100%',
            backgroundColor: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '24px 32px',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            textAlign: 'center',
          }}>
            <h2 style={{
              fontSize: 'clamp(28px, 3.5vw, 36px)',
              fontWeight: '700',
              color: '#FFFFFF',
              marginBottom: '8px',
              fontFamily: "'Inter', 'Segoe UI', sans-serif",
            }}>
              Who am I?
            </h2>
            
            <p style={{
              color: '#D1D5DB',
              fontSize: 'clamp(14px, 1.5vw, 16px)',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto',
              fontFamily: "'Inter', 'Segoe UI', sans-serif",
            }}>
              {profile?.about || profile?.bio || "I'm a passionate developer who builds elegant solutions to complex problems."}
            </p>
            
            {profile?.resumeUrl && (
              <div style={{ marginTop: '14px' }}>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#5DD62C',
                    color: '#0F0F0F',
                    fontWeight: '600',
                    padding: '8px 28px',
                    borderRadius: '9999px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    fontSize: '14px',
                    fontFamily: "'Inter', 'Segoe UI', sans-serif",
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

        {/* SKILLS */}
        <div style={{
          maxWidth: '1100px',
          width: '100%',
          padding: '40px 0 20px',
          margin: '20px auto 0',
        }}>
          <h2 style={{
            fontSize: 'clamp(24px, 3vw, 30px)',
            fontWeight: '700',
            textAlign: 'center',
            color: '#FFFFFF',
            marginBottom: '28px',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
          }}>
            My Skills
          </h2>

          <div className="skills-wrapper">
            <div className="skills-grid">
              {profile?.skills?.map((skill, idx) => (
                <div key={idx} className="skill-item">
                  <div className="skill-icon">
                    {getSkillIcon(skill)}
                  </div>
                  <h3 className="skill-name">
                    {skill}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{
        position: 'relative',
        zIndex: 3,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(8px)',
        borderTop: '1px solid rgba(93, 214, 44, 0.08)',
        padding: '16px 60px',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          flexWrap: 'wrap',
          marginBottom: '6px',
        }}>
          {profile?.socialLinks?.github && (
            <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer" style={{
              color: '#9CA3AF',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              fontFamily: "'Inter', 'Segoe UI', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#5DD62C';
              e.currentTarget.style.textShadow = '0 0 15px rgba(93,214,44,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#9CA3AF';
              e.currentTarget.style.textShadow = 'none';
            }}>
              🐙 GitHub
            </a>
          )}
          {profile?.socialLinks?.linkedin && (
            <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" style={{
              color: '#9CA3AF',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              fontFamily: "'Inter', 'Segoe UI', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#5DD62C';
              e.currentTarget.style.textShadow = '0 0 15px rgba(93,214,44,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#9CA3AF';
              e.currentTarget.style.textShadow = 'none';
            }}>
              💼 LinkedIn
            </a>
          )}
          {profile?.socialLinks?.twitter && (
            <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" style={{
              color: '#9CA3AF',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              fontFamily: "'Inter', 'Segoe UI', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#5DD62C';
              e.currentTarget.style.textShadow = '0 0 15px rgba(93,214,44,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#9CA3AF';
              e.currentTarget.style.textShadow = 'none';
            }}>
              𝕏 X
            </a>
          )}
          {profile?.socialLinks?.discord && (
            <a href={profile.socialLinks.discord} target="_blank" rel="noopener noreferrer" style={{
              color: '#9CA3AF',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              fontFamily: "'Inter', 'Segoe UI', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#5DD62C';
              e.currentTarget.style.textShadow = '0 0 15px rgba(93,214,44,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#9CA3AF';
              e.currentTarget.style.textShadow = 'none';
            }}>
              💬 Discord
            </a>
          )}
        </div>
        <p style={{ color: '#6B7280', fontSize: '11px', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
          © {new Date().getFullYear()} Alex Mwendwa. Built with ❤️
        </p>
      </footer>
    </div>
  );
};

export default Home;