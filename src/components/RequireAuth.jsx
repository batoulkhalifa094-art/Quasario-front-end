import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({allowedRoles}) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
    auth?.roles?.find(role => allowedRoles?.includes(role))
        ? <Outlet />
        : auth?.user
            // إذا كان مسجل دخول ولكن ليس دوره، اطرده للـ Login مع رسالة تنبيه
            ? <Navigate to="/Home" state={{ from: location, message: "Access Denied: You don't have the required permissions 🛑"}} replace />
            : <Navigate to="/Sign_in" state={{ from: location }} replace />
    );

}

export default RequireAuth;
