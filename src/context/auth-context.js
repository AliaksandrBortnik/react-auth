import {createContext, useState} from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userToken: null,
  logIn: () => {},
  logOut: () => {},
  updateUserToken: () => {}
});

const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const logInHandler = () => setIsLoggedIn(true);
  const logOutHandler = () => setIsLoggedIn(false);
  const updateUserTokenHandler = (token) => setUserToken(token);

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      userToken,
      logIn: logInHandler,
      logOut: logOutHandler,
      updateUserToken: updateUserTokenHandler
    }}>
      {props.children}
    </AuthContext.Provider>
  )
};

export default AuthContextProvider;