import axios from './axios'; 

export const authService = {
  
  // 1. دالة إنشاء حساب جديد (تستقبل الاسم والإيميل والباسورد بداخل كائن userData)
  register: async (userData) => {
        await axios.get('/sanctum/csrf-cookie'); //ضرورية كرمال فكرة الكوكيز تبع sanctum بالباك
        return axios.post('/register', userData);// الرابط الفعلي المتولد: http://127.0.0
  },

  // 2. دالة تسجيل الدخول (تستقبل الإيميل والباسورد بداخل كائن credentials)
  signIn: async (credentials) => {
        await axios.get('/sanctum/csrf-cookie'); 
        return axios.post('/login', credentials);// الرابط الفعلي المتولد: http://127.0.0
  }
  
};



