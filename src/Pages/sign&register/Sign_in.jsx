import React, { useState } from 'react';
import './Sign_register.css'
import { authService } from '../../api/authService'; 
import { useNavigate, Link } from 'react-router-dom'; // مستوردة للانتقال وروابط الـ Sign up

/*🛑Batoul:to the front team:  working on it guys🛑*/

function Sign_in() {
  // المحافظة على الـ credentials الأصلية الخاصة بك
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  // تحديث الـ credentials عند الكتابة في الحقول
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // استدعاء دالة تسجيل الدخول حصراً بدون كتابة أي روابط (نفس كودك الأصلي)
    authService.signIn(credentials)
      .then(response => {
        // استلام الـ Token الحقيقي القادم من لارافيل وحفظه بذاكرة المتصفح
        const token = response.data.token;
        localStorage.setItem('userToken', token);
        
        // إذا كان الباك إند يرسل الـ role أيضاً، يمكنك حفظه هنا للاستفادة منه في الـ Authorization لاحقاً:
        if (response.data.role) {
            localStorage.setItem('userRole', response.data.role);
        }
        
        alert("تم تسجيل الدخول بنجاح!");
        setLoading(false);
        
        // توجيه المستخدم للوحة التحكم الرئيسية للمشروع بناءً على الـ Routes لديك
        navigate('/Home'); 
      })
      .catch(error => {
        setLoading(false);
        setError("الإيميل أو كلمة المرور غير صحيحة!");
        alert("الإيميل أو كلمة المرور غير صحيحة!");
      });
  };

  return (
   <div className="auth-page">
      <div className="auth-card auth-card--signin">
        <div className="auth-top">
          <p className="auth-welcome">
            Welcome to <span className="auth-brand">LOREM</span>
          </p>
          <p className="auth-switch">
            No Account ?
            <a href="#">Sign up</a>
          </p>
        </div>

        <h1 className="auth-title">Sign in</h1>

        <form className="auth-form">
          <div className="field">
            <label>Enter your username or email address</label>
            <input type="text" placeholder="Username or email address" />
          </div>

          <div className="field">
            <label>Enter your Password</label>
            <input type="password" placeholder="Password" />
          </div>

          <button type="button" className="auth-btn">Sign in</button>
        </form>
      </div>
    </div>
  );
}

export default Sign_in;