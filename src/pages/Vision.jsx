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
        console.log('RAW CERTIFICATES FROM API:', certsRes.data.data);
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
              width: '100%',
              boxSizing: 'border-box',
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
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
                        overflow: 'visible',
                        position: 'relative',
                        width: '100%',
                        boxSizing: 'border-box',
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
                      {/* IMAGE */}
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
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            onError={(e) => {
                              e.target.style.display = 'none';
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

                      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%' }}>
                        <h3 style={{
                          fontSize: '18px',
                          fontWeight: '600',
                          color: 'white',
                          marginBottom: '4px',
                          fontFamily: "'Inter', 'Segoe UI', sans-serif",
                          lineHeight: 1.3,
                          overflowWrap: 'break-word',
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
                          overflowWrap: 'break-word',
                        }}>
                          {project.description}
                        </p>

                        {/* BOTTOM ROW */}
                        <div className="vision-bottom-row" style={{
                          display: 'flex',
                          flexWrap: 'nowrap',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '6px',
                          marginTop: 'auto',
                          borderTop: '1px solid rgba(255,255,255,0.05)',
                          paddingTop: '10px',
                          width: '100%',
                          minWidth: '0',
                        }}>
                          <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            gap: '6px',
                            flex: '1 1 auto',
                            minWidth: '0',
                          }}>
                            <span className="status-badge" style={{
                              fontSize: '12px',
                              fontWeight: '500',
                              color: project.status === 'Completed' ? '#5DD62C' :
                                     project.status === 'Beta' ? '#FBBF24' :
                                     project.status === 'Planning' ? '#60A5FA' : '#F472B6',
                              backgroundColor: 'rgba(255,255,255,0.06)',
                              padding: '3px 12px',
                              borderRadius: '9999px',
                              border: '1px solid rgba(255,255,255,0.06)',
                              display: 'inline-block',
                              whiteSpace: 'nowrap',
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
                                  gap: '3px',
                                  transition: 'color 0.3s ease',
                                  whiteSpace: 'nowrap',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                                onMouseLeave={(e) => e.currentTarget.style.color = '#5DD62C'}
                              >
                                🔍 View Details
                              </a>
                            )}
                          </div>

                          <div className="star-wrapper" style={{
                            position: 'relative',
                            display: 'inline-flex',
                            flexShrink: 0,
                            alignItems: 'center',
                            marginLeft: 'auto',
                          }}>
                            <button
                              onClick={() => handleStar(project._id)}
                              disabled={starring === project._id}
                              style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '16px',
                                cursor: starring === project._id ? 'not-allowed' : 'pointer',
                                opacity: starring === project._id ? 0.5 : 1,
                                transition: 'transform 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '3px',
                                color: '#FFFFFF',
                                padding: '2px 6px',
                                borderRadius: '8px',
                                whiteSpace: 'nowrap',
                              }}
                              onMouseEnter={(e) => {
                                if (!starring) e.currentTarget.style.transform = 'scale(1.1)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                              }}
                            >
                              <span style={{ fontSize: '16px' }}>⭐</span>
                              <span style={{ fontSize: '14px', fontWeight: '600' }}>{project.starCount || 0}</span>
                            </button>
                            <span className="tooltip-text">
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

            {/* RIGHT: CERTIFICATES – FIXED LAYOUT */}
            <div style={{
              backgroundColor: 'rgba(255, 215, 0, 0.06)',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid rgba(255, 215, 0, 0.15)',
              width: '100%',
              boxSizing: 'border-box',
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                  {certificates.map((cert) => {
                    console.log('Rendering certificate:', cert);
                    return (
                      <div
                        key={cert._id}
                        className="vision-card"
                        style={{
                          width: '100%',
                          boxSizing: 'border-box',
                          padding: '16px 20px',
                          backgroundColor: 'rgba(255,255,255,0.08)',
                          backdropFilter: 'blur(8px)',
                          borderRadius: '12px',
                          border: '1px solid rgba(255,255,255,0.08)',
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(255,215,0,0.3)';
                          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                          width: '100%',
                        }}>
                          {/* IMAGE */}
                          {cert.imageUrl && (
                            <img
                              src={`${cert.imageUrl}?t=${Date.now()}`}
                              alt={cert.title}
                              style={{
                                width: '60px',
                                height: '60px',
                                objectFit: 'cover',
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                flexShrink: 0,
                              }}
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          )}
                          {/* TEXT - ALWAYS VISIBLE */}
                          <div style={{
                            flex: 1,
                            minWidth: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2px',
                          }}>
                            <div style={{
                              fontSize: '18px',
                              fontWeight: '600',
                              color: '#FFFFFF',
                              fontFamily: "'Inter', 'Segoe UI', sans-serif",
                              wordBreak: 'break-word',
                              lineHeight: 1.3,
                            }}>
                              {cert.title}
                            </div>
                            <div style={{
                              fontSize: '15px',
                              color: '#9CA3AF',
                              fontFamily: "'Inter', 'Segoe UI', sans-serif",
                              wordBreak: 'break-word',
                            }}>
                              {cert.issuer}
                              {cert.date && ` • ${new Date(cert.date).toLocaleDateString()}`}
                            </div>
                            {cert.category && (
                              <span style={{
                                fontSize: '12px',
                                color: '#6B7280',
                                backgroundColor: 'rgba(255,255,255,0.06)',
                                padding: '2px 12px',
                                borderRadius: '9999px',
                                display: 'inline-block',
                                alignSelf: 'flex-start',
                                marginTop: '2px',
                              }}>
                                {cert.category}
                              </span>
                            )}
                          </div>
                          {/* VERIFY BUTTON */}
                          {cert.verifyUrl && (
                            <a
                              href={cert.verifyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                whiteSpace: 'nowrap',
                                flexShrink: 0,
                                fontSize: '13px',
                                color: '#ffd700',
                                textDecoration: 'none',
                                padding: '6px 16px',
                                border: '1px solid rgba(255,215,0,0.3)',
                                borderRadius: '8px',
                                transition: 'all 0.3s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255,215,0,0.15)';
                                e.currentTarget.style.borderColor = '#ffd700';
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
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vision;