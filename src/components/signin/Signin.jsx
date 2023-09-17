import styles from './Signin.module.css';
import Button from '../reusable/Button';
import React, { useState } from 'react';
import { useSiteContext } from '../../SiteContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const { isLoggedIn, setIsLoggedIn } = useSiteContext();
  const [hasAccount, setHasAccount] = useState(false);
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("")
  const [registerError, setRegisterError] = useState("")

  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  })
  const [registerCredentials, setRegisterCredentials] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterCredentials((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginCredentials((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', registerCredentials);
      console.log(response.data); // You can handle the response data here
      if (response.data.error) {
        setRegisterError(response.data.error);
        return;
      }
      setHasAccount(true);
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/api/login', loginCredentials);

        if (response.data.error) {
          setLoginError(response.data.error);
          return;
        }
        const token = response.data.token; // Extract the token from the response object
        console.log(token); // Check if you're getting the token correctly
    
        // Store the token securely in the browser's localStorage
        localStorage.setItem('accessToken', token);
    
        // Update the state or context to indicate that the user is logged in
        setIsLoggedIn(true);
        navigate('/tasks');
      } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  return (
    <div className={styles.formContainer}>
      {!hasAccount ? (
      <form onSubmit={registerHandler}>
        <h1 className={styles.signinHeader}>Create an account</h1>
        {registerError && <div><p className={styles.error}>{registerError}</p><br /></div>}
        <label htmlFor="name" className={styles.label}>
          Username
        </label>
        <input type="text" name="username" className={styles.input} id="name" value={registerCredentials.username} onChange={handleRegisterChange} />
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input type="email" name="email" id="email" value={registerCredentials.email} onChange={handleRegisterChange} />
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input type="password" name="password" id="password" value={registerCredentials.password} onChange={handleRegisterChange} />
        <div className={styles.button}>
          <Button importance="secondary" text="Sign Up" />
        </div>
        <p>
          Already have an account? <span className={styles.signin_span} onClick={() => setHasAccount(true)}>Sign In</span>
        </p>
      </form>
      ) : ( 
        <form onSubmit={loginHandler} >
                <h1 className={styles.signinHeader}>Log in to your account</h1>
                {loginError && <div><p className={styles.error}>{loginError}</p><br /></div>}
                <label htmlFor="email" className={styles.label} autoComplete='email'>Email</label>
                <input type="email" name="email" id="email" value={loginCredentials.email} onChange={handleLoginChange} />
                <label htmlFor="password" className={styles.label}>Password</label>
                <input type="password" name="password" id="password" value={loginCredentials.password} onChange={handleLoginChange}/>
                <div className={styles.button}>
                    <Button importance="secondary" text="Sign in"/>
                </div>
                <p>Don't have an account? <span className={styles.signin_span} onClick={() => setHasAccount(false)}>Sign up</span></p>
                </form>            
    )}
    </div>
  );
};

export default Signin;