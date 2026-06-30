// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Vision from './pages/Vision';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('token');
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout isAuthenticated={isAuthenticated} />}>
          <Route index element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <AdminLogin setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            isAuthenticated ? (
              <AdminDashboard setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;