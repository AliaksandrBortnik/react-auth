import {createContext, useState} from 'react';

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
  const initialToken = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(!!initialToken);
  const [userToken, setUserToken] = useState(initialToken);

  const logInHandler = (token, expirationTime) => {
    setUserToken(token);
    setIsLoggedIn(true);
    localStorage.setItem('token', token);

    const remainingTime = calculateRemainingTime(expirationTime);
    // TODO: clean up timer if a user logouts manually before token's expiration time
    setTimeout(logOutHandler, remainingTime);

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