import axios from 'axios';
import Cookies from 'js-cookie';

let initialToken = Cookies.get('token');

const api = axios.create({
  baseURL: 'http://localhost:5169',
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Modify the request config here, such as adding headers
    const token = Cookies.get('token');
    if (!token || token != initialToken) {
      alert('Neautorizovan pristup,molimo prijavite se!')
      Cookies.remove('token')
      window.location.href = '/prijava';
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
