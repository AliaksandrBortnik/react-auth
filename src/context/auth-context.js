import {createContext, useState} from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userToken: null,
  logIn: (token) => {},
  logOut: () => {}
});

const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(!!initialToken);
  const [userToken, setUserToken] = useState(initialToken);

  const logInHandler = (token) => {
    setUserToken(token);
    setIsLoggedIn(true);
    localStorage.setItem('token', token);
  }
  const logOutHandler = () => {
    setUserToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  }

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      userToken,
      logIn: logInHandler,
      logOut: logOutHandler
    }}>
      {props.children}
    </AuthContext.Provider>
  )
};

export default AuthContextProvider;