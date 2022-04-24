import {createContext, useState} from 'react';

let expirationTimer;

export const AuthContext = createContext({
  isLoggedIn: false,
  userToken: null,
  logIn: (token, lifetime) => {},
  logOut: () => {}
});

const calculateRemainingTime = (expirationTime) => {
  const now = new Date().getTime();
  const checkTime = new Date(expirationTime).getTime();
  return checkTime - now;
}

const AuthContextProvider = (props) => {
  // TODO: check if saved token is not expired before using it as initial
  const initialToken = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(!!initialToken);
  const [userToken, setUserToken] = useState(initialToken);

  const logInHandler = (token, expirationTime) => {
    setUserToken(token);
    setIsLoggedIn(true);
    localStorage.setItem('token', token);

    const remainingTime = calculateRemainingTime(expirationTime);
    expirationTimer = setTimeout(logOutHandler, remainingTime);
  }
  const logOutHandler = () => {
    setUserToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');

    expirationTimer && clearTimeout(expirationTimer);
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