// src/services/api.js
import axios from 'axios';

// --- Create Axios Instance ---
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- INTERCEPTOR: Automatically attach token from localStorage or sessionStorage ---
api.interceptors.request.use(
  (config) => {
    // Check both storage locations
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- INTERCEPTOR: Handle 401 Unauthorized (token expired) ---
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear tokens on 401
      localStorage.removeItem('token');
      localStorage.removeItem('rememberMe');
      sessionStorage.removeItem('token');
      // Redirect to login if not already there
      if (!window.location.pathname.includes('/admin')) {
        window.location.href = '/admin';
      }
    }
    return Promise.reject(error);
  }
);

// ============================================================
//  AUTH
// ============================================================
export const adminLogin = (email, password) => api.post('/admin/login', { email, password });

// ============================================================
//  PROFILE
// ============================================================
export const getProfile = () => api.get('/profile');
export const updateProfile = (data) => api.put('/profile', data);

// ============================================================
//  PROJECTS (Portfolio)
// ============================================================
export const getProjects = () => api.get('/projects');
export const getProjectById = (id) => api.get(`/projects/${id}`);
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// ============================================================
//  CONTACT
// ============================================================
export const sendContactMessage = (data) => api.post('/contact', data);
export const getMessages = () => api.get('/contact');
export const deleteMessage = (id) => api.delete(`/contact/${id}`);
export const markMessageAsRead = (id) => api.put(`/contact/${id}/read`);

// ============================================================
//  CURRENT PROJECTS (Vision Page)
// ============================================================
export const getCurrentProjects = () => api.get('/current-projects');
export const createCurrentProject = (data) => api.post('/current-projects', data);
export const updateCurrentProject = (id, data) => api.put(`/current-projects/${id}`, data);
export const deleteCurrentProject = (id) => api.delete(`/current-projects/${id}`);
export const starCurrentProject = (id) => api.put(`/current-projects/${id}/star`);

// ============================================================
//  CERTIFICATES
// ============================================================
export const getCertificates = () => api.get('/certificates');
export const createCertificate = (data) => api.post('/certificates', data);
export const updateCertificate = (id, data) => api.put(`/certificates/${id}`, data);
export const deleteCertificate = (id) => api.delete(`/certificates/${id}`);

export default api;