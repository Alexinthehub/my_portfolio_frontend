// src/pages/Vision.jsx
import { useEffect, useState } from 'react';
import { getCurrentProjects, getCertificates, starCurrentProject } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Sparkles from '../components/Sparkles';

const Vision = () => {
  const [loading, setLoading] = useState(true);
  const [currentProjects, setCurrentProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [starring, setStarring] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, certsRes] = await Promise.all([
          getCurrentProjects(),
          getCertificates(),
        ]);
        setCurrentProjects(projectsRes.data.data);
        setCertificates(certsRes.data.data);
      } catch (err) {
        console.error('Error fetching vision data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStar = async (id) => {
    setStarring(id);
    try {
      const response = await starCurrentProject(id);
      setCurrentProjects(prev =>
        prev.map(p =>
          p._id === id ? { ...p, starCount: response.data.data.starCount } : p
        )
      );
    } catch (err) {
      console.error('Error starring project:', err);
    } finally {
      setStarring(null);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
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
        backgroundImage: `url("/images/vision-bg.jpg")`,
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
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
      }} />

      {/* ✨ Sparkles */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%' }}>
        <Sparkles />
      </div>

      {/* ===== CONTENT ===== */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        minHeight: '100vh',
        padding: '40px 60px 0',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}>
        
        <div style={{ flex: 1 }}>
          {/* Page Header */}
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            textAlign: 'center',
            paddingBottom: '40px',
          }}>
            <h1 className="vision-title" style={{
              fontSize: '48px',
              fontWeight: '700',
              color: 'white',
              marginBottom: '12px',
              fontFamily: "'Inter', 'Segoe UI', sans-serif",
            }}>
              🔭 My Vision
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#9CA3AF',
            }}>
              What I'm currently working on and what I've achieved
            </p>
          </div>

          {/* ===== TWO COLUMN LAYOUT ===== */}
          <div className="vision-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px',
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 16px 40px',
            width: '100%',
            boxSizing: 'border-box',
          }}>
            
            {/* ===== LEFT: Current Projects ===== */}
            <div style={{
              backgroundColor: 'rgba(93, 214, 44, 0.06)',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid rgba(93, 214, 44, 0.15)',
            }}>
              <h2 className="vision-section-title" style={{
                fontSize: '24px',
                fontWeight: '600',
                color: 'white',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
              }}>
                🚀 Current Projects
              </h2>

              {currentProjects.length === 0 ? (
                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: '16px',
                  padding: '40px',
                  textAlign: 'center',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <p style={{ color: '#6B7280' }}>No current projects yet. Check back soon!</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {currentProjects.map((project) => (
                    <div
                      key={project._id}
                      className="vision-card"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.06)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '16px',
                        padding: '20px 24px',
                        border: '1px solid rgba(255,255,255,0.06)',
                        transition: 'all 0.3s ease',
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
                      {/* Row: Project Info + Star Button */}
                      <div className="vision-card-row" style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '16px',
                      }}>
                        <div style={{ flex: 1 }}>
                          <h3 style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            color: 'white',
                            marginBottom: '4px',
                            fontFamily: "'Inter', 'Segoe UI', sans-serif",
                          }}>
                            {project.title}
                          </h3>
                          <p style={{
                            fontSize: '14px',
                            color: '#9CA3AF',
                            marginBottom: '8px',
                            fontFamily: "'Inter', 'Segoe UI', sans-serif",
                          }}>
                            {project.description}
                          </p>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                            <span className="status-badge" style={{
                              fontSize: '12px',
                              fontWeight: '500',
                              color: project.status === 'Completed' ? '#5DD62C' :
                                     project.status === 'Beta' ? '#FBBF24' :
                                     project.status === 'Planning' ? '#60A5FA' : '#F472B6',
                              backgroundColor: 'rgba(255,255,255,0.06)',
                              padding: '4px 12px',
                              borderRadius: '9999px',
                              border: '1px solid rgba(255,255,255,0.06)',
                            }}>
                              {project.status}
                            </span>
                            {project.repoUrl && project.status !== 'Completed' && (
                              <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  fontSize: '12px',
                                  color: '#5DD62C',
                                  textDecoration: 'none',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  transition: 'color 0.3s ease',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                                onMouseLeave={(e) => e.currentTarget.style.color = '#5DD62C'}
                              >
                                🔍 View Details
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Star Button */}
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          flexShrink: 0,
                          marginTop: '4px',
                        }}>
                          <div style={{ position: 'relative', display: 'inline-block' }}>
                            <button
                              onClick={() => handleStar(project._id)}
                              disabled={starring === project._id}
                              style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '22px',
                                cursor: starring === project._id ? 'not-allowed' : 'pointer',
                                opacity: starring === project._id ? 0.5 : 1,
                                transition: 'transform 0.2s ease',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: '6px',
                                color: '#FFFFFF',
                                padding: '4px 8px',
                                borderRadius: '8px',
                              }}
                              onMouseEnter={(e) => {
                                if (!starring) {
                                  e.currentTarget.style.transform = 'scale(1.1)';
                                  const tooltip = e.currentTarget.parentElement.querySelector('.tooltip-text');
                                  if (tooltip) {
                                    tooltip.style.visibility = 'visible';
                                    tooltip.style.opacity = '1';
                                  }
                                }
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                const tooltip = e.currentTarget.parentElement.querySelector('.tooltip-text');
                                if (tooltip) {
                                  tooltip.style.visibility = 'hidden';
                                  tooltip.style.opacity = '0';
                                }
                              }}
                            >
                              <span style={{ fontSize: '20px' }}>⭐</span>
                              <span style={{ fontSize: '16px', fontWeight: '600' }}>{project.starCount || 0}</span>
                            </button>
                            <span
                              className="tooltip-text"
                              style={{
                                visibility: 'hidden',
                                opacity: 0,
                                width: '140px',
                                backgroundColor: 'rgba(15,15,15,0.95)',
                                color: '#D1D5DB',
                                textAlign: 'center',
                                borderRadius: '8px',
                                padding: '6px 12px',
                                position: 'absolute',
                                zIndex: 10,
                                bottom: '115%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                transition: 'opacity 0.3s ease',
                                fontSize: '12px',
                                fontFamily: "'Inter', sans-serif",
                                border: '1px solid rgba(93,214,44,0.15)',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              Leave a ⭐ to support!
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ===== RIGHT: Certificates ===== */}
            <div style={{
              backgroundColor: 'rgba(255, 215, 0, 0.06)',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid rgba(255, 215, 0, 0.15)',
            }}>
              <h2 className="vision-section-title" style={{
                fontSize: '24px',
                fontWeight: '600',
                color: 'white',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
              }}>
                🏆 Certificates
              </h2>

              {certificates.length === 0 ? (
                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: '16px',
                  padding: '40px',
                  textAlign: 'center',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <p style={{ color: '#6B7280' }}>No certificates yet. Check back soon!</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {certificates.map((cert) => (
                    <div
                      key={cert._id}
                      className="vision-card"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.06)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '16px',
                        padding: '20px 24px',
                        border: '1px solid rgba(255,255,255,0.06)',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,215,0,0.3)';
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
                      }}
                    >
                      {/* Certificate Row */}
                      <div className="vision-card-row" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, minWidth: 0 }}>
                          {cert.imageUrl ? (
                            <img
                              src={cert.imageUrl}
                              alt={cert.title}
                              style={{
                                width: '56px',
                                height: '56px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                border: '1px solid rgba(255,255,255,0.06)',
                                flexShrink: 0,
                              }}
                            />
                          ) : (
                            <div style={{
                              width: '56px',
                              height: '56px',
                              backgroundColor: 'rgba(93,214,44,0.1)',
                              borderRadius: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '24px',
                              flexShrink: 0,
                            }}>
                              🎓
                            </div>
                          )}
                          <div style={{ minWidth: 0 }}>
                            <h3 style={{
                              fontSize: '16px',
                              fontWeight: '600',
                              color: 'white',
                              fontFamily: "'Inter', 'Segoe UI', sans-serif",
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}>
                              {cert.title}
                            </h3>
                            <p style={{
                              fontSize: '13px',
                              color: '#9CA3AF',
                              fontFamily: "'Inter', 'Segoe UI', sans-serif",
                            }}>
                              {cert.issuer} • {new Date(cert.date).toLocaleDateString()}
                            </p>
                            <span style={{
                              fontSize: '11px',
                              color: '#6B7280',
                              backgroundColor: 'rgba(255,255,255,0.04)',
                              padding: '2px 10px',
                              borderRadius: '9999px',
                            }}>
                              {cert.category}
                            </span>
                          </div>
                        </div>

                        {/* Verify Button — With class for mobile targeting */}
                        {cert.verifyUrl && (
                          <a
                            href={cert.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="verify-btn"
                            style={{
                              fontSize: '13px',
                              color: '#FFD700',
                              textDecoration: 'none',
                              padding: '6px 16px',
                              border: '1px solid rgba(255,215,0,0.3)',
                              borderRadius: '8px',
                              transition: 'all 0.3s ease',
                              whiteSpace: 'nowrap',
                              flexShrink: 0,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgba(255,215,0,0.15)';
                              e.currentTarget.style.borderColor = '#FFD700';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.borderColor = 'rgba(255,215,0,0.3)';
                            }}
                          >
                            🔍 Verify
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <footer className="footer" style={{
          maxWidth: '1400px',
          margin: '0 auto',
          textAlign: 'center',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: '24px 0',
          width: '100%',
          marginTop: 'auto',
        }}>
          <p className="footer-text" style={{ color: '#6B7280', fontSize: '14px' }}>
            © {new Date().getFullYear()} Alex Mwendwa. Built with ❤️
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Vision;