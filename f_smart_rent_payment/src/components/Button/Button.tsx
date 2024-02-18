import React, { FC } from "react";

interface ButtonProps {
  name: string;
  extraStyles?: string;
  link?: string;
}

const Button: FC<ButtonProps> = ({ name, extraStyles, link }) => {
  const buttonClasses = `bg-c1 text-c4 font-semibold px-6 py-3 rounded-full hover:bg-opacity-80 transition duration-300 ${extraStyles || ""}`;

  return (
    <a href={link} className="no-underline">
      <button className={buttonClasses}>
        {name}
      </button>
    </a>
  );
};

export default Button;
