"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Web3 } from "web3";

const Navbar: React.FC = () => {
 // State to manage mobile menu visibility
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

 // Function to toggle mobile menu visibility
 const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
 };

 // State to store the connected account address
 const [connectedAccount, setConnectedAccount] = useState<string | null>(null);

 // State to manage hover state for the account button
 const [isHovering, setIsHovering] = useState(false);

 // Effect to check and connect to MetaMask on component mount
 useEffect(() => {
    const checkAndConnectMetamask = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setConnectedAccount(accounts[0]);
        }
      }
    };

    checkAndConnectMetamask();

    // Listen for account changes
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        setConnectedAccount(null);
      } else if (accounts[0] !== connectedAccount) {
        setConnectedAccount(accounts[0]);
      }
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);

    // Cleanup function to remove the event listener
    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
 }, [connectedAccount]); // Dependency array ensures this effect runs once on mount

 // Function to connect to MetaMask
 async function connectMetamask() {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      setConnectedAccount(accounts[0]);
      console.log("Connecting to metamask")
    } else {
      alert("Please download MetaMask");
    }
 }

 // Function to disconnect from MetaMask
 // Note: This function might need adjustment based on MetaMask's current API
 async function disconnectMetamask() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts", params: [] });
        setConnectedAccount(null);
      } catch (error) {
        console.error("Failed to disconnect MetaMask", error);
      }
    }
 }

 return (
    <div className="w-full mb-24">
      <div className="rounded-full overflow-hidden">
        {/* Navigation for larger screens */}
        <div className="hidden md:block">
          <nav className="fixed top-0 left-0 right-0 p-4 my-4 flex flex-wrap items-center justify-between bg-opacity-20 backdrop-blur-md max-w-6xl mx-auto">
            {/* Logo */}
            <Link href="/">
              <div className="text-white font-bold text-xl order-2 w-full md:w-auto md:order-none">
                Your Logo
              </div>
            </Link>
            {/* Navigation links */}
            <div className="flex-grow text-center order-3 md:order-none w-full md:w-auto">
              <Link href="#" className="block mt-4 md:inline-block md:mt-0 font-semibold text-white hover:text-c1 mx-2">
                Product
              </Link>
              <a href="#" className="block mt-4 md:inline-block md:mt-0 font-semibold text-white hover:text-c1 mx-2">
                About
              </a>
              <Link href="/Pricing" className="block mt-4 md:inline-block md:mt-0 font-semibold text-white hover:text-c1 mx-2">
                Pricing
              </Link>
              <a href="#" className="block mt-4 md:inline-block md:mt-0 font-semibold text-white hover:text-c1 mx-2">
                Contact
              </a>
            </div>
            {/* Account connection button */}
            <div className="order-1 md:order-none">
              {connectedAccount ? (
                <div className="ml-auto bg-c1 text-c4 font-semibold px-6 py-3 rounded-full hover:bg-red-600 transition duration-500 w-44">
                 {isHovering ? "Disconnect" : `${connectedAccount.slice(0, 6)}...${connectedAccount.slice(connectedAccount.length - 4)}`}
                </div>
              ) : (
                <button
                 className="bg-c1 text-c4 font-semibold px-6 py-3 rounded-full hover:bg-opacity-80 transition duration-300"
                 onClick={() => connectMetamask()}
                >
                 Connect to MetaMask
                </button>
              )}
            </div>
          </nav>
        </div>
        {/* Mobile menu button */}
        <div className="order-4 md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white hover:text-c1 absolute top-0 left-0 p-4 text-3xl"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
        {/* Mobile menu */}
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
              {connectedAccount ? (
                <div className="ml-auto bg-c1 text-c4 font-semibold px-6 py-3 rounded-full hover:bg-red-600 transition duration-500 w-44">
                 {isHovering ? "Disconnect" : `${connectedAccount.slice(0, 6)}...${connectedAccount.slice(connectedAccount.length - 4)}`}
                </div>
              ) : (
                <button
                 className="bg-c1 text-c4 font-semibold px-6 py-3 rounded-full hover:bg-opacity-80 transition duration-300"
                 onClick={() => connectMetamask()}
                >
                 Connect to MetaMask
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </div>
 );
};

export default Navbar;
