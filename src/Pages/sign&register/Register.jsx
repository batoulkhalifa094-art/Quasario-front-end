import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Sign_register.css'
import { authService } from '../../api/authService';
import Sign_in from './Sign_in';

//for the validatiin:
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const TELE_REGEX = /^[0-9]{7,15}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;



function Register() {
  const navigate = useNavigate();

  const emailRef = useRef();
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);


  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [contactNumber, setContactNumber] = useState('');
  const [validConfirm, setValidConfirm] = useState(false);
  const [contactFocus, setContactFocus] = useState(false);


  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);


  useEffect(() => {
    emailRef.current.focus();
  }, [])

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email])

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user])

  useEffect(() => {
    const result = TELE_REGEX.test(contactNumber);
    setValidConfirm(result);
  }, [contactNumber])


  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
  }, [pwd])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])



  const handleRegister = async (e) => {
    e.preventDefault();

    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    const v4 = TELE_REGEX.test(contactNumber);

    if (!v1 || !v2 || !v3 || !v4) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {

      const response = await authService.register({
        username: user,
        email: email,
        password: pwd,
        phone_number: contactNumber
      });


      console.log(response.data);
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed')
      }
      errRef.current.focus();
    }


  };

  return (
    <>
      {success ? (
        <section className="auth-page">
          <div className="auth-card" style={{ textAlign: 'center' }}>
            <h1 className="auth-title" style={{ color: 'green' }}>Success!</h1>
            <p className="auth-welcome">Your account has been created successfully.</p>
            <button
              type="button"
              className="auth-btn"
              onClick={() => navigate('/Sign_in')}
            >
              Go to Sign In
            </button>
          </div>
        </section>
      ) : (
        <div className="auth-page">
          <div className="auth-card">
            <div className="auth-top">
              <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

              <p className="auth-welcome">
                Welcome to <span className="auth-brand">Quasario</span>
              </p>
              <p className="auth-switch">
                Have an Account ?
                <Link to={'./Sign_in'}>Sign in</Link>
              </p>
            </div>

            <h1 className="auth-title">
              Sign
              <br />
              up
            </h1>

            <form className="auth-form" onSubmit={handleRegister}>
              <div className="field">
                <label htmlFor="userEmail">Enter your email address</label>
                <input type="email"
                  placeholder="Email"
                  id="email"
                  ref={emailRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="emailnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
              </div>

              <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>

                Please enter a valid email address.<br />
                Example: name@example.com<br />
                Must include "@" and a valid domain extension (like .com).
              </p>


              <div className="field-row">
                <div className="field">
                  <label htmlFor="userName">User name</label>
                  <input
                    type="text"
                    placeholder="User name"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                  />
                </div>

                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>

                  4 to 24 characters.<br />
                  Must begin with a letter.<br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>


                <div className="field">
                  <label htmlFor="contactNumber">Contact Number</label>
                  <input type="tel"
                    id="contactNumber"
                    placeholder="Contact Number"
                    autoComplete="off"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    required
                    aria-invalid={validConfirm ? "false" : "true"}
                    aria-describedby="telnote"
                    onFocus={() => setContactFocus(true)}
                    onBlur={() => setContactFocus(false)} />
                </div>

                <p id="telnote" className={contactFocus && contactNumber && !validConfirm ? "instructions" : "offscreen"}>
                  7 to 15 digits allowed.<br />
                  Must contain numbers only.<br />
                  Do not include spaces, hyphens, or special characters.
                </p>

              </div>

              <div className="field">
                <label htmlFor="userPassword">Enter your Password</label>
                <input type="password"
                  placeholder="Password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
              </div>

              <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                8 to 24 characters.<br />
                Must include uppercase and lowercase letters, a number and a special character.<br />
                Allowed special characters: <span aria-label="exclamation mark">!</span>
                <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
                <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
              </p>

              <button
                type="submit"
                className="auth-btn"
                disabled={!validName || !validPwd || !validEmail || !validConfirm ? true : false}
              >
                Sign up
              </button>
            </form>
          </div>
        </div>

      )}
    </>
  );
}

export default Register
