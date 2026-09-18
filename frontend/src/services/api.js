import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' });
api.interceptors.request.use(config => { const token = localStorage.getItem('inventory_token'); if (token) config.headers.Authorization = `Bearer ${token}`; return config; });
export const auth = { login: data => api.post('/auth/login', data), me: () => api.get('/auth/me') };
export const resources = { products: { list: q => api.get('/products', { params: { search: q } }), create: d => api.post('/products', d), update: (id, d) => api.put(`/products/${id}`, d), remove: id => api.delete(`/products/${id}`) }, customers: { list: q => api.get('/customers', { params: { search: q } }), create: d => api.post('/customers', d), update: (id, d) => api.put(`/customers/${id}`, d), remove: id => api.delete(`/customers/${id}`) }, coupons: { list: q => api.get('/coupons', { params: { search: q } }), create: d => api.post('/coupons', d), update: (id, d) => api.put(`/coupons/${id}`, d), remove: id => api.delete(`/coupons/${id}`) } };
export default api;
