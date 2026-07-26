// src/pages/Vision.jsx – MINIMAL TEST VERSION
import { useEffect, useState } from 'react';
import { getCurrentProjects, getCertificates, starCurrentProject } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Vision = () => {
  const [loading, setLoading] = useState(true);
  const [currentProjects, setCurrentProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, certsRes] = await Promise.all([
          getCurrentProjects(),
          getCertificates(),
        ]);
        setCurrentProjects(projectsRes.data.data);
        setCertificates(certsRes.data.data);
        console.log('Certificate data:', certsRes.data.data);
      } catch (err) {
        console.error('Error fetching vision data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div style={{ padding: '20px', color: 'white', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🔭 My Vision</h1>

      <h2>🚀 Current Projects</h2>
      {currentProjects.map(p => (
        <div key={p._id} style={{ border: '1px solid #333', margin: '10px 0', padding: '10px', borderRadius: '8px' }}>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <p>Status: {p.status}</p>
          <p>⭐ {p.starCount || 0}</p>
        </div>
      ))}

      <h2>🏆 Certificates</h2>
      {certificates.map(cert => (
        <div key={cert._id} style={{ border: '1px solid #555', margin: '10px 0', padding: '10px', borderRadius: '8px' }}>
          <h3>{cert.title}</h3>
          <p>{cert.issuer} • {new Date(cert.date).toLocaleDateString()}</p>
          <p>Category: {cert.category}</p>
          {cert.verifyUrl && <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#ffd700' }}>🔍 Verify</a>}
        </div>
      ))}
    </div>
  );
};

export default Vision;