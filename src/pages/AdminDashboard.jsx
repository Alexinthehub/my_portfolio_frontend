// src/pages/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getMessages,
  getProjects,
  createProject,
  deleteProject,
  updateProject,
  deleteMessage,
  getProfile,
  updateProfile,
  getCurrentProjects,
  createCurrentProject,
  deleteCurrentProject,
  updateCurrentProject,
  getCertificates,
  createCertificate,
  deleteCertificate,
  updateCertificate,
} from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Sparkles from '../components/Sparkles';

const AdminDashboard = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  // --- Projects State ---
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

  const [editingProject, setEditingProject] = useState(null);
  const [editProjectData, setEditProjectData] = useState({
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
    imageUrl: '',   // Image URL now comes after description
    status: 'In Progress',
    repoUrl: '',
  });

  const [editingCurrentProject, setEditingCurrentProject] = useState(null);
  const [editCurrentProjectData, setEditCurrentProjectData] = useState({
    title: '',
    description: '',
    imageUrl: '',   // Image URL now comes after description
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

  const [editingCertificate, setEditingCertificate] = useState(null);
  const [editCertificateData, setEditCertificateData] = useState({
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
    setIsLoggingOut(true);
    localStorage.removeItem('token');
    localStorage.removeItem('rememberMe');
    sessionStorage.removeItem('token');
    if (typeof setIsAuthenticated === 'function') {
      setIsAuthenticated(false);
    }
    try {
      navigate('/');
    } catch (err) {
      console.error('Navigate failed:', err);
    }
    setTimeout(() => {
      window.location.href = '/';
    }, 100);
  };

  // --- Fetch All Data ---
  const fetchData = async () => {
    if (isLoggingOut) return;
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
        handleLogout();
      } else {
        alert('⚠️ Failed to load some data. Please refresh the page.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      handleLogout();
      return;
    }
    fetchData();
  }, []);

  // --- Profile Update ---
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (isLoggingOut) return;
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
      await fetchData();
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
    if (isLoggingOut) return;
    setFormLoading(true);
    try {
      const techArray = newProject.techStack.split(',').map((item) => item.trim());
      await createProject({ ...newProject, techStack: techArray });
      setNewProject({ title: '', description: '', techStack: '', imageUrl: '', liveUrl: '', repoUrl: '' });
      await fetchData();
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

  const handleEditProject = (project) => {
    setEditingProject(project._id);
    setEditProjectData({
      title: project.title || '',
      description: project.description || '',
      techStack: project.techStack?.join(', ') || '',
      imageUrl: project.imageUrl || '',
      liveUrl: project.liveUrl || '',
      repoUrl: project.repoUrl || '',
    });
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    if (isLoggingOut) return;
    setFormLoading(true);
    try {
      const techArray = editProjectData.techStack.split(',').map((item) => item.trim());
      await updateProject(editingProject, { ...editProjectData, techStack: techArray });
      setEditingProject(null);
      setEditProjectData({
        title: '',
        description: '',
        techStack: '',
        imageUrl: '',
        liveUrl: '',
        repoUrl: '',
      });
      await fetchData();
      alert('✅ Project updated successfully!');
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        handleLogout();
      } else {
        alert('❌ Failed to update project.');
      }
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Delete this project?')) {
      try {
        await deleteProject(id);
        await fetchData();
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
        await fetchData();
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
    if (isLoggingOut) return;
    setFormLoading(true);
    try {
      await createCurrentProject(newCurrentProject);
      setNewCurrentProject({ title: '', description: '', imageUrl: '', status: 'In Progress', repoUrl: '' });
      await fetchData();
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

  const handleEditCurrentProject = (project) => {
    setEditingCurrentProject(project._id);
    setEditCurrentProjectData({
      title: project.title || '',
      description: project.description || '',
      imageUrl: project.imageUrl || '',
      status: project.status || 'In Progress',
      repoUrl: project.repoUrl || '',
    });
  };

  const handleUpdateCurrentProject = async (e) => {
    e.preventDefault();
    if (isLoggingOut) return;
    setFormLoading(true);
    try {
      await updateCurrentProject(editingCurrentProject, editCurrentProjectData);
      setEditingCurrentProject(null);
      setEditCurrentProjectData({
        title: '',
        description: '',
        imageUrl: '',
        status: 'In Progress',
        repoUrl: '',
      });
      await fetchData();
      alert('✅ Current project updated successfully!');
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        handleLogout();
      } else {
        alert('❌ Failed to update current project.');
      }
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteCurrentProject = async (id) => {
    if (window.confirm('Delete this current project?')) {
      try {
        await deleteCurrentProject(id);
        await fetchData();
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
    if (isLoggingOut) return;
    setFormLoading(true);
    try {
      await createCertificate(newCertificate);
      setNewCertificate({ title: '', issuer: '', date: '', category: 'Professional', imageUrl: '', verifyUrl: '' });
      await fetchData();
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

  const handleEditCertificate = (cert) => {
    setEditingCertificate(cert._id);
    setEditCertificateData({
      title: cert.title || '',
      issuer: cert.issuer || '',
      date: cert.date ? cert.date.split('T')[0] : '',
      category: cert.category || 'Professional',
      imageUrl: cert.imageUrl || '',
      verifyUrl: cert.verifyUrl || '',
    });
  };

  const handleUpdateCertificate = async (e) => {
    e.preventDefault();
    if (isLoggingOut) return;
    setFormLoading(true);
    try {
      await updateCertificate(editingCertificate, editCertificateData);
      setEditingCertificate(null);
      setEditCertificateData({
        title: '',
        issuer: '',
        date: '',
        category: 'Professional',
        imageUrl: '',
        verifyUrl: '',
      });
      await fetchData();
      alert('✅ Certificate updated successfully!');
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        handleLogout();
      } else {
        alert('❌ Failed to update certificate.');
      }
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteCertificate = async (id) => {
    if (window.confirm('Delete this certificate?')) {
      try {
        await deleteCertificate(id);
        await fetchData();
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

  // ===== RENDER =====
  return (
    <div className="admin-dashboard" style={{
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
        backgroundImage: `url("/images/admin-dashboard-bg.jpg")`,
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
      <div style={{
        position: 'relative',
        zIndex: 3,
        padding: '40px 60px 0',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ flex: 1 }}>
          {/* HEADER */}
          <div className="admin-dashboard-header" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
            maxWidth: '1400px',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '100%',
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
                transition: 'all 0.3s ease',
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

          {/* ===== EDIT PROFILE ===== */}
          <div className="admin-card" style={{
            backgroundColor: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            padding: '32px',
            border: '1px solid rgba(93, 214, 44, 0.25)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3), 0 0 30px rgba(93, 214, 44, 0.08)',
            marginBottom: '32px',
            maxWidth: '1400px',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '100%',
          }}>
            <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'white', marginBottom: '16px' }}>
              ✏️ Edit Profile & Personal Info
            </h2>
            <form className="admin-form" onSubmit={handleProfileUpdate} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
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
                  opacity: formLoading ? 0.7 : 1,
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

          {/* ===== ADD PROJECT ===== */}
          <div className="admin-card" style={{
            backgroundColor: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            padding: '32px',
            border: '1px solid rgba(93, 214, 44, 0.25)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3), 0 0 30px rgba(93, 214, 44, 0.08)',
            marginBottom: '32px',
            maxWidth: '1400px',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '100%',
          }}>
            <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'white', marginBottom: '16px' }}>
              📦 Add New Project
            </h2>
            <form className="admin-form" onSubmit={handleAddProject} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
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
                placeholder="Image URL"
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
                  opacity: formLoading ? 0.7 : 1,
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

          {/* ===== MANAGE PROJECTS ===== */}
          <div className="admin-card" style={{
            backgroundColor: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            padding: '32px',
            border: '1px solid rgba(93, 214, 44, 0.25)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3), 0 0 30px rgba(93, 214, 44, 0.08)',
            marginBottom: '32px',
            maxWidth: '1400px',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '100%',
          }}>
            <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'white', marginBottom: '16px' }}>
              📂 Manage Projects ({projects.length})
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '12px',
            }}>
              {projects.map((p) => (
                <div
                  key={p._id}
                  className="admin-messages-item"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <div>
                    <h3 style={{ color: 'white', fontWeight: '600', fontSize: '15px' }}>{p.title}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>
                      {p.techStack?.join(', ')}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleEditProject(p)}
                      style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        color: '#93C5FD',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        padding: '6px 14px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
                      }}
                    >
                      Edit
                    </button>
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
                        transition: 'all 0.3s ease',
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
                </div>
              ))}
            </div>

            {/* Edit Project Form */}
            {editingProject && (
              <div style={{
                marginTop: '24px',
                padding: '20px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                border: '1px solid rgba(59, 130, 246, 0.3)',
              }}>
                <h3 style={{ color: 'white', fontSize: '18px', marginBottom: '16px' }}>✏️ Edit Project</h3>
                <form onSubmit={handleUpdateProject} style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                }}>
                  <input
                    type="text"
                    placeholder="Title"
                    value={editProjectData.title}
                    onChange={(e) => setEditProjectData({ ...editProjectData, title: e.target.value })}
                    style={inputStyle}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={editProjectData.description}
                    onChange={(e) => setEditProjectData({ ...editProjectData, description: e.target.value })}
                    style={inputStyle}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Tech Stack (comma separated)"
                    value={editProjectData.techStack}
                    onChange={(e) => setEditProjectData({ ...editProjectData, techStack: e.target.value })}
                    style={{ ...inputStyle, gridColumn: '1 / -1' }}
                    required
                  />
                  <input
                    type="url"
                    placeholder="Image URL"
                    value={editProjectData.imageUrl}
                    onChange={(e) => setEditProjectData({ ...editProjectData, imageUrl: e.target.value })}
                    style={inputStyle}
                  />
                  <input
                    type="url"
                    placeholder="Live URL"
                    value={editProjectData.liveUrl}
                    onChange={(e) => setEditProjectData({ ...editProjectData, liveUrl: e.target.value })}
                    style={inputStyle}
                  />
                  <input
                    type="url"
                    placeholder="Repo URL"
                    value={editProjectData.repoUrl}
                    onChange={(e) => setEditProjectData({ ...editProjectData, repoUrl: e.target.value })}
                    style={inputStyle}
                  />
                  <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '12px' }}>
                    <button
                      type="submit"
                      disabled={formLoading}
                      style={{
                        backgroundColor: '#3B82F6',
                        color: 'white',
                        fontWeight: '600',
                        padding: '12px 24px',
                        borderRadius: '12px',
                        border: 'none',
                        cursor: formLoading ? 'not-allowed' : 'pointer',
                        fontSize: '15px',
                      }}
                    >
                      {formLoading ? 'Updating...' : 'Update Project'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        padding: '12px 24px',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        cursor: 'pointer',
                        fontSize: '15px',
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* ===== CONTACT MESSAGES ===== */}
          <div className="admin-card" style={{
            backgroundColor: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            padding: '32px',
            border: '1px solid rgba(93, 214, 44, 0.25)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3), 0 0 30px rgba(93, 214, 44, 0.08)',
            marginBottom: '32px',
            maxWidth: '1400px',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '100%',
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
                  <div key={m._id} style={{
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    padding: '16px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '16px',
                  }}>
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
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ===== CURRENT PROJECTS ===== */}
          <div className="admin-card" style={{
            backgroundColor: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            padding: '32px',
            border: '1px solid rgba(93, 214, 44, 0.25)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3), 0 0 30px rgba(93, 214, 44, 0.08)',
            marginBottom: '32px',
            maxWidth: '1400px',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '100%',
          }}>
            <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'white', marginBottom: '16px' }}>
              🚀 Current Projects
            </h2>

            {/* ADD CURRENT PROJECT – Image URL after Description */}
            <form onSubmit={handleAddCurrentProject} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: '24px',
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
              <input
                type="url"
                placeholder="Image URL"
                value={newCurrentProject.imageUrl}
                onChange={(e) => setNewCurrentProject({ ...newCurrentProject, imageUrl: e.target.value })}
                style={{ ...inputStyle, gridColumn: '1 / -1' }}
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
                placeholder="Repo URL"
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
                  opacity: formLoading ? 0.7 : 1,
                }}
              >
                {formLoading ? 'Adding...' : 'Add Current Project'}
              </button>
            </form>

            {/* Current Projects List */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '12px',
            }}>
              {currentProjects.map((p) => (
                <div key={p._id} style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <div>
                    <h3 style={{ color: 'white', fontWeight: '600', fontSize: '15px' }}>{p.title}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>
                      {p.status} • ⭐ {p.starCount || 0}
                    </p>
                    {p.imageUrl && (
                      <div style={{ marginTop: '4px' }}>
                        <img
                          src={`${p.imageUrl}?t=${Date.now()}`}
                          alt={p.title}
                          style={{
                            maxWidth: '50px',
                            maxHeight: '50px',
                            borderRadius: '8px',
                            objectFit: 'cover',
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleEditCurrentProject(p)}
                      style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        color: '#93C5FD',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        padding: '6px 14px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '13px',
                      }}
                    >
                      Edit
                    </button>
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
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* EDIT CURRENT PROJECT – Image URL after Description */}
            {editingCurrentProject && (
              <div style={{
                marginTop: '24px',
                padding: '20px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                border: '1px solid rgba(59, 130, 246, 0.3)',
              }}>
                <h3 style={{ color: 'white', fontSize: '18px', marginBottom: '16px' }}>✏️ Edit Current Project</h3>
                <form onSubmit={handleUpdateCurrentProject} style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                }}>
                  <input
                    type="text"
                    placeholder="Title"
                    value={editCurrentProjectData.title}
                    onChange={(e) => setEditCurrentProjectData({ ...editCurrentProjectData, title: e.target.value })}
                    style={{ ...inputStyle, gridColumn: '1 / -1' }}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={editCurrentProjectData.description}
                    onChange={(e) => setEditCurrentProjectData({ ...editCurrentProjectData, description: e.target.value })}
                    style={{ ...inputStyle, gridColumn: '1 / -1' }}
                    required
                  />
                  <input
                    type="url"
                    placeholder="Image URL"
                    value={editCurrentProjectData.imageUrl}
                    onChange={(e) => setEditCurrentProjectData({ ...editCurrentProjectData, imageUrl: e.target.value })}
                    style={{ ...inputStyle, gridColumn: '1 / -1' }}
                  />
                  <select
                    value={editCurrentProjectData.status}
                    onChange={(e) => setEditCurrentProjectData({ ...editCurrentProjectData, status: e.target.value })}
                    style={inputStyle}
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Planning">Planning</option>
                    <option value="Beta">Beta</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <input
                    type="url"
                    placeholder="Repo URL"
                    value={editCurrentProjectData.repoUrl}
                    onChange={(e) => setEditCurrentProjectData({ ...editCurrentProjectData, repoUrl: e.target.value })}
                    style={inputStyle}
                  />
                  <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '12px' }}>
                    <button
                      type="submit"
                      disabled={formLoading}
                      style={{
                        backgroundColor: '#3B82F6',
                        color: 'white',
                        fontWeight: '600',
                        padding: '12px 24px',
                        borderRadius: '12px',
                        border: 'none',
                        cursor: formLoading ? 'not-allowed' : 'pointer',
                        fontSize: '15px',
                      }}
                    >
                      {formLoading ? 'Updating...' : 'Update Current Project'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingCurrentProject(null)}
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        padding: '12px 24px',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        cursor: 'pointer',
                        fontSize: '15px',
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* ===== CERTIFICATES ===== */}
          <div className="admin-card" style={{
            backgroundColor: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            padding: '32px',
            border: '1px solid rgba(93, 214, 44, 0.25)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3), 0 0 30px rgba(93, 214, 44, 0.08)',
            marginBottom: '32px',
            maxWidth: '1400px',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '100%',
          }}>
            <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'white', marginBottom: '16px' }}>
              🏆 Certificates
            </h2>

            <form onSubmit={handleAddCertificate} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: '24px',
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
                placeholder="Image URL"
                value={newCertificate.imageUrl}
                onChange={(e) => setNewCertificate({ ...newCertificate, imageUrl: e.target.value })}
                style={{ ...inputStyle, gridColumn: '1 / -1' }}
              />
              <input
                type="url"
                placeholder="Verify URL"
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
                  opacity: formLoading ? 0.7 : 1,
                }}
              >
                {formLoading ? 'Adding...' : 'Add Certificate'}
              </button>
            </form>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '12px',
            }}>
              {certificates.map((c) => (
                <div key={c._id} style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <div>
                    <h3 style={{ color: 'white', fontWeight: '600', fontSize: '15px' }}>{c.title}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>
                      {c.issuer} • {new Date(c.date).toLocaleDateString()}
                    </p>
                    {c.imageUrl && (
                      <div style={{ marginTop: '4px' }}>
                        <img
                          src={`${c.imageUrl}?t=${Date.now()}`}
                          alt={c.title}
                          style={{
                            maxWidth: '40px',
                            maxHeight: '40px',
                            borderRadius: '6px',
                            objectFit: 'cover',
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleEditCertificate(c)}
                      style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        color: '#93C5FD',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        padding: '6px 14px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '13px',
                      }}
                    >
                      Edit
                    </button>
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
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {editingCertificate && (
              <div style={{
                marginTop: '24px',
                padding: '20px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                border: '1px solid rgba(59, 130, 246, 0.3)',
              }}>
                <h3 style={{ color: 'white', fontSize: '18px', marginBottom: '16px' }}>✏️ Edit Certificate</h3>
                <form onSubmit={handleUpdateCertificate} style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                }}>
                  <input
                    type="text"
                    placeholder="Title"
                    value={editCertificateData.title}
                    onChange={(e) => setEditCertificateData({ ...editCertificateData, title: e.target.value })}
                    style={{ ...inputStyle, gridColumn: '1 / -1' }}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Issuer"
                    value={editCertificateData.issuer}
                    onChange={(e) => setEditCertificateData({ ...editCertificateData, issuer: e.target.value })}
                    style={inputStyle}
                    required
                  />
                  <input
                    type="date"
                    placeholder="Date"
                    value={editCertificateData.date}
                    onChange={(e) => setEditCertificateData({ ...editCertificateData, date: e.target.value })}
                    style={inputStyle}
                    required
                  />
                  <select
                    value={editCertificateData.category}
                    onChange={(e) => setEditCertificateData({ ...editCertificateData, category: e.target.value })}
                    style={inputStyle}
                  >
                    <option value="Academics">Academics</option>
                    <option value="Professional">Professional</option>
                    <option value="Certification">Certification</option>
                    <option value="Award">Award</option>
                  </select>
                  <input
                    type="url"
                    placeholder="Image URL"
                    value={editCertificateData.imageUrl}
                    onChange={(e) => setEditCertificateData({ ...editCertificateData, imageUrl: e.target.value })}
                    style={{ ...inputStyle, gridColumn: '1 / -1' }}
                  />
                  <input
                    type="url"
                    placeholder="Verify URL"
                    value={editCertificateData.verifyUrl}
                    onChange={(e) => setEditCertificateData({ ...editCertificateData, verifyUrl: e.target.value })}
                    style={{ ...inputStyle, gridColumn: '1 / -1' }}
                  />
                  <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '12px' }}>
                    <button
                      type="submit"
                      disabled={formLoading}
                      style={{
                        backgroundColor: '#3B82F6',
                        color: 'white',
                        fontWeight: '600',
                        padding: '12px 24px',
                        borderRadius: '12px',
                        border: 'none',
                        cursor: formLoading ? 'not-allowed' : 'pointer',
                        fontSize: '15px',
                      }}
                    >
                      {formLoading ? 'Updating...' : 'Update Certificate'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingCertificate(null)}
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        padding: '12px 24px',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        cursor: 'pointer',
                        fontSize: '15px',
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
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