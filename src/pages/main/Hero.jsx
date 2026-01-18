import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "../../../src/images/gfx/HomeImage.png";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const imageRef = useRef(null);
    const headingRef = useRef([]);
    const subtextRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            imageRef.current,
            { scale: 0.95, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: "top 80%",
                },
            }
        );

        gsap.fromTo(
            headingRef.current,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.25,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: headingRef.current[0],
                    start: "top 85%",
                },
            }
        );

        gsap.fromTo(
            subtextRef.current,
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: 0.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: subtextRef.current,
                    start: "top 85%",
                },
            }
        );
    }, []);

    return (
        <section
            className="relative min-h-screen flex items-center"
            style={{
                background: "radial-gradient(circle, rgb(17, 42, 114) 0%, rgb(0, 0, 0) 100%)",
            }}



        >
            <div className="container mx-auto mt-12 min-h-screen max-w-7xl grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="flex flex-col justify-center space-y-6 md:space-y-1">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight md:leading-snug drop-shadow-lg">
                        {["Apps Crash.", "Systems Fail.", "But We Eliminate Errors"].map(
                            (line, idx) => (
                                <span
                                    key={idx}
                                    ref={(el) => (headingRef.current[idx] = el)}
                                    className="block"
                                >
                                    {line}
                                </span>
                            )
                        )}
                    </h1>

                    <p
                        ref={subtextRef}
                        className=" text-lg backdrop-blur-xl px-4 md:px-3 rounded-3xl shadow-2xl  hover:shadow-3xl transition-all duration-500 max-w-lg text-gray-100"
                    >
                        We craft reliable software solutions with a zero-tolerance
                        approach to failure. Built, tested, and trusted for your business.
                    </p>
                </div>

                <div className="flex justify-center md:justify-end">
                    <div
                        ref={imageRef}
                        className="relative overflow-hidden rounded-3xl group transition-transform duration-500 hover:scale-105"
                    >
                        <img
                            src={logo}
                            alt="Hero Image"
                            className="w-full h-80 sm:h-96 md:h-[500px] object-cover rounded-3xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0  transition-opacity duration-500 rounded-3xl"></div>
                    </div>
                </div>

            </div>

        </section>
    );
}
