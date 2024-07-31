import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState,useContext, useEffect } from "react";
import {auth} from '../../firebase/firebase'
const UserContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user,setUser] = useState({
        UID: null,
        UserName: null,
        Weight: null,
        Height: null,
        GoalId: null,
        RecommendID: null
    })

    const updateUser = (userInfo) => {
        setUser(userInfo);
      };
    
      useEffect(() => {
        // Load user info from localStorage on component mount
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }, []);
    
      // Save user info to localStorage whenever user state changes
      useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
      }, [user]);

    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}