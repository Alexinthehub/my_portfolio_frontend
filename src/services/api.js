// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- INTERCEPTOR: Automatically attach token ---
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Auth ---
export const adminLogin = (email, password) => api.post('/admin/login', { email, password });

// --- Profile ---
export const getProfile = () => api.get('/profile');
export const updateProfile = (data) => api.put('/profile', data);

// --- Projects (Portfolio) ---
export const getProjects = () => api.get('/projects');
export const getProjectById = (id) => api.get(`/projects/${id}`);
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);


// --- Contact ---
export const sendContactMessage = (data) => api.post('/contact', data);
export const getMessages = () => api.get('/contact');
export const deleteMessage = (id) => api.delete(`/contact/${id}`);
export const markMessageAsRead = (id) => api.put(`/contact/${id}/read`);

// --- 🚀 Current Projects (Vision) ---
export const getCurrentProjects = () => api.get('/current-projects');
export const createCurrentProject = (data) => api.post('/current-projects', data);
export const deleteCurrentProject = (id) => api.delete(`/current-projects/${id}`);
export const updateCurrentProject = (id, data) => api.put(`/current-projects/${id}`, data); 
export const starCurrentProject = (id) => api.put(`/current-projects/${id}/star`);


// --- 🏆 Certificates (Vision) ---
export const getCertificates = () => api.get('/certificates');
export const createCertificate = (data) => api.post('/certificates', data);
export const updateCertificate = (id, data) => api.put(`/certificates/${id}`, data);
export const deleteCertificate = (id) => api.delete(`/certificates/${id}`);

export default api;