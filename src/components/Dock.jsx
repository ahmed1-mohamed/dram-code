import { motion } from "framer-motion";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
    Home,
    Briefcase,
    ImageIcon,
    Users,
    Mail,
} from "lucide-react";
import image from "../../src/images/gfx/Vector.png";

const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Work", path: "/work", icon: Briefcase },
    { name: "ShowCase", path: "/showcase", icon: ImageIcon },
    { name: "Crew", path: "/crew", icon: Users },
    { name: "Connect", path: "/connect", icon: Mail }
];

export default function Dock() {
    const [hovered, setHovered] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const switchLang = () =>
        i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");

    const handleNavigate = (path) => navigate(path);

    return (
        <div
            className="
                w-full
                flex items-center justify-between
                px-6 py-4
                fixed top-0 left-0
                z-50 pointer-events-none
                backdrop-blur-xl
            "
        >
            <motion.div
                initial={{ opacity: 0, x: -20, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 pointer-events-auto cursor-pointer"
                onClick={() => handleNavigate("/")}
            >
                <img src={image} className="w-10 h-10" />
                <h1 className="text-white text-3xl font-bold">{t("DRAM")}</h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="
                    pointer-events-auto
                    flex md:gap-16 px-8 py-5 gap-5
                    rounded-3xl border border-white/20
                    backdrop-blur-2xl 
                    bg-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.5)]
                "
            >
                {navLinks.map((link, i) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.path;
                    const isHovered = hovered === i;

                    return (
                        <div
                            key={link.name}
                            className="relative flex flex-col items-center"
                            onClick={() => handleNavigate(link.path)}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            <motion.div
                                animate={
                                    isActive || isHovered
                                        ? { scale: 1.6, y: -15 }
                                        : { scale: 1, y: 0 }
                                }
                                transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 25
                                }}
                                className="cursor-pointer"
                            >
                                <Icon
                                    className={`w-6 h-6 transition-all ${isActive
                                        ? "text-blue-300 drop-shadow-[0_0_10px_rgba(17,42,114,1)]"
                                        : "text-white/80"
                                        }`}
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 0 }}
                                animate={
                                    isActive || isHovered
                                        ? { opacity: 1, y: -15 }
                                        : { opacity: 0, y: 0 }
                                }
                                transition={{ duration: 0.25 }}
                                className="
                    absolute -bottom-9
                    px-3 py-1
                    rounded-lg text-white text-xs
                    bg-black/20 backdrop-blur-xl
                    border border-white/20
                    shadow-lg
                    whitespace-nowrap
                "
                            >
                                {t(link.name)}
                            </motion.div>
                        </div>
                    );
                })}

            </motion.div>

            <motion.button
                initial={{ opacity: 0, x: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5 }}
                onClick={switchLang}
                className="
                    pointer-events-auto flex items-center gap-2
                    px-4 py-2 rounded-xl
                    text-white bg-white/10 border border-white/20
                    backdrop-blur-xl 
                    shadow-lg md:flex
                "
            >
                {i18n.language === "en" ? "AR" : "EN"}
            </motion.button>
        </div>
    );
}
