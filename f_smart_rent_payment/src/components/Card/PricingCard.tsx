// Product.tsx
import React from 'react';

interface ProductProps {
  id: string;
  title: string;
  details: string;
  price: string;
  features: string[];
  link: string;
}

const Product: React.FC<ProductProps> = ({ id, title, details, price, features, link }) => {
  return (
    <div className={`ring-1 ring-c2 rounded-3xl p-4 md:p-10 ${id === 'product2' ? 'bg-white/5 ring-2 ring-c1' : ''}`}>
  <div className="flex flex-col items-center md:items-start md:flex-row justify-between gap-x-4">
    <h2 id={id} className="text-lg md:text-xl font-semibold leading-8 text-white md:self-start">
      {title}
    </h2>
    {id === 'product2' && (
      <p className="rounded-full bg-c1 px-2 py-1 text-xs md:text-sm font-semibold leading-5 text-c4 md:self-start">Most popular</p>
    )}
  </div>
  <p className="mt-2 md:mt-4 text-xs md:text-sm leading-6 text-gray-300">{details}</p>
  <p className="mt-3 md:mt-6 flex items-baseline gap-x-1">
    <span className="text-3xl md:text-4xl font-bold tracking-tight text-white">{price}</span>
  </p>
  <a
    href={link}
    aria-describedby={id}
    className={`${
      id === 'product2' ? 'bg-c1' : 'bg-white'
    } text-c4 hover:bg-white/20 focus-visible:outline-white mt-4 md:mt-6 block rounded-md py-2 px-3 text-center text-xs md:text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
  >
    Order Now
  </a>
  <ul role="list" className="mt-4 md:mt-8 space-y-2 md:space-y-3 text-xs md:text-sm leading-6 text-gray-300 xl:mt-10">
    {features.map((feature, index) => (
      <li key={index} className="flex gap-x-2 md:gap-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 md:h-6 w-4 md:w-5 flex-none text-white">
          <path
            fillRule="evenodd"
            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
            clipRule="evenodd"
          ></path>
        </svg>
        {feature}
      </li>
    ))}
  </ul>
</div>

  );
};

export default Product;
