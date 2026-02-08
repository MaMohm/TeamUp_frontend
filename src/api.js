import axios from 'axios';

// Helper to ensure base URL ends with /api
const getBaseUrl = () => {
    let url = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    // If the user provided a URL that doesn't end in /api, append it
    if (!url.endsWith('/api')) {
        // Remove trailing slash if exists before appending
        if (url.endsWith('/')) {
            url = url.slice(0, -1);
        }
        url += '/api';
    }
    return url;
};

const api = axios.create({
    baseURL: getBaseUrl(),
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
