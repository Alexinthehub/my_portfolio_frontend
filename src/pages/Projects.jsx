// src/pages/Projects.jsx
import { useEffect, useState } from 'react';
import { getProjects } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Sparkles from '../components/Sparkles';

const Projects = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects()
      .then(res => setProjects(res.data.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="page-container" style={{
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
        backgroundImage: `url("/images/projects-bg.jpg")`,
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
        padding: '40px 20px',
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* === HEADER: Centered Title + Subtitle === */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            color: 'white',
            marginBottom: '8px',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
          }}>
            My Projects
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#9CA3AF',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
          }}>
            Here are the projects I have built...
          </p>
        </div>

        {/* === GLASS CONTAINER FOR CARDS === */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(12px)',
          borderRadius: '24px',
          padding: '32px',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          flex: 1,
        }}>
          {projects.length === 0 ? (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '200px',
            }}>
              <p style={{ color: '#9CA3AF', fontSize: '18px' }}>
                No projects yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="projects-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px',
            }}>
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="project-card"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '16px',
                    padding: '20px',
                    border: '1px solid rgba(255,255,255,0.06)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(93,214,44,0.3)';
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
                  }}
                >
                  {/* Project Image / Avatar */}
                  {project.imageUrl && (
                    <div style={{
                      width: '100%',
                      height: '160px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      marginBottom: '14px',
                      backgroundColor: 'rgba(0,0,0,0.3)',
                    }}>
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  <h3 className="project-title" style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: '8px',
                    fontFamily: "'Inter', 'Segoe UI', sans-serif",
                  }}>
                    {project.title}
                  </h3>
                  <p className="project-description" style={{
                    color: '#9CA3AF',
                    marginBottom: '12px',
                    fontFamily: "'Inter', 'Segoe UI', sans-serif",
                    flex: 1,
                  }}>
                    {project.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginBottom: '12px',
                  }}>
                    {project.techStack?.map((tech, idx) => (
                      <span
                        key={idx}
                        style={{
                          backgroundColor: 'rgba(93,214,44,0.1)',
                          color: '#5DD62C',
                          padding: '2px 12px',
                          borderRadius: '9999px',
                          fontSize: '12px',
                          border: '1px solid rgba(93,214,44,0.15)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#5DD62C',
                          textDecoration: 'none',
                          fontSize: '14px',
                          fontWeight: '500',
                          transition: 'color 0.3s ease',
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
                        rel="noopener noreferrer"
                        style={{
                          color: '#9CA3AF',
                          textDecoration: 'none',
                          fontSize: '14px',
                          fontWeight: '500',
                          transition: 'color 0.3s ease',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
                      >
                        🐙 Code
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ✅ NO FOOTER HERE – Layout.jsx provides it */}
    </div>
  );
};

export default Projects;