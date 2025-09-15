import axios, { AxiosResponse, AxiosError } from 'axios';

// API base configuration
// Use relative URLs when running with proxy, fallback to direct URL
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API response interface
interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any[];
}

// API service functions
export const apiService = {
  // Auth endpoints
  auth: {
    register: (data: any) => api.post<ApiResponse>('/auth/register', data),
    login: (data: any) => api.post<ApiResponse>('/auth/login', data),
    getMe: () => api.get<ApiResponse>('/auth/me'),
    updateProfile: (data: any) => api.put<ApiResponse>('/auth/profile', data),
    changePassword: (data: any) => api.put<ApiResponse>('/auth/change-password', data),
    logout: () => api.post<ApiResponse>('/auth/logout'),
  },

  // Products endpoints
  products: {
    getAll: (params?: any) => api.get<ApiResponse>('/products', { params }),
    getById: (id: string) => api.get<ApiResponse>(`/products/${id}`),
    create: (data: any) => api.post<ApiResponse>('/products', data),
    update: (id: string, data: any) => api.put<ApiResponse>(`/products/${id}`, data),
    delete: (id: string) => api.delete<ApiResponse>(`/products/${id}`),
    addReview: (id: string, data: any) => api.post<ApiResponse>(`/products/${id}/reviews`, data),
    getCategories: () => api.get<ApiResponse>('/products/categories/list'),
  },

  // Orders endpoints
  orders: {
    create: (data: any) => api.post<ApiResponse>('/orders', data),
    getAll: (params?: any) => api.get<ApiResponse>('/orders', { params }),
    getById: (id: string) => api.get<ApiResponse>(`/orders/${id}`),
    updateStatus: (id: string, data: any) => api.put<ApiResponse>(`/orders/${id}/status`, data),
    addNote: (id: string, data: any) => api.post<ApiResponse>(`/orders/${id}/notes`, data),
    submitFeedback: (id: string, data: any) => api.post<ApiResponse>(`/orders/${id}/feedback`, data),
    getStats: () => api.get<ApiResponse>('/orders/stats/overview'),
  },

  // Users endpoints
  users: {
    getAll: (params?: any) => api.get<ApiResponse>('/users', { params }),
    getById: (id: string) => api.get<ApiResponse>(`/users/${id}`),
    updateRole: (id: string, data: any) => api.put<ApiResponse>(`/users/${id}/role`, data),
    updateVerification: (id: string, data: any) => api.put<ApiResponse>(`/users/${id}/verify`, data),
    delete: (id: string) => api.delete<ApiResponse>(`/users/${id}`),
    getStats: () => api.get<ApiResponse>('/users/stats/overview'),
  },

  // Messages endpoints
  messages: {
    create: (data: any) => api.post<ApiResponse>('/messages', data),
    getAll: (params?: any) => api.get<ApiResponse>('/messages', { params }),
    getById: (id: string) => api.get<ApiResponse>(`/messages/${id}`),
    updateStatus: (id: string, data: any) => api.put<ApiResponse>(`/messages/${id}/status`, data),
    assign: (id: string, data: any) => api.put<ApiResponse>(`/messages/${id}/assign`, data),
    addResponse: (id: string, data: any) => api.post<ApiResponse>(`/messages/${id}/responses`, data),
    delete: (id: string) => api.delete<ApiResponse>(`/messages/${id}`),
    getStats: () => api.get<ApiResponse>('/messages/stats/overview'),
  },

  // File uploads
  upload: {
    productImages: (formData: FormData) => 
      api.post<ApiResponse>('/upload/product-images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }),
    avatar: (formData: FormData) => 
      api.post<ApiResponse>('/upload/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }),
    messageAttachments: (formData: FormData) => 
      api.post<ApiResponse>('/upload/message-attachments', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }),
  },
};

export default api;
export type { ApiResponse };