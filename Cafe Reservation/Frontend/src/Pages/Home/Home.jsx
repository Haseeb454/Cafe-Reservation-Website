import React from "react";
import { NavLink } from "react-router-dom"; // ✅ using NavLink

export default function Home() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="p-6 md:p-12 rounded-3xl text-center max-w-3xl mt-20">
        {/* Gradient Heading */}
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-500 bg-clip-text text-transparent">
          Discover the Taste of Perfection
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed">
          At <span className="bg-gradient-to-r from-yellow-400 to-yellow-800 bg-clip-text text-transparent font-semibold">Cafe Delight</span>, we serve more than coffee — we create a cozy experience where flavors meet comfort and elegance.
        </p>

        {/* NavLink as Button */}
        <NavLink
          to="/reserve"
          className="inline-block bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-800 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold py-2 px-6 md:py-3 md:px-8 rounded-full transition duration-300 shadow-md hover:scale-105 text-sm md:text-base"
        >
          Reserve a Table
        </NavLink>
      </div>
    </section>
  );
}
