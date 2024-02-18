import FeatureCard from "@/components/Card/FeatureCard";
import React from "react";

const features = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-color-swatch"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* ... */}
      </svg>
    ),
    title: "Customizable",
    description:
      "Tailor your landing page's look and feel, from the color scheme to the font size, to the design of the page.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-color-swatch"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* ... */}
      </svg>
    ),
    title: "Customizable",
    description:
      "Tailor your landing page's look and feel, from the color scheme to the font size, to the design of the page.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-color-swatch"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* ... */}
      </svg>
    ),
    title: "Customizable",
    description:
      "Tailor your landing page's look and feel, from the color scheme to the font size, to the design of the page.",
  },
];
const FeatureSection: React.FC = () => (
  <div className="">
    <section
      id="features"
      className="relative block px-6 py-10 md:py-20 md:px-10 border-t border-b border-c2 bg-c4 -z-10"
    >
      <div className="relative mx-auto max-w-5xl text-center">
        <span className="text-white my-3 flex items-center justify-center font-medium uppercase tracking-wider text-xl">
          Why choose us
        </span>
        <h2 className="block w-full bg-c1 bg-clip-text font-bold text-transparent text-3xl md:text-5xl">
          Build a Website That Your Customers Love
        </h2>
        <p className="mx-auto my-4 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide text-c3">
          Our templates allow for maximum customization. No technical skills
          required – our intuitive design tools let you get the job done easily.
        </p>
      </div>

      <div className="relative mx-auto max-w-7xl z-10 grid grid-cols-1 gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>

      <div
        className="absolute bottom-0 left-0 z-0 h-1/3 w-full border-b"
        style={{
          backgroundImage:
            "linear-gradient(to right top, #A7D129 0%, transparent 40%, transparent 100%)",
          borderColor: "white",
        }}
      ></div>
      <div
        className="absolute bottom-0 right-0 z-0 h-1/3 w-full"
        style={{
          backgroundImage:
            "linear-gradient(to left top, #A7D129 0%, transparent 50%, transparent 100%)",
          borderColor: "white",
        }}
      ></div>
    </section>
  </div>
);
export default FeatureSection;
