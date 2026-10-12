import axios from 'axios';

const apiClient = axios.create({
  // رابط سيرفر لارافيل الافتراضي مبدئيا
  baseURL: 'http://127.0.0', 
  timeout: 20000, // إلغاء الطلب إذا تأخر السيرفر في الرد لأكثر من 20 ثوانٍ
  headers: {
    'Content-Type': 'application/json',
  }
});

export default apiClient;