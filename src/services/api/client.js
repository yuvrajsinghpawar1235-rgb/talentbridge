import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.talentbridge.demo/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token (Spring Security Ready)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('tb_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global Error Handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const customError = {
      message: error.response?.data?.message || 'An unexpected error occurred.',
      status: error.response?.status || 500,
    };
    return Promise.reject(customError);
  }
);

export default apiClient;