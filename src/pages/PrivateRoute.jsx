import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../context/auth-context";

export function PrivateRoute({path, ...props}){
    const { login } = useAuth();
    return login ? <Route path={ path } { ...props }/> : <Navigate state={{ from: path }} replace to="/login"/> 
}