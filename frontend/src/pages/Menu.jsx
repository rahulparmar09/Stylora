import React from "react";
import { Title } from "../components/Title";

const Menu = () => {
  return (
    <div className="w-full bg-[#121212] py-16 px-6 md:px-20 space-y-24">

      {/*  TOP SECTION   */}
      <div className="flex flex-col md:flex-row items-center gap-12">

        {/* Image */}
        <div className="md:w-1/2 w-full flex justify-center">
          <img
            src="https://dpsample.com/wp_themes/polishe/wp-content/uploads/2025/11/image-gen-14-min-2.webp"
            alt="haircut"
            className="w-[320px] h-105 md:w-105 md:h-130 object-cover rounded-t-full rounded-b-full shadow-lg"
          />
        </div>

        {/* Content */}
        <div className="md:w-1/3 w-full text-white">
          <Title subtitle="Precision" title="Haircut Menu" />

          <div className="space-y-6 mt-8">

            <div className="flex justify-between border-b border-gray-700 pb-4">
              <div>
                <h3 className="text-lg uppercase tracking-wide">Haircut</h3>
                <p className="text-gray-400 text-sm">Ut elit tellus, luctus nec ullam.</p>
              </div>
              <span className="text-[#d9c7a0] font-semibold">₹45</span>
            </div>

            <div className="flex justify-between border-b border-gray-700 pb-4">
              <div>
                <h3 className="text-lg uppercase flex items-center gap-2 tracking-wide">
                  Scalp Treatment
                  <span className="text-[10px] bg-[#d9c7a0] text-black px-2 py-0.5 rounded">
                    SPECIAL
                  </span>
                </h3>
                <p className="text-gray-400 text-sm">Ut elit tellus, luctus nec ullam.</p>
              </div>
              <span className="text-[#d9c7a0] font-semibold">₹10</span>
            </div>

            <div className="flex justify-between">
              <div>
                <h3 className="text-lg uppercase tracking-wide">Deluxe Haircut</h3>
                <p className="text-gray-400 text-sm">Ut elit tellus, luctus nec ullam.</p>
              </div>
              <span className="text-[#d9c7a0] font-semibold">₹18</span>
            </div>

          </div>
        </div>
      </div>

      {/* ===== BOTTOM SECTION (Beard) ===== */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-12">

        {/* Image */}
        <div className="md:w-1/2 w-full flex justify-center">
          <img
            src="https://dpsample.com/wp_themes/polishe/wp-content/uploads/2025/11/image-gen-11-min-1.webp"
            alt="beard"
            className="w-[320px] h-105 md:w-105 md:h-130 object-cover rounded-t-full rounded-b-full shadow-lg"
          />
        </div>

        {/* Content */}
        <div className="md:w-1/3 w-full text-white">
          <Title subtitle="Premium" title="Beard Styling" />

          <div className="space-y-6 mt-8">

            <div className="flex justify-between border-b border-gray-700 pb-4">
              <div>
                <h3 className="text-lg uppercase tracking-wide">Beard Trim</h3>
                <p className="text-gray-400 text-sm">Ut elit tellus, luctus nec ullam.</p>
              </div>
              <span className="text-[#d9c7a0] font-semibold">₹20</span>
            </div>

            <div className="flex justify-between border-b border-gray-700 pb-4">
              <div>
                <h3 className="text-lg uppercase tracking-wide">Beard Sculpt</h3>
                <p className="text-gray-400 text-sm">Ut elit tellus, luctus nec ullam.</p>
              </div>
              <span className="text-[#d9c7a0] font-semibold">₹25</span>
            </div>

            <div className="flex justify-between">
              <div>
                 <h3 className="text-lg uppercase flex items-center gap-2 tracking-wide">
                  Royal Beard Package
                  <span className="text-[10px] bg-[#d9c7a0] text-black px-2 py-0.5 rounded">
                    SPECIAL
                  </span>
                </h3>
                <p className="text-gray-400 text-sm">Ut elit tellus, luctus nec ullam.</p>
              </div>
              <span className="text-[#d9c7a0] font-semibold">₹40</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default Menu;