// HeroSection.tsx

import React from "react";

const HeroSection: React.FC = () => {
  return (
    <div className="mt-44">
      <section className="h-screen bg-c4 text-white text-center py-28 ">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-8xl font-bold mb-4 text-c1">
            Your Hero Heading
          </h1>
          <h3 className="text-lg md:text-4xl mb-8 text-c2">
            Your Hero Subheading
          </h3>
          <button className="bg-c1 text-c4 px-6 py-3 rounded-full hover:bg-opacity-80 transition duration-300">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
