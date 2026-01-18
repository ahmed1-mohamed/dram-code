import { ArrowLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from 'prop-types';


const Error = ({ error, message }) => {
    const navigate = useNavigate();
    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-screen bg-gray-100"
        >
            <div className="text-center">
                <h1 className="text-6xl font-bold text-pink-500 mb-4">
                    {error?.status || "Error"}
                </h1>
                <p className="text-gray-700 text-lg">{message}</p>
                <button
                    className="mt-6 px-4 py-2 text-white bg-pink-500 hover:bg-pink-600 rounded-lg"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft className="inline-block mr-2" />
                    Go Back
                </button>
            </div>
        </motion.div>
    );

}

Error.propTypes = {
    error: PropTypes.shape({
        status: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    message: PropTypes.string.isRequired,
};

export default Error
