import axios from 'axios';

// Create an axios instance with custom config
const apiClient = axios.create({
    baseURL: '/api', // Adjust this base URL according to your backend API
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds
});

// Request interceptor for handling auth tokens, etc.
apiClient.interceptors.request.use(
    (config) => {
        // You can add auth tokens here if needed
        // const token = localStorage.getItem('token');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling errors globally
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle errors globally (e.g., redirect to login if 401)
        if (error.response?.status === 401) {
            // Handle unauthorized access
            console.error('Unauthorized access');
            // Redirect to login or show notification
        }
        return Promise.reject(error);
    }
);

export default apiClient;
