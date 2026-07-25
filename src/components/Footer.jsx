// src/components/Footer.jsx
const Footer = ({ profile }) => {
  return (
    <footer className="footer-sticky" style={{
      backgroundColor: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(8px)',
      borderTop: '1px solid rgba(93, 214, 44, 0.08)',
      padding: '16px 60px',
      textAlign: 'center',
      width: '100%',
      position: 'relative',
      bottom: 0,
      marginTop: 'auto',
      zIndex: 10,
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
      <p style={{ color: '#6B7280', fontSize: '14px', fontFamily: "'Inter', 'Segoe UI', sans-serif", margin: 0 }}>
        © {new Date().getFullYear()} Alex Mwendwa. Built with ❤️
      </p>
    </footer>
  );
};

export default Footer;