import { useEffect, useRef, memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import logo from "../../../src/images/gfx/HomeImage.png";

const Hero = memo(function Hero() {
    const { t, i18n } = useTranslation();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black pb-20 md:pb-0"
        >
            <div className="absolute inset-0">

                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-20 -left-20 w-72 h-72 md:w-96 md:h-96 bg-purple-500/30 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [360, 180, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-20 -right-20 w-80 h-80 md:w-[500px] md:h-[500px] bg-pink-500/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-3xl"
                />


                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 100 }}
                        animate={{
                            opacity: [0.1, 0.3, 0.1],
                            y: [100, -100, 100],
                            rotate: [0, 360, 0],
                        }}
                        transition={{
                            duration: 10 + i * 2,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "linear"
                        }}
                        className={`absolute ${i % 2 === 0 ? 'left-[10%]' : 'right-[15%]'
                            }`}
                        style={{
                            top: `${20 + i * 10}%`,
                        }}
                    >
                        <div className={`w-4 h-4 md:w-6 md:h-6 ${i % 3 === 0
                            ? 'bg-purple-400 rounded-full'
                            : i % 3 === 1
                                ? 'bg-pink-400 rotate-45'
                                : 'bg-blue-400 rounded-sm'
                            } opacity-40`} />
                    </motion.div>
                ))}


                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] md:bg-[size:100px_100px]" />
            </div>


            <motion.div
                style={{ y, opacity }}
                className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20"
            >
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">

                    <div className="flex flex-col justify-center space-y-4 sm:space-y-6 md:space-y-8">


                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center self-start gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-purple-500/30 rounded-full"
                        >
                            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                            <span className="text-xs sm:text-sm font-semibold text-purple-300">
                                {t("Premium Quality Software")}
                            </span>
                        </motion.div>


                        <div className="space-y-2 sm:space-y-3 md:space-y-4">
                            {[t("Apps Crash"), t("Systems Fail"), t("But We Eliminate Errors")].map((line, idx) => (
                                <motion.h1
                                    key={idx}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.2 + idx * 0.2,
                                        ease: "easeOut"
                                    }}
                                    className={`${idx === 2
                                        ? "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                                        : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                                        } font-extrabold leading-tight`}
                                >
                                    <span className={`
                                        ${idx === 2
                                            ? "bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse"
                                            : "text-white"
                                        }
                                        drop-shadow-2xl
                                    `}>
                                        {line}
                                    </span>
                                </motion.h1>
                            ))}
                        </div>


                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-xl"
                        >
                            {t("We craft reliable software solutions with a")}{" "}
                            <span className="text-purple-400 font-semibold">
                                {t("zero-tolerance approach")}
                            </span>{" "}
                            {t("to failure. Built, tested, and trusted for your business.")}
                        </motion.p>


                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white text-sm sm:text-base shadow-2xl shadow-purple-500/50 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="relative flex items-center justify-center gap-2">
                                    {t("Get Started")}
                                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="group px-6 py-3 sm:px-8 sm:py-4 bg-white/5 backdrop-blur-xl border-2 border-white/10 rounded-xl font-bold text-white text-sm sm:text-base hover:border-purple-500/50 transition-all duration-300"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    {t("View Our Work")}
                                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-purple-400 transition-colors" />
                                </span>
                            </motion.button>
                        </motion.div>


                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                            className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-8"
                        >
                            {[
                                { icon: Shield, label: "100% Secure", value: "Guaranteed" },
                                { icon: Zap, label: "Fast", value: "Lightning" },
                                { icon: Sparkles, label: "Quality", value: "Premium" },
                            ].map((stat, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col items-center sm:items-start text-center sm:text-left"
                                >
                                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-purple-400 mb-1 sm:mb-2" />
                                    <div className="text-xs text-gray-400">
                                        {t(stat.label)}
                                    </div>
                                    <div className="text-xs sm:text-sm md:text-base font-bold text-white">
                                        {t(stat.value)}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>


                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="flex justify-center lg:justify-end mt-8 lg:mt-0"
                    >
                        <div className="relative group w-full max-w-md lg:max-w-none">

                            <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-r from-blue-600/40 via-purple-600/50 to-pink-600/40 rounded-3xl opacity-60 blur-3xl group-hover:opacity-80 transition-opacity duration-500" />


                            <motion.div
                                whileHover={{
                                    scale: 1.02,
                                    rotateY: 5,
                                    rotateX: 5,
                                }}
                                transition={{ duration: 0.3 }}
                                className="relative perspective-1000"
                            >
                                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-purple-500/30 shadow-2xl">
                                    <img
                                        src={logo}
                                        alt="Hero Showcase"
                                        className="w-full h-56 sm:h-72 md:h-80 lg:h-96 xl:h-[500px] object-cover"
                                    />


                                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />


                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.5 }}
                                        className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4"
                                    >
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                            <span className="text-white font-semibold text-xs sm:text-sm md:text-base">
                                                {t("Building the Future")}
                                            </span>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>


                            <motion.div
                                animate={{
                                    rotate: [0, 360],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-xl opacity-60"
                            />
                            <motion.div
                                animate={{
                                    rotate: [360, 0],
                                    scale: [1.1, 1, 1.1]
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-xl opacity-60"
                            />
                        </div>
                    </motion.div>

                </div>
            </motion.div>


            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
                >
                    <motion.div
                        className="w-1.5 h-1.5 bg-white rounded-full"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </motion.div>
            </motion.div>

        </section>
    );
});

export default Hero;
