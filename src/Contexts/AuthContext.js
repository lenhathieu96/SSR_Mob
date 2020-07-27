import React, {useState, createContext} from 'react';

export const AuthContext = createContext(false);

export const AuthProvider = (props) => {
  const [isLogin, setLogin] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        isLogin,
        setLogin,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
