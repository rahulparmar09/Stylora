import React from "react";
import { Title } from "../components/Title";

const About = () => {
    return (
        <section className="min-h-screen px-6 md:px-12 py-20 relative overflow-hidden">

            {/* background glow */}
            <div className="absolute w-96 h-96 bg-white/5 blur-[120px] rounded-full top-20 left-10"></div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* SECTION TITLE */}
                <Title
                    subtitle="About Us"
                    title="Crafting Beauty With Precision"
                />

                {/* CONTENT */}
                <div className="grid md:grid-cols-2 gap-14 items-center">

                    {/* IMAGE */}
                    <div className="relative flex justify-center">

                        {/* outer glow */}
                        <div className="absolute w-95 h-95 bg-[#d9c7a0]/10 blur-[120px] rounded-full -z-10"></div>

                        {/* border frame */}
                        <div className="border border-[#d9c7a0]/40 p-3 rounded-2xl backdrop-blur-sm">

                            {/* inner image */}
                            <img
                                src="https://cutsmith.dropletthemes.com/wp-content/uploads/2025/12/Cutmsith-Barbeshop-Team-Membes-Images-028343.jpg"
                                alt="Salon Interior"
                                className="w-[320px] md:w-125 h-137.5 object-cover object-top rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] hover:scale-[1.02] transition duration-500"
                            />

                        </div>

                    </div>
                    
                    {/* TEXT */}
                    <div>

                        <h3 className="text-2xl md:text-4xl font-serif uppercase text-white leading-snug">
                            Where Style Meets <br />
                            <span className="text-[#d9c7a0] italic">Luxury & Perfection</span>
                        </h3>

                        <div className="w-20 h-0.5 bg-[#d9c7a0] mt-4"></div>

                        <p className="mt-6 text-gray-400 leading-relaxed text-lg font-light tracking-wide">
                            At our salon, we believe beauty is not just about appearance —
                            it's about confidence, expression, and individuality. Our team of
                            expert stylists combines modern trends with timeless techniques
                            to deliver a truly personalized experience.
                        </p>

                        <p className="mt-4 text-gray-400 leading-relaxed text-lg font-light tracking-wide">
                            From precision haircuts to luxury treatments, every service is
                            designed to elevate your style and give you an unforgettable
                            premium experience in a relaxing environment.
                        </p>

                        {/* STATS / HIGHLIGHTS */}
                        <div className="mt-8 grid grid-cols-2 gap-6">

                            <div>
                                <h4 className="text-3xl font-serif text-[#d9c7a0]">10+</h4>
                                <p className="text-gray-400 text-sm mt-1">Years Experience</p>
                            </div>

                            <div>
                                <h4 className="text-3xl font-serif text-[#d9c7a0]">5K+</h4>
                                <p className="text-gray-400 text-sm mt-1">Happy Clients</p>
                            </div>

                            <div>
                                <h4 className="text-3xl font-serif text-[#d9c7a0]">20+</h4>
                                <p className="text-gray-400 text-sm mt-1">Expert Stylists</p>
                            </div>

                            <div>
                                <h4 className="text-3xl font-serif text-[#d9c7a0]">100%</h4>
                                <p className="text-gray-400 text-sm mt-1">Satisfaction</p>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default About;