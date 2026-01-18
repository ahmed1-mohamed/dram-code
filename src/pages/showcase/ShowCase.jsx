import { memo } from "react";
import { motion } from "framer-motion";

const ShowCase = memo(function ShowCase() {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
            >
                <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
                    Showcase
                </h1>
                <p className="text-xl text-gray-300">
                    Coming Soon
                </p>
            </motion.div>
        </section>
    );
});

export default ShowCase;
