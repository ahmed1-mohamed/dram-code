import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Menu, X, Sparkles, Home, Briefcase, ImageIcon, Users, Mail } from "lucide-react";
import { useState, useEffect, useMemo, memo } from "react";
import { useTranslation } from "react-i18next";
import image from "../../../../src/images/gfx/Vector.png";

const Header = memo(function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const { t, i18n } = useTranslation();

    const navLinks = useMemo(() => [
        { name: "Home", path: "/", icon: Home },
        { name: "Work", path: "/work", icon: Briefcase },
        { name: "ShowCase", path: "/showcase", icon: ImageIcon },
        { name: "Crew", path: "/crew", icon: Users },
        { name: "Connect", path: "/connect", icon: Mail }
    ], []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const switchLang = () => {
        i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
    };

    const handleNavigate = (path) => {
        navigate(path);
        setOpen(false);
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-gray-900/80 backdrop-blur-xl shadow-2xl shadow-purple-500/10"
                : "bg-transparent"
                }`}
        >
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>

            <div className="container mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
                <div className="flex items-center justify-between py-3 sm:py-4 lg:py-5">

                    <div className="flex items-center gap-2 sm:gap-3">
                        <motion.button
                            onClick={switchLang}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="md:hidden flex items-center gap-2 px-2.5 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 group"
                        >
                            <Globe className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                            <span className="text-xs">
                                {i18n.language === "en" ? "AR" : "EN"}
                            </span>
                        </motion.button>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 cursor-pointer group"
                            onClick={() => handleNavigate("/")}
                        >
                            <div className="relative">
                                <motion.div
                                    animate={{
                                        rotate: [0, 360],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"
                                />
                                <img
                                    src={image}
                                    alt="Logo"
                                    className="relative w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 object-contain drop-shadow-2xl"
                                />
                            </div>
                            <h1 className="hidden sm:block text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                                {t("brand")}
                            </h1>
                        </motion.div>
                    </div>

                    <div className="flex items-center gap-3">
                        <motion.button
                            onClick={switchLang}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden md:flex items-center gap-2 px-3 lg:px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 group"
                        >
                            <Globe className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                            <span className="text-sm">
                                {i18n.language === "en" ? "AR" : "EN"}
                            </span>
                        </motion.button>

                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            className="hidden md:block relative z-50 p-1.5 sm:p-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                            onClick={() => setOpen(!open)}
                        >
                            <AnimatePresence mode="wait">
                                {open ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X size={20} className="sm:w-6 sm:h-6" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu size={20} className="sm:w-6 sm:h-6" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </div>


            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="hidden md:block overflow-hidden bg-gray-900/95 backdrop-blur-xl border-t border-purple-500/20"
                    >
                        <motion.nav
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                            className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-1 sm:space-y-2"
                        >
                            {navLinks.map((link, index) => {
                                const isActive = location.pathname === link.path;
                                return (
                                    <motion.button
                                        key={link.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => handleNavigate(link.path)}
                                        className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 ${isActive
                                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                                            : "text-gray-300 hover:bg-white/5 hover:text-white"
                                            }`}
                                    >
                                        {t(link.name)}
                                    </motion.button>
                                );
                            })}
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.nav
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-2xl border-t border-purple-500/30 shadow-lg shadow-purple-500/20 safe-area-inset-bottom"
            >
                <div className="relative">
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

                    <div className="grid grid-cols-5 gap-0.5 sm:gap-1 px-1 sm:px-2 py-2 sm:py-3">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = location.pathname === link.path;

                            return (
                                <motion.button
                                    key={link.name}
                                    onClick={() => handleNavigate(link.path)}
                                    whileTap={{ scale: 0.9 }}
                                    className="relative flex flex-col items-center justify-center gap-0.5 sm:gap-1 py-1.5 sm:py-2 px-1"
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="bottomNav"
                                            className="absolute inset-0 bg-gradient-to-t from-purple-600/30 to-pink-600/30 rounded-lg sm:rounded-xl"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}

                                    <div className="relative">
                                        <Icon
                                            className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${isActive
                                                ? "text-purple-400 scale-110"
                                                : "text-gray-400"
                                                }`}
                                        />
                                        {isActive && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                                            />
                                        )}
                                    </div>

                                    <span className={`text-[9px] sm:text-[10px] font-semibold transition-all duration-300 text-center leading-tight ${isActive
                                        ? "text-white"
                                        : "text-gray-500"
                                        }`}>
                                        {t(link.name)}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </motion.nav>
        </motion.header>
    );
});

export default Header;
