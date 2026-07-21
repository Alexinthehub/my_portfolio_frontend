// src/pages/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getMessages,
  getProjects,
  createProject,
  deleteProject,
  deleteMessage,
  getProfile,
  updateProfile,
  getCurrentProjects,
  createCurrentProject,
  deleteCurrentProject,
  getCertificates,
  createCertificate,
  deleteCertificate,
} from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Sparkles from '../components/Sparkles';

const AdminDashboard = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  // --- Profile State ---
  const [profile, setProfile] = useState(null);
  const [profileForm, setProfileForm] = useState({
    name: '',
    title: '',
    bio: '',
    about: '',
    skills: '',
    languages: '',
    avatar: '',
    resumeUrl: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      discord: '',
      email: '',
    },
  });

  // --- Projects & Messages State ---
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    techStack: '',
    imageUrl: '',
    liveUrl: '',
    repoUrl: '',
  });

  // --- Current Projects State ---
  const [currentProjects, setCurrentProjects] = useState([]);
  const [newCurrentProject, setNewCurrentProject] = useState({
    title: '',
    description: '',
    status: 'In Progress',
    repoUrl: '',
  });

  // --- Certificates State ---
  const [certificates, setCertificates] = useState([]);
  const [newCertificate, setNewCertificate] = useState({
    title: '',
    issuer: '',
    date: '',
    category: 'Professional',
    imageUrl: '',
    verifyUrl: '',
  });

  const [formLoading, setFormLoading] = useState(false);

  // --- Page Loading Spinner ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // --- Logout ---
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rememberMe');
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  // --- Fetch All Data ---
  const fetchData = async () => {
    try {
      const [profileRes, messagesRes, projectsRes, currentProjectsRes, certificatesRes] = await Promise.all([
        getProfile(),
        getMessages(),
        getProjects(),
        getCurrentProjects(),
        getCertificates(),
      ]);

      const p = profileRes.data.data;
      setProfile(p);
      setProfileForm({
        name: p.name || '',
        title: p.title || '',
        bio: p.bio || '',
        about: p.about || '',
        skills: p.skills?.join(', ') || '',
        languages: p.languages?.join(', ') || '',
        avatar: p.avatar || '',
        resumeUrl: p.resumeUrl || '',
        socialLinks: {
          github: p.socialLinks?.github || '',
          linkedin: p.socialLinks?.linkedin || '',
          twitter: p.socialLinks?.twitter || '',
          discord: p.socialLinks?.discord || '',
          email: p.socialLinks?.email || '',
        },
      });
      setMessages(messagesRes.data.data);
      setProjects(projectsRes.data.data);
      setCurrentProjects(currentProjectsRes.data.data);
      setCertificates(certificatesRes.data.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('rememberMe');
        setIsAuthenticated(false);
        window.location.href = '/';
        return;
      }
      alert('⚠️ Failed to load some data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/';
      return;
    }
    fetchData();
  }, []);

  // --- Profile Update ---
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const skillsArray = profileForm.skills.split(',').map((s) => s.trim()).filter(Boolean);
      const languagesArray = profileForm.languages.split(',').map((l) => l.trim()).filter(Boolean);
      const payload = {
        ...profileForm,
        skills: skillsArray,
        languages: languagesArray,
      };
      await updateProfile(payload);
      alert('✅ Profile updated successfully!');
      fetchData();
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        handleLogout();
      } else {
        alert('❌ Failed to update profile.');
      }
    } finally {
      setFormLoading(false);
    }
  };

  // --- Project CRUD ---
  const handleAddProject = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const techArray = newProject.techStack.split(',').map((item) => item.trim());
      await createProject({ ...newProject, techStack: techArray });
      setNewProject({ title: '', description: '', techStack: '', imageUrl: '', liveUrl: '', repoUrl: '' });
      fetchData();
      alert('✅ Project added successfully!');
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        handleLogout();
      } else {
        alert('❌ Failed to add project.');
      }
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Delete this project?')) {
      try {
        await deleteProject(id);
        fetchData();
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          handleLogout();
        } else {
          alert('❌ Failed to delete project.');
        }
      }
    }
  };

  const handleDeleteMessage = async (id) => {
    if (window.confirm('Delete this message?')) {
      try {
        await deleteMessage(id);
        fetchData();
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          handleLogout();
        } else {
          alert('❌ Failed to delete message.');
        }
      }
    }
  };

  // --- Current Project CRUD ---
  const handleAddCurrentProject = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await createCurrentProject(newCurrentProject);
      setNewCurrentProject({ title: '', description: '', status: 'In Progress', repoUrl: '' });
      fetchData();
      alert('✅ Current project added successfully!');
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        handleLogout();
      } else {
        alert('❌ Failed to add current project.');
      }
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteCurrentProject = async (id) => {
    if (window.confirm('Delete this current project?')) {
      try {
        await deleteCurrentProject(id);
        fetchData();
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          handleLogout();
        } else {
          alert('❌ Failed to delete current project.');
        }
      }
    }
  };

  // --- Certificate CRUD ---
  const handleAddCertificate = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await createCertificate(newCertificate);
      setNewCertificate({ title: '', issuer: '', date: '', category: 'Professional', imageUrl: '', verifyUrl: '' });
      fetchData();
      alert('✅ Certificate added successfully!');
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        handleLogout();
      } else {
        alert('❌ Failed to add certificate.');
      }
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteCertificate = async (id) => {
    if (window.confirm('Delete this certificate?')) {
      try {
        await deleteCertificate(id);
        fetchData();
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          handleLogout();
        } else {
          alert('❌ Failed to delete certificate.');
        }
      }
    }
  };

  if (pageLoading || loading) {
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
  backgroundImage: `url("https://i.imgur.com/gZtIeHg.jpeg")`,
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

      {/* ✨ Sparkles */}
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
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
            maxWidth: '1400px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            <h1 style={{ fontSize: '32px', fontWeight: '700', color: 'white' }}>
              Admin Dashboard
            </h1>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '10px 24px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.3)';
                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              }}
            >
              Logout
            </button>
          </div>

          {/* ============================================================ */}
          {/* ✏️ EDIT PROFILE */}
          {/* ============================================================ */}
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            padding: '32px',
            border: '1px solid rgba(93, 214, 44, 0.25)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3), 0 0 30px rgba(93, 214, 44, 0.08)',
            marginBottom: '32px',
            maxWidth: '1400px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'white', marginBottom: '16px' }}>
              ✏️ Edit Profile & Personal Info
            </h2>
            <form onSubmit={handleProfileUpdate} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px'
            }}>
              <input
                type="text"
                placeholder="Name"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                style={inputStyle}
                required
              />
              <input
                type="text"
                placeholder="Title"
                value={profileForm.title}
                onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                style={inputStyle}
                required
              />
              <textarea
                placeholder="Short Bio"
                value={profileForm.bio}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                style={{ ...inputStyle, gridColumn: '1 / -1', minHeight: '60px' }}
                rows="2"
              />
              <textarea
                placeholder="About Me (Longer description)"
                value={profileForm.about}
                onChange={(e) => setProfileForm({ ...profileForm, about: e.target.value })}
                style={{ ...inputStyle, gridColumn: '1 / -1', minHeight: '80px' }}
                rows="3"
              />
              <input
                type="text"
                placeholder="Skills (comma separated)"
                value={profileForm.skills}
                onChange={(e) => setProfileForm({ ...profileForm, skills: e.target.value })}
                style={{ ...inputStyle, gridColumn: '1 / -1' }}
              />
              <input
                type="text"
                placeholder="Languages (comma separated)"
                value={profileForm.languages}
                onChange={(e) => setProfileForm({ ...profileForm, languages: e.target.value })}
                style={{ ...inputStyle, gridColumn: '1 / -1' }}
              />
              <input
                type="url"
                placeholder="Avatar Image URL"
                value={profileForm.avatar}
                onChange={(e) => setProfileForm({ ...profileForm, avatar: e.target.value })}
                style={inputStyle}
              />
              <input
                type="url"
                placeholder="Resume PDF URL"
                value={profileForm.resumeUrl}
                onChange={(e) => setProfileForm({ ...profileForm, resumeUrl: e.target.value })}
                style={inputStyle}
              />
              <input
                type="email"
                placeholder="Email (public)"
                value={profileForm.socialLinks.email}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    socialLinks: { ...profileForm.socialLinks, email: e.target.value },
                  })
                }
                style={inputStyle}
                required
              />
              <input
                type="url"
                placeholder="GitHub URL"
                value={profileForm.socialLinks.github}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    socialLinks: { ...profileForm.socialLinks, github: e.target.value },
                  })
                }
                style={inputStyle}
              />
              <input
                type="url"
                placeholder="LinkedIn URL"
                value={profileForm.socialLinks.linkedin}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    socialLinks: { ...profileForm.socialLinks, linkedin: e.target.value },
                  })
                }
                style={inputStyle}
              />
              <input
                type="url"
                placeholder="Twitter URL"
                value={profileForm.socialLinks.twitter}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    socialLinks: { ...profileForm.socialLinks, twitter: e.target.value },
                  })
                }
                style={inputStyle}
              />
              <input
                type="url"
                placeholder="Discord URL"
                value={profileForm.socialLinks.discord}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    socialLinks: { ...profileForm.socialLinks, discord: e.target.value },
                  })
                }
                style={inputStyle}
              />
              <button
                type="submit"
                disabled={formLoading}
                style={{
                  gridColumn: '1 / -1',
                  backgroundColor: '#5DD62C',
                  color: '#0F0F0F',
                  fontWeight: '600',
                  padding: '14px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '16px',
                  cursor: formLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: formLoading ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!formLoading) {
                    e.currentTarget.style.backgroundColor = '#4CAF50';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!formLoading) {
                    e.currentTarget.style.backgroundColor = '#5DD62C';
                  }
                }}
              >
                {formLoading ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>

          {/* ============================================================ */}
          {/* 📦 ADD PROJECT */}
          {/* ============================================================ */}
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            padding: '32px',
            border: '1px solid rgba(93, 214, 44, 0.25)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3), 0 0 30px rgba(93, 214, 44, 0.08)',
            marginBottom: '32px',
            maxWidth: '1400px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'white', marginBottom: '16px' }}>
              📦 Add New Project
            </h2>
            <form onSubmit={handleAddProject} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px'
            }}>
              <input
                type="text"
                placeholder="Title"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                style={inputStyle}
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                style={inputStyle}
                required
              />
              <input
                type="text"
                placeholder="Tech Stack (comma separated)"
                value={newProject.techStack}
                onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
                style={{ ...inputStyle, gridColumn: '1 / -1' }}
                required
              />
              <input
                type="url"
                placeholder="Image URL (Screenshot)"
                value={newProject.imageUrl}
                onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
                style={inputStyle}
              />
              <input
                type="url"
                placeholder="Live URL"
                value={newProject.liveUrl}
                onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                style={inputStyle}
              />
              <input
                type="url"
                placeholder="Repo URL"
                value={newProject.repoUrl}
                onChange={(e) => setNewProject({ ...newProject, repoUrl: e.target.value })}
                style={inputStyle}
              />
              <button
                type="submit"
                disabled={formLoading}
                style={{
                  gridColumn: '1 / -1',
                  backgroundColor: '#5DD62C',
                  color: '#0F0F0F',
                  fontWeight: '600',
                  padding: '14px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '16px',
                  cursor: formLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: formLoading ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!formLoading) {
                    e.currentTarget.style.backgroundColor = '#4CAF50';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!formLoading) {
                    e.currentTarget.style.backgroundColor = '#5DD62C';
                  }
                }}
              >
                {formLoading ? 'Adding...' : 'Add Project'}
              </button>
            </form>
          </div>

          {/* ============================================================ */}
          {/* 📂 MANAGE PROJECTS */}
          {/* ============================================================ */}
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            padding: '32px',
            border: '1px solid rgba(93, 214, 44, 0.25)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3), 0 0 30px rgba(93, 214, 44, 0.08)',
            marginBottom: '32px',
            maxWidth: '1400px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'white', marginBottom: '16px' }}>
              📂 Manage Projects ({projects.length})
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '12px'
            }}>
              {projects.map((p) => (
                <div
                  key={p._id}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  <div>
                    <h3 style={{ color: 'white', fontWeight: '600', fontSize: '15px' }}>{p.title}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>
                      {p.techStack?.join(', ')}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteProject(p._id)}
                    style={{
                      backgroundColor: 'rgba(239, 68, 68, 0.2)',
                      color: '#FCA5A5',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ============================================================ */}
          {/* ✉️ CONTACT MESSAGES */}
          {/* ============================================================ */}
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            padding: '32px',
            border: '1px solid rgba(93, 214, 44, 0.25)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3), 0 0 30px rgba(93, 214, 44, 0.08)',
            marginBottom: '32px',
            maxWidth: '1400px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'white', marginBottom: '16px' }}>
              ✉️ Contact Messages ({messages.length})
            </h2>
            {messages.length === 0 ? (
              <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '20px 0' }}>
                No messages yet.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {messages.map((m) => (
                  <div
                    key={m._id}
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      borderRadius: '12px',
                      padding: '16px',
                      border: '1px solid rgba(255,255,255,0.05)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '16px'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <p style={{ color: 'white', fontWeight: '600' }}>
                        {m.name} <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: '400' }}>({m.email})</span>
                      </p>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginTop: '4px' }}>
                        {m.message}
                      </p>
                      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', marginTop: '4px' }}>
                        {new Date(m.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteMessage(m._id)}
                      style={{
                        backgroundColor: 'rgba(239, 68, 68, 0.2)',
                        color: '#FCA5A5',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        padding: '6px 14px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        flexShrink: 0,
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ============================================================ */}
          {/* 🚀 CURRENT PROJECTS (Vision) */}
          {/* ============================================================ */}
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            padding: '32px',
            border: '1px solid rgba(93, 214, 44, 0.25)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3), 0 0 30px rgba(93, 214, 44, 0.08)',
            marginBottom: '32px',
            maxWidth: '1400px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'white', marginBottom: '16px' }}>
              🚀 Current Projects
            </h2>

            <form onSubmit={handleAddCurrentProject} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <input
                type="text"
                placeholder="Title"
                value={newCurrentProject.title}
                onChange={(e) => setNewCurrentProject({ ...newCurrentProject, title: e.target.value })}
                style={{ ...inputStyle, gridColumn: '1 / -1' }}
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={newCurrentProject.description}
                onChange={(e) => setNewCurrentProject({ ...newCurrentProject, description: e.target.value })}
                style={{ ...inputStyle, gridColumn: '1 / -1' }}
                required
              />
              <select
                value={newCurrentProject.status}
                onChange={(e) => setNewCurrentProject({ ...newCurrentProject, status: e.target.value })}
                style={inputStyle}
              >
                <option value="In Progress">In Progress</option>
                <option value="Planning">Planning</option>
                <option value="Beta">Beta</option>
                <option value="Completed">Completed</option>
              </select>
              <input
                type="url"
                placeholder="GitHub Repo URL (optional)"
                value={newCurrentProject.repoUrl}
                onChange={(e) => setNewCurrentProject({ ...newCurrentProject, repoUrl: e.target.value })}
                style={inputStyle}
              />
              <button
                type="submit"
                disabled={formLoading}
                style={{
                  gridColumn: '1 / -1',
                  backgroundColor: '#5DD62C',
                  color: '#0F0F0F',
                  fontWeight: '600',
                  padding: '12px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '15px',
                  cursor: formLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: formLoading ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!formLoading) {
                    e.currentTarget.style.backgroundColor = '#4CAF50';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!formLoading) {
                    e.currentTarget.style.backgroundColor = '#5DD62C';
                  }
                }}
              >
                {formLoading ? 'Adding...' : 'Add Current Project'}
              </button>
            </form>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '12px'
            }}>
              {currentProjects.length === 0 ? (
                <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '20px 0', gridColumn: '1 / -1' }}>
                  No current projects. Add one above!
                </p>
              ) : (
                currentProjects.map((p) => (
                  <div
                    key={p._id}
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      borderRadius: '12px',
                      padding: '16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}
                  >
                    <div>
                      <h3 style={{ color: 'white', fontWeight: '600', fontSize: '15px' }}>{p.title}</h3>
                      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>
                        {p.status} • ⭐ {p.starCount || 0}
                      </p>
                      {p.repoUrl && p.status !== 'Completed' && (
                        <a
                          href={p.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: '12px',
                            color: '#5DD62C',
                            textDecoration: 'none',
                            display: 'inline-block',
                            marginTop: '4px'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#5DD62C'}
                        >
                          🐙 Track Progress
                        </a>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteCurrentProject(p._id)}
                      style={{
                        backgroundColor: 'rgba(239, 68, 68, 0.2)',
                        color: '#FCA5A5',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        padding: '6px 14px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ============================================================ */}
          {/* 🏆 CERTIFICATES (Vision) */}
          {/* ============================================================ */}
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            padding: '32px',
            border: '1px solid rgba(93, 214, 44, 0.25)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3), 0 0 30px rgba(93, 214, 44, 0.08)',
            marginBottom: '32px',
            maxWidth: '1400px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'white', marginBottom: '16px' }}>
              🏆 Certificates
            </h2>

            <form onSubmit={handleAddCertificate} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <input
                type="text"
                placeholder="Title"
                value={newCertificate.title}
                onChange={(e) => setNewCertificate({ ...newCertificate, title: e.target.value })}
                style={{ ...inputStyle, gridColumn: '1 / -1' }}
                required
              />
              <input
                type="text"
                placeholder="Issuer"
                value={newCertificate.issuer}
                onChange={(e) => setNewCertificate({ ...newCertificate, issuer: e.target.value })}
                style={inputStyle}
                required
              />
              <input
                type="date"
                placeholder="Date"
                value={newCertificate.date}
                onChange={(e) => setNewCertificate({ ...newCertificate, date: e.target.value })}
                style={inputStyle}
                required
              />
              <select
                value={newCertificate.category}
                onChange={(e) => setNewCertificate({ ...newCertificate, category: e.target.value })}
                style={inputStyle}
              >
                <option value="Academics">Academics</option>
                <option value="Professional">Professional</option>
                <option value="Certification">Certification</option>
                <option value="Award">Award</option>
              </select>
              <input
                type="url"
                placeholder="Image URL (optional)"
                value={newCertificate.imageUrl}
                onChange={(e) => setNewCertificate({ ...newCertificate, imageUrl: e.target.value })}
                style={{ ...inputStyle, gridColumn: '1 / -1' }}
              />
              <input
                type="url"
                placeholder="Verify URL (optional)"
                value={newCertificate.verifyUrl}
                onChange={(e) => setNewCertificate({ ...newCertificate, verifyUrl: e.target.value })}
                style={{ ...inputStyle, gridColumn: '1 / -1' }}
              />
              <button
                type="submit"
                disabled={formLoading}
                style={{
                  gridColumn: '1 / -1',
                  backgroundColor: '#5DD62C',
                  color: '#0F0F0F',
                  fontWeight: '600',
                  padding: '12px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '15px',
                  cursor: formLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: formLoading ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!formLoading) {
                    e.currentTarget.style.backgroundColor = '#4CAF50';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!formLoading) {
                    e.currentTarget.style.backgroundColor = '#5DD62C';
                  }
                }}
              >
                {formLoading ? 'Adding...' : 'Add Certificate'}
              </button>
            </form>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '12px'
            }}>
              {certificates.length === 0 ? (
                <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '20px 0', gridColumn: '1 / -1' }}>
                  No certificates. Add one above!
                </p>
              ) : (
                certificates.map((c) => (
                  <div
                    key={c._id}
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      borderRadius: '12px',
                      padding: '16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}
                  >
                    <div>
                      <h3 style={{ color: 'white', fontWeight: '600', fontSize: '15px' }}>{c.title}</h3>
                      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>
                        {c.issuer} • {new Date(c.date).toLocaleDateString()}
                      </p>
                      {c.verifyUrl && (
                        <a
                          href={c.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: '12px',
                            color: '#5DD62C',
                            textDecoration: 'none',
                            display: 'inline-block',
                            marginTop: '4px'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#5DD62C'}
                        >
                          🔍 Verify
                        </a>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteCertificate(c._id)}
                      style={{
                        backgroundColor: 'rgba(239, 68, 68, 0.2)',
                        color: '#FCA5A5',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        padding: '6px 14px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
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
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
              © {new Date().getFullYear()} Alex Mwendwa. Built with ❤️
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

// ===== Reusable Input Style =====
const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.15)',
  backgroundColor: 'rgba(255,255,255,0.06)',
  color: 'white',
  fontSize: '15px',
  outline: 'none',
  transition: 'all 0.3s ease',
  boxSizing: 'border-box',
};

export default AdminDashboard;