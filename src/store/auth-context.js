
import React,{useState,useEffect} from "react";

const AuthContext=React.createContext(
    
    {isLoggedIn:false,
        onLogout:()=>{},
        onLogIn:()=>{}
    });

    export const AuthContextProvider=(props)=>{

        const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    const storedValue=localStorage.getItem('isLoggedIn')
    if(storedValue=='1')
    setIsLoggedIn(true)
  },[])

        const loginHandler = (email, password) => {
            // We should of course check email and password
            // But it's just a dummy/ demo anyways
            localStorage.setItem('isLoggedIn','1')
            setIsLoggedIn(true);
          };
        
          const logoutHandler = () => {
            localStorage.removeItem('isLoggedIn')
            setIsLoggedIn(false);
          };
        return <AuthContextProvider value={{isLoggedIn:isLoggedIn,onLogout:logoutHandler,onLogIn:loginHandler}}></AuthContextProvider>
    }

export default  AuthContext;