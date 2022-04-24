import classes from './ProfileForm.module.css';
import {useContext, useRef} from 'react';
import {AuthContext} from '../../context/auth-context';
import {useHistory} from 'react-router-dom';

const ProfileForm = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext)
  const token = authContext.userToken;

  const passwordInputRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const password = passwordInputRef.current.value;

    const API_KEY = 'AIzaSyDMMZM6ta3y-hnwFDUX0_CM9lrrxDre-8I';
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idToken: token,
        password,
        returnSecureToken: false
      })
    })
      .then(res => res.json())
      .then(data => {
        // TODO: update state in context
        history.replace('/');
      });
  };

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="6" ref={passwordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
