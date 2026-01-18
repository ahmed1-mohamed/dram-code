import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LanguagesIcon, Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import image from "../../../../src/images/gfx/Vector.png";

const navLinks = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: "ShowCase", path: "/showcase" },
    { name: "Crew", path: "/crew" },
    { name: "Connect", path: "/connect" }
];

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const { t, i18n } = useTranslation();

    const switchLang = () => {
        i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
    };

    const handleNavigate = (path) => {
        navigate(path);
        setOpen(false);
    };

    return (
        <header className="bg-[#111827] sticky top-0 z-50 shadow-md">
            <div className="container mx-auto max-w-7xl flex items-center justify-between py-4 px-4">

                <div
                    className="flex items-center cursor-pointer"
                    onClick={() => handleNavigate("/")}
                >
                    <img src={image} alt="Logo" className="w-8 h-8 mr-2" />
                    <h1 className="text-2xl font-bold text-white">
                        {t("brand")}
                    </h1>
                </div>

                <nav className="hidden md:flex gap-8">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path;

                        return (
                            <motion.button
                                key={link.name}
                                onClick={() => handleNavigate(link.path)}
                                whileHover={{ scale: 1.05 }}
                                className={`text-lg font-medium transition-all duration-200 pb-1 ${isActive
                                    ? "text-[#FE4EEE] border-b-2 border-[#FE4EEE]"
                                    : "text-gray-300 hover:text-[#FE4EEE]"
                                    }`}
                            >
                                {t(link.name)}
                            </motion.button>
                        );
                    })}
                </nav>
                <div className="flex items-center text-white gap-1">
                    <LanguagesIcon />
                    <button
                        onClick={switchLang}
                        className="hidden md:block text-white px-3 py-1  rounded-lg hover:bg-white hover:text-black transition"
                    >
                        {i18n.language === "en" ? "AR" : "EN"}
                    </button>
                </div>

                <button
                    className="md:hidden text-white"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {open && (
                <motion.nav
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="md:hidden bg-[#111827] border-t border-gray-700"
                >
                    <div className="flex flex-col gap-4 py-4 px-4">

                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;

                            return (
                                <button
                                    key={link.name}
                                    onClick={() => handleNavigate(link.path)}
                                    className={`text-left text-lg font-medium py-2 ${isActive
                                        ? "text-[#FE4EEE]"
                                        : "text-gray-300 hover:text-[#FE4EEE]"
                                        }`}
                                >
                                    {t(link.name)}
                                </button>
                            );
                        })}

                        {/* Mobile Language Switch */}
                        <button
                            onClick={switchLang}
                            className="text-left text-lg text-white py-2 border-t border-gray-600 pt-4"
                        >
                            {i18n.language === "en" ? "العربية" : "English"}
                        </button>

                    </div>
                </motion.nav>
            )}
        </header>
    );
}
