import { createContext, useState } from "react";

export const AuthContext = createContext(null);

let initialState = {
  isLoggedIn: false,
  isLoginPending: false,
  loginError: null,
  user: null

}

//@ts-ignore
export const ContextProvider = props => {
  //@ts-ignore
  const auth = JSON.parse(sessionStorage.getItem('__auth__'))
  if(auth && auth.isLoggedIn) {
    //@ts-ignore
    initialState = auth;
  }
  const [state, setState] = useState(initialState);
  //@ts-ignore
  window.__auth__ = state;

    //@ts-ignore
  const login = (user) => {
    //@ts-ignore
    sessionStorage.setItem('__auth__', JSON.stringify({isLoggedIn: true, user: user}))
     //@ts-ignore
    setState({isLoggedIn: true, user: user});
  }

  const logout = () => {
     //@ts-ignore
     sessionStorage.setItem('__auth__', null);
       //@ts-ignore
    setState({isLoggedIn: false, user: null});
   
     
    
  }


  return (
    <AuthContext.Provider
      //@ts-ignore
      value={{
        state,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

