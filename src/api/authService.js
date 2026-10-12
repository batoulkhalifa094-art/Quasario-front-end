import apiClient from './apiClient'; 

export const authService = {
  
  // 1. دالة إنشاء حساب جديد (تستقبل الاسم والإيميل والباسورد بداخل كائن userData)
  register: (userData) => {
    return apiClient.post('/register', userData); // الرابط الفعلي المتولد: http://127.0.0
  },

  // 2. دالة تسجيل الدخول (تستقبل الإيميل والباسورد بداخل كائن credentials)
  signIn: (credentials) => {
    return apiClient.post('/login', credentials); // الرابط الفعلي المتولد: http://127.0.0
  }
  
};