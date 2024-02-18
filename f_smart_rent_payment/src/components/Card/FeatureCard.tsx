import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="rounded-md border border-c3 bg-neutral-900/50 p-8 text-center shadow">
    <div
      className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border"
      style={{
        backgroundImage:
          "linear-gradient(to right top, from-yellow-400 to-transparent)",
        borderColor: "#A7D129",
      }}
    >
      {icon}
    </div>

    <h3 className="mt-6 text-c1">{title}</h3>
    <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-white">
      {description}
    </p>
  </div>
);

export default FeatureCard;
