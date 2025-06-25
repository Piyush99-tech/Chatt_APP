// context/AuthProvider.jsx
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
export const AuthContext = createContext();

export function AuthProvider({ children }) {


     const initialUserState =
   localStorage.getItem("ChatApp");

  // parse the user data and storing in state.
  const [authUser, setAuthUser] = useState(
    initialUserState ? JSON.parse(initialUserState) : undefined
  );
    
//   const [authUser, setAuthUser] = useState(undefined); // initially undefined

//   // ✅ Read from localStorage after first render
//   useEffect(() => {
//     const storedUser = localStorage.getItem("ChatApp");
//     if (storedUser) {
//       setAuthUser(JSON.parse(storedUser));
//     }
//   }, []);

  return (
    <AuthContext.Provider value={[ authUser, setAuthUser ]}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
