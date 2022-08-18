import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);
    const [loggedin, setLoggedin] = useState(false);
    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist,loggedin,setLoggedin }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;