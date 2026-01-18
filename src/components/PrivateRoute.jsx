import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
 
    return token ? children : <Navigate to={`${import.meta.env.VITE_PUBLIC_URL}/login`} />;
};


export default PrivateRoute;
