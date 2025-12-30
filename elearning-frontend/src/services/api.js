import axios from 'axios';
import keycloak from '../Keycloak';

const api = axios.create({
    baseURL: 'http://localhost:8081/api'
});

api.interceptors.request.use((config) => {
    if (keycloak.token) {
        config.headers.Authorization = `Bearer ${keycloak.token}`;
    }
    return config;
});

// --- COURSES ---
export const getCourses = () => api.get('/courses');
export const saveCourse = (course) => api.post('/courses', course);
export const updateCourse = (id, course) => api.put(`/courses/${id}`, course);
export const deleteCourse = (id) => api.delete(`/courses/${id}`);

// --- INSTRUCTORS ---
export const getInstructors = () => api.get('/instructors');
export const saveInstructor = (inst) => api.post('/instructors', inst);
export const deleteInstructor = (id) => api.delete(`/instructors/${id}`);

export default api;