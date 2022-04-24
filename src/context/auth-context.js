import {createContext, useState} from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userToken: null,
  logIn: (token) => {},
  logOut: () => {}
});

const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const logInHandler = (token) => {
    setUserToken(token);
    setIsLoggedIn(true);
  }
  const logOutHandler = () => {
    setUserToken(null);
    setIsLoggedIn(false);
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