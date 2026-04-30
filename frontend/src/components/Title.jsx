import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function Title({ subtitle, title }) {
  return (
    <div className="flex flex-col items-center text-center mb-12">

      {/* Top Line with Arrows */}
      <div className="flex items-center gap-3 text-[#d9c7a0] mb-3">
        <ArrowLeft size={18} />
        <span className="uppercase tracking-[4px] text-sm font-medium">
          {subtitle}
        </span>
        <ArrowRight size={18} />
      </div>

      {/* Main Title */}
      <h2 className="text-3xl md:text-5xl font-serif uppercase text-white leading-tight">
        {title}
      </h2>

      {/* Decorative Line */}
      <div className="w-20 h-0.5 bg-[#d9c7a0] mt-4"></div>
    </div>
  );
}