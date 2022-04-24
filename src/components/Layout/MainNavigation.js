import {Link, useHistory} from 'react-router-dom';

import classes from './MainNavigation.module.css';
import {useContext} from 'react';
import {AuthContext} from '../../context/auth-context';

const MainNavigation = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const logOutHandler = () => {
    history.push('/auth');
    authContext.logOut();
  };

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!authContext.isLoggedIn &&
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          }

          {authContext.isLoggedIn &&
            <>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <button onClick={logOutHandler}>Logout</button>
              </li>
            </>
          }
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
