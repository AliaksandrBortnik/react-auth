import {useState, useRef, useContext} from 'react';

import classes from './AuthForm.module.css';
import {AuthContext} from '../../context/auth-context';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef= useRef();
  const authContext = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    // TODO: add validation
    setIsLoading(true);

    const API_KEY = 'AIzaSyDMMZM6ta3y-hnwFDUX0_CM9lrrxDre-8I';
    const url = isLogin ?
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`:
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      throw new Error('Something went wrong during auth');
    })
    .then(data => {
      const token = data.idToken;
      console.log(data);
      authContext.logIn();
      authContext.updateUserToken(token);
    })
    .catch(err => {
      alert(err.message);
    })
    .finally(() => setIsLoading(false));
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitFormHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={passwordInputRef} required />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Loading...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
