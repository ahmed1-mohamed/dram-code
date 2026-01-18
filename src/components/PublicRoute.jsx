import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    return token ? <Navigate to={`${import.meta.env.VITE_PUBLIC_URL}/main`} /> : children;
};

export default PublicRoute;
