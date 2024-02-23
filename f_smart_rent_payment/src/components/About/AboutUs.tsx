import Link from "next/link";
import React from "react";
const AboutUs: React.FC = () => {
  return (
    <div className="w-full h-26 bg-c1 text-c4 border border-c4">
      <div className="max-w-5xl mx-auto p-4 md:p-12">
        <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold">Logo</h1>
          </div>
          <div>
            <ul className="flex flex-row justify-center items-center space-x-4 md:space-x-6">
              <Link className="font-semibold md:text-lg hover:text-c3" href="#">
                Product
              </Link>
              <Link className="font-semibold md:text-lg hover:text-c3" href="#">
                Developer
              </Link>
              <Link className="font-semibold md:text-lg hover:text-c3" href="#">
                Contact Us
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
