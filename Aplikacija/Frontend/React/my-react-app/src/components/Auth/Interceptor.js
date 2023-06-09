import axios from 'axios';
import Cookies from 'js-cookie';
import { obavestenja } from '../UI/Obavestenja';

let initialToken = Cookies.get('token');

const api = axios.create({
  baseURL: 'http://localhost:5169',
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (!token || token != initialToken) {
      obavestenja('Greska prilikom zahteva,molimo prijavite se!','danger')
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
