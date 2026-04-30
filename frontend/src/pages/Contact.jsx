import React from "react";
import { Title } from "../components/Title";

const Contact = () => {
  return (
    <section className="min-h-screen px-6 md:px-12 py-20 relative overflow-hidden">

      {/* background glow */}
      <div className="absolute w-96 h-96 bg-[#d9c7a0]/10 blur-[120px] rounded-full top-10 right-10"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* TITLE */}
        <Title 
          subtitle="Get In Touch"
          title="Book Your Premium Experience"
        />

        <div className="grid md:grid-cols-2 gap-12 mt-12">

          {/* LEFT - CONTACT INFO */}
          <div>

            <h3 className="text-2xl md:text-3xl font-serif uppercase text-white">
              Visit Our Salon
            </h3>

            <div className="w-20 h-0.5 bg-[#d9c7a0] mt-4"></div>

            <p className="mt-6 text-gray-400 leading-relaxed">
              Experience luxury grooming and styling with our expert team.
              Reach out to us or visit our salon for a personalized consultation.
            </p>

            <div className="mt-8 space-y-6 text-gray-300">

              <div>
                <p className="text-[#d9c7a0] uppercase text-sm tracking-widest">Address</p>
                <p>101 Styleora Hill Town Complex Nikol Ahmedabad 383830</p>
              </div>

              <div>
                <p className="text-[#d9c7a0] uppercase text-sm tracking-widest">Phone</p>
                <p>+91 123456 987654</p>
              </div>

              <div>
                <p className="text-[#d9c7a0] uppercase text-sm tracking-widest">Email</p>
                <p>info@stylorasalon.com</p>
              </div>

              <div>
                <p className="text-[#d9c7a0] uppercase text-sm tracking-widest">Hours</p>
                <p>Mon - Sun : 10:00 AM - 7:00 PM</p>
              </div>

            </div>

          </div>

          {/* RIGHT - FORM */}
          <div className="border border-[#d9c7a0]/30 p-6 md:p-8 rounded-2xl backdrop-blur-md">

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[#d9c7a0] outline-none"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[#d9c7a0] outline-none"
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[#d9c7a0] outline-none"
              />

              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[#d9c7a0] outline-none"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-[#d9c7a0] text-black py-3 rounded-full font-semibold transition duration-300"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;