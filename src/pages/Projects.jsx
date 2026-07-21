// src/pages/Projects.jsx
import { useEffect, useState } from 'react';
import { getProjects } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Sparkles from '../components/Sparkles';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#02060E',
        color: '#EF4444',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px'
      }}>
        Error loading projects: {error}
      </div>
    );
  }

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      overflow: 'hidden',
    }}>
      
      {/* 🖼️ FULL PAGE BACKGROUND IMAGE */}
<div style={{
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
  backgroundImage: `url("https://i.imgur.com/EVd8v5D.jpeg")`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundAttachment: 'fixed',
  backgroundRepeat: 'no-repeat',
}} />

      {/* 🌑 DARK OVERLAY */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      }} />

      {/* ✨ Sparkles (on top of overlay) */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%' }}>
        <Sparkles />
      </div>

      {/* ===== CONTENT ===== */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        padding: '40px 80px 0',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
        
        <div style={{ flex: 1 }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            textAlign: 'center',
            paddingTop: '20px',
            paddingBottom: '40px'
          }}>
            <h1 className="projects-title" style={{
              fontSize: '48px',
              fontWeight: '700',
              color: 'white',
              marginBottom: '12px',
              fontFamily: "'Inter', 'Segoe UI', sans-serif"
            }}>
              My Projects
            </h1>
            <p style={{
              fontSize: '20px',
              color: '#9CA3AF'
            }}>
              Here are some of the projects I've built
            </p>
          </div>

          <div className="projects-grid" style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
            paddingBottom: '40px'
          }}>
            {projects.length === 0 ? (
              <div style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                color: '#6B7280',
                fontSize: '18px',
                padding: '60px 0'
              }}>
                No projects yet. Add one from the Admin Dashboard!
              </div>
            ) : (
              projects.map((project) => (
                <div
                  key={project._id}
                  className="project-card"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '16px',
                    padding: '24px',
                    border: '1px solid rgba(93, 214, 44, 0.15)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 20px rgba(93, 214, 44, 0.05)',
                    transition: 'all 0.4s ease',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                    e.currentTarget.style.borderColor = '#5DD62C';
                    e.currentTarget.style.boxShadow = '0 12px 48px rgba(0,0,0,0.4), 0 0 60px rgba(93, 214, 44, 0.3)';
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.borderColor = 'rgba(93, 214, 44, 0.15)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3), 0 0 20px rgba(93, 214, 44, 0.05)';
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  {project.imageUrl && (
                    <div style={{
                      borderRadius: '12px',
                      overflow: 'hidden',
                      marginBottom: '16px',
                      backgroundColor: 'rgba(0,0,0,0.3)'
                    }}>
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    </div>
                  )}
                  <h3 className="project-title" style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: '8px',
                    fontFamily: "'Inter', 'Segoe UI', sans-serif"
                  }}>
                    {project.title}
                  </h3>
                  <p className="project-description" style={{
                    fontSize: '15px',
                    color: '#D1D5DB',
                    lineHeight: '1.6',
                    marginBottom: '16px',
                    flex: 1,
                    fontFamily: "'Inter', 'Segoe UI', sans-serif"
                  }}>
                    {project.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginBottom: '16px'
                  }}>
                    {project.techStack?.map((tech, idx) => (
                      <span
                        key={idx}
                        style={{
                          backgroundColor: 'rgba(93, 214, 44, 0.15)',
                          color: '#5DD62C',
                          fontSize: '12px',
                          fontWeight: '500',
                          padding: '4px 12px',
                          borderRadius: '9999px',
                          border: '1px solid rgba(93, 214, 44, 0.2)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    paddingTop: '16px'
                  }}>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        style={{
                          color: '#5DD62C',
                          fontSize: '14px',
                          fontWeight: '500',
                          textDecoration: 'none',
                          transition: 'color 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#5DD62C'}
                      >
                        🔗 Live Demo
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        style={{
                          color: '#9CA3AF',
                          fontSize: '14px',
                          fontWeight: '500',
                          textDecoration: 'none',
                          transition: 'color 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#5DD62C'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
                      >
                        🐙 GitHub
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <footer className="footer" style={{
          maxWidth: '1400px',
          margin: '0 auto',
          textAlign: 'center',
          borderTop: '1px solid rgba(93, 214, 44, 0.1)',
          padding: '24px 0',
          width: '100%',
          marginTop: 'auto'
        }}>
          <p className="footer-text" style={{ color: '#6B7280', fontSize: '14px' }}>
            © {new Date().getFullYear()} Alex Mwendwa. Built with ❤️
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Projects;