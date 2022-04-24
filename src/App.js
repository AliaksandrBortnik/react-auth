import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import {useContext} from 'react';
import {AuthContext} from './context/auth-context';

function App() {
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext.isLoggedIn;

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'>
          <AuthPage />
        </Route>
        {isLoggedIn &&
          <Route path='/profile'>
            <UserProfile/>
          </Route>
        }
        <Route path='*'>
          <p>Page not found!</p>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
