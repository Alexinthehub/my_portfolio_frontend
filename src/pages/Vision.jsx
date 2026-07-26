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
    <div className="vision-page page-container" style={{
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
        backgroundImage: `url("/images/vision-bg.jpg")`,
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
        alignItems: 'center',
        padding: '40px 20px 0',
        boxSizing: 'border-box',
        flex: 1,
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1400px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}>
          {/* PAGE HEADER */}
          <div style={{
            textAlign: 'center',
            paddingBottom: '20px',
          }}>
            <h1 className="vision-title">
              🔭 My Vision
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#9CA3AF',
            }}>
              What I'm currently working on and what I've achieved.
            </p>
          </div>

          {/* TWO COLUMNS */}
          <div className="vision-grid-container">
            {/* LEFT: Current Projects */}
            <div style={{
              backgroundColor: 'rgba(93, 214, 44, 0.06)',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid rgba(93, 214, 44, 0.15)',
            }}>
              <h2 className="vision-section-title">
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
                        padding: '16px',
                        border: '1px solid rgba(255,255,255,0.06)',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
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
                      {/* --- IMAGE ON TOP (full width) --- */}
                      {project.imageUrl ? (
                        <div style={{
                          width: '100%',
                          height: '160px',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          marginBottom: '12px',
                          backgroundColor: 'rgba(0,0,0,0.3)',
                          flexShrink: 0,
                        }}>
                          <img
                            src={`${project.imageUrl}?t=${Date.now()}`}
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
                              e.target.style.display = 'none';
                              // fallback div
                              const parent = e.target.parentNode;
                              const fallback = document.createElement('div');
                              fallback.style.cssText = `
                                width: 100%;
                                height: 100%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                background: rgba(93,214,44,0.05);
                                color: #5DD62C;
                                font-size: 48px;
                              `;
                              fallback.innerText = '🚀';
                              parent.appendChild(fallback);
                            }}
                          />
                        </div>
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '160px',
                          borderRadius: '12px',
                          marginBottom: '12px',
                          backgroundColor: 'rgba(93,214,44,0.05)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '48px',
                          color: '#5DD62C',
                          flexShrink: 0,
                        }}>
                          🚀
                        </div>
                      )}

                      {/* --- CONTENT --- */}
                      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <h3 style={{
                          fontSize: '18px',
                          fontWeight: '600',
                          color: 'white',
                          marginBottom: '4px',
                          fontFamily: "'Inter', 'Segoe UI', sans-serif",
                          lineHeight: 1.3,
                        }}>
                          {project.title}
                        </h3>

                        <p style={{
                          fontSize: '14px',
                          color: '#9CA3AF',
                          marginBottom: '12px',
                          fontFamily: "'Inter', 'Segoe UI', sans-serif",
                          lineHeight: 1.5,
                          flex: 1,
                        }}>
                          {project.description}
                        </p>

                        {/* --- BOTTOM ROW: status + view details + star --- */}
                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '10px',
                          marginTop: 'auto',
                          borderTop: '1px solid rgba(255,255,255,0.05)',
                          paddingTop: '10px',
                        }}>
                          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
                            <span className="status-badge" style={{
                              fontSize: '12px',
                              fontWeight: '500',
                              color: project.status === 'Completed' ? '#5DD62C' :
                                     project.status === 'Beta' ? '#FBBF24' :
                                     project.status === 'Planning' ? '#60A5FA' : '#F472B6',
                              backgroundColor: 'rgba(255,255,255,0.06)',
                              padding: '3px 14px',
                              borderRadius: '9999px',
                              border: '1px solid rgba(255,255,255,0.06)',
                              display: 'inline-block',
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
                                  display: 'inline-flex',
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

                          {/* Star button */}
                          <div style={{ position: 'relative', display: 'inline-block' }}>
                            <button
                              onClick={() => handleStar(project._id)}
                              disabled={starring === project._id}
                              style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '18px',
                                cursor: starring === project._id ? 'not-allowed' : 'pointer',
                                opacity: starring === project._id ? 0.5 : 1,
                                transition: 'transform 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
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
                              <span style={{ fontSize: '18px' }}>⭐</span>
                              <span style={{ fontSize: '16px', fontWeight: '600' }}>{project.starCount || 0}</span>
                            </button>
                            <span className="tooltip-text" style={{
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
                            }}>
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

            {/* RIGHT: CERTIFICATES */}
            <div style={{
              backgroundColor: 'rgba(255, 215, 0, 0.06)',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid rgba(255, 215, 0, 0.15)',
            }}>
              <h2 className="vision-section-title">
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
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,215,0,0.3)';
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
                          {cert.imageUrl ? (
                            <img
                              src={`${cert.imageUrl}?t=${Date.now()}`}
                              alt={cert.title}
                              style={{
                                width: '56px',
                                height: '56px',
                                objectFit: 'cover',
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                flexShrink: 0,
                              }}
                              onError={(e) => {
                                e.target.style.display = 'none';
                                const parent = e.target.parentNode;
                                const fallback = document.createElement('div');
                                fallback.style.cssText = `
                                  width: 56px;
                                  height: 56px;
                                  background: rgba(255,215,0,0.12);
                                  border-radius: 12px;
                                  display: flex;
                                  align-items: center;
                                  justify-content: center;
                                  font-size: 24px;
                                  flex-shrink: 0;
                                `;
                                fallback.innerText = '🎓';
                                parent.replaceChild(fallback, e.target);
                              }}
                            />
                          ) : (
                            <div style={{
                              width: '56px',
                              height: '56px',
                              backgroundColor: 'rgba(255,215,0,0.12)',
                              borderRadius: '12px',
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

                        {cert.verifyUrl && (
                          <a
                            href={cert.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="verify-btn"
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

        {/* ✅ NO FOOTER HERE – Layout.jsx provides it */}
      </div>
    </div>
  );
};

export default Vision;