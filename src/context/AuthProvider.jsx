import { createContext, useState, useEffect } from "react";
import { authService } from "../api/authService";

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        authService.getUser()
            .then(res => setAuth({ user: res.data.username, roles: res.data.roles }))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);


    return (
        <AuthContext.Provider value={{ auth, setAuth, loading }} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;