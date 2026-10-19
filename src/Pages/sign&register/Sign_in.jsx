import { useRef, useState, useEffect } from 'react';
import './Sign_register.css'
import { authService } from '../../api/authService';
import { useNavigate, Link, useLocation } from 'react-router-dom'; // مستوردة للانتقال وروابط الـ Sign up
import Register from './Register';
import useAuth from '../../hooks/useAuth';

/*🛑Batoul:to the front team:  working on it guys🛑*/

function Sign_in() {

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  

  

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await authService.signIn({
        username: user,
        password: pwd,
      });

      
      const roles = response?.data?.roles;
      setAuth({ user, roles});
      setUser('');
      setPwd('');
      navigate(from,{replace:true});

    } catch (err) {

      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 422) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed'); 
      }
      errRef.current.focus();

    }

  }



  return (

        <section className="auth-page">
          <div className="auth-card auth-card--signin">
            <div className="auth-top">
              <p className="auth-welcome">
                Welcome to <span className="auth-brand">Quasario</span>
              </p>
              <p className="auth-switch">
                No Account ?
                <Link to={'/'}>Sign up</Link>
              </p>
            </div>

            <h1 className="auth-title">Sign in</h1>

            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor='username'>Enter your username or email address</label>
                <input
                  type="text"
                  id='username'
                  placeholder="Username or email address"
                  ref={userRef}
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor='password'>Enter your Password</label>
                <input
                  type="password"
                  id='password'
                  placeholder="Password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                />
              </div>

              <button type="submit" className="auth-btn">Sign in</button>
            </form>
          </div>
        </section>
  )
}

export default Sign_in;