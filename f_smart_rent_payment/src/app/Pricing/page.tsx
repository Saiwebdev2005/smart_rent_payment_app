// Pricing.tsx
import React from "react";
import Product from "../../components/Card/PricingCard";

interface ProductData {
  id: string;
  title: string;
  details: string;
  price: string;
  features: string[];
  link: string;
}

interface PricingProps {
  products: ProductData[];
}
const productsData = [
  {
    id: "product1",
    title: "Product Type 1",
    details: "Product details for Product Type 1",
    price: "€ 10 / unit",
    features: ["40 units", "1 feature", "Fast delivery"],
    link: "/order1",
  },
  {
    id: "product2",
    title: "Product Type 2",
    details: "The most popular choice. Product details for Product Type 2",
    price: "€ 20 / unit",
    features: ["120 units", "3 different features", "Fast delivery"],
    link: "/order2",
  },
  {
    id: "product3",
    title: "Product Type 3",
    details: "Product details for Product Type 3",
    price: "€ 50 / unit",
    features: ["240 units", "6 different features", "Fast delivery"],
    link: "/order3",
  },
];

const Pricing: React.FC<PricingProps> = ({ products }) => {
  return (
    <div className="pt-5 bg-c4" id="pricing">
      <div className="mx-auto pb-20 mt-4 max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col space-y-8 mx-auto max-w-4xl text-center">
          <h1 className="font-semibold leading-7 text-c1 text-2xl md:text-6xl">Pricing</h1>
          <p className="mt-2 text-lg font-bold tracking-tight text-white md:text-4xl">
            Whether it's just you, or your entire team - we've got you covered.
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-md md:text-lg leading-8 text-c2">
          Choose the product that works best
        </p>
        <div className="isolate mx-auto mt-10 grid max-w-md md:max-w-lg grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {productsData.map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
