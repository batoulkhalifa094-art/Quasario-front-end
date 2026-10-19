import axios from 'axios';

export default axios.create({
  // رابط سيرفر لارافيل الافتراضي مبدئيا
  baseURL: import.meta.env.VITE_API_URL, 
  timeout: 20000, // إلغاء الطلب إذا تأخر السيرفر في الرد لأكثر من 20 ثوانٍ
  withCredentials: true, 
  withXSRFToken: true,
  headers: {
    'Content-Type': 'application/json',
  }
});
