import { Title } from "../components/Title";
import {
  Scissors,
  MapPin,
  Smile,
  Sparkles,
  Brush,
  User
} from "lucide-react";

const services = [
  { title: "EXPERT BARBERS", desc: "Skilled professionals specializing in modern cuts, fades, and grooming.", icon: Scissors },
  { title: "EASY ACCESS", desc: "Our barbershop is located in a central, easy-to-reach area.", icon: MapPin },
  { title: "BEARD GROOMING", desc: "Beard shaping, trimming, and full beard styling for a sharp look.", icon: Smile },
  { title: "HAIR STYLING", desc: "Trendy and classic hairstyles tailored to your personality.", icon: Brush },
  { title: "PREMIUM PRODUCTS", desc: "We use high-quality grooming products for best results.", icon: Sparkles },
  { title: "PERSONAL CARE", desc: "Relaxing and professional grooming experience.", icon: User },
];

export default function Category() {
  return (
    <div className="bg-[#121212] text-white py-16 px-6">

      {/*  TITLE ADDED */}
      <Title subtitle="Our Service" title="What We Offer" />

      <div className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

        {services.map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={i}
              className="group bg-[#1a1a1a] p-8 text-center rounded-md hover:bg-[#202020] transition duration-300"
            >

              {/* ICON */}
              <div className="relative w-24 h-24 mx-auto mb-6">

                <div className="w-full h-full rounded-full border border-gray-600 flex items-center justify-center">
                  <Icon size={40} className="text-yellow-400" />
                </div>

                {/* ORBIT */}
                <div className="absolute inset-0 group-hover:animate-spin origin-center">

                  <div className="w-3 h-3 bg-yellow-400 rounded-full absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_10px_#facc15]" />

                </div>

              </div>

              <h3 className="text-lg font-semibold tracking-wide mb-3">
                {item.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>

            </div>
          );
        })}

      </div>
    </div>
  );
}