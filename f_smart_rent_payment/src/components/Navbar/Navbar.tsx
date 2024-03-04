"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Web3 } from "web3";
const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const [connectedAccount, setConnectedAccount] = useState("null");

  async function connectMetamask() {
    //check metamask is installed
    if (window.ethereum) {
      // instantiate Web3 with the injected provider
      const web3 = new Web3(window.ethereum);

      //request user to connect accounts (Metamask will prompt)
      await window.ethereum.request({ method: "eth_requestAccounts" });

      //get the connected accounts
      const accounts = await web3.eth.getAccounts();

      //show the first connected account in the react page
      setConnectedAccount(accounts[0]);
    } else {
      alert("Please download metamask");
    }
  }

  return (
    <div className="w-full mb-24">
      <div className="rounded-full overflow-hidden">
        {/* Big screen */}
        <div className="hidden md:block">
          <nav className="fixed top-0 left-0 right-0 p-4 my-4 flex flex-wrap items-center justify-between bg-opacity-20 backdrop-blur-md  max-w-6xl mx-auto">
            <Link href="/">
              <div className="text-white font-bold text-xl order-2 w-full md:w-auto md:order-none">
                Your Logo
              </div>
            </Link>
            <div className="flex-grow text-center order-3 md:order-none w-full md:w-auto">
              {/* Your centered content goes here */}
              <Link
                href="#"
                className="block mt-4 md:inline-block md:mt-0 font-semibold text-white hover:text-c1 mx-2"
              >
                Product
              </Link>
              <a
                href="#"
                className="block mt-4 md:inline-block md:mt-0 font-semibold text-white hover:text-c1 mx-2"
              >
                About
              </a>
              <Link
                href="/Pricing"
                className="block mt-4 md:inline-block md:mt-0 font-semibold text-white hover:text-c1 mx-2"
              >
                Pricing
              </Link>
              <a
                href="#"
                className="block mt-4 md:inline-block md:mt-0 font-semibold text-white hover:text-c1 mx-2"
              >
                Contact
              </a>
            </div>

            <div className=" order-1 md:order-none">
              {connectedAccount ? (
                <p>{connectedAccount}</p>
              ) : (
                <button
                  className="bg-c1 text-c4 font-semibold px-6 py-3 rounded-full hover:bg-opacity-80 transition duration-300"
                  onClick={() => connectMetamask()}
                >
                  Connect to Metamask
                </button>
              )}
            </div>
          </nav>
        </div>
        {/* Mobile Menu Button */}
        <div className="order-4 md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white hover:text-c1 absolute top-0 left-0 p-4 text-3xl"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-opacity-20 backdrop-blur-md flex flex-col justify-center items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-c1 absolute top-0 left-0 p-4 text-3xl"
            >
              ✕
            </button>
            <nav className="flex flex-col space-y-4 justify-center items-center">
              <Link href="/">
                <h1 className="text-2xl">Logo</h1>
              </Link>
              <div className="flex flex-col justify-center items-center space-y-3">
                <Link href="#">Product</Link>
                <Link href="/Pricing">Pricing</Link>
              </div>
              <div>
                <button
                  className="bg-c1 text-c4 font-semibold px-6 py-3 rounded-full hover:bg-opacity-80 transition duration-300"
                  onClick={() => connectMetamask()}
                >
                  Connect to Metamask
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
