import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { connectWallet } from '../blockchain';
import { ethers } from 'ethers';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  // Poll for connected wallet every 250ms
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.ethereum) {
        window.ethereum
          .request({ method: 'eth_accounts' })
          .then((accounts) => {
            if (accounts.length > 0) {
              setWalletAddress(accounts[0]);
            } else {
              setWalletAddress('');
            }
          })
          .catch((error) => {
            console.error('Error checking wallet connection:', error);
          });
      }
    }, 250);

    return () => clearInterval(interval);
  }, []);

  // Handle header background on scroll and route
  useEffect(() => {
    if (location.pathname === '/') {
      setIsScrolled(false);
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setIsScrolled(true);
    }
  }, [location.pathname]);

  const handleConnectWallet = async () => {
    try {
      const signer = await connectWallet();
      const address = await signer.getAddress();
      setWalletAddress(address);
      console.log('Wallet connected:', address);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const handleDisconnectWallet = () => {
    // Clear local state
    setWalletAddress('');
    setDropdownOpen(false);
  };

  // Utility to truncate long wallet addresses
  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        location.pathname === '/' && !isScrolled ? 'bg-transparent' : 'bg-black shadow-lg'
      }`}
    >
      <nav className="px-4 lg:px-6 py-2.5 text-white">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl relative">
          <Link to="/" className="flex items-center">
            <img
              src="/tiktrlogo.png"
              className="h-12 scale-75"
              onClick={() => { window.scrollTo(0, 0); }}
              alt="Logo"
            />
          </Link>
          <div className="flex items-center lg:order-2 relative">
            {walletAddress ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="bg-orange-700 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded transition-colors"
                >
                  {truncateAddress(walletAddress)}
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-40 bg-black border border-gray-700 rounded shadow-lg z-10"
                    >
                      <button
                        onClick={handleDisconnectWallet}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        Disconnect Wallet
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={handleConnectWallet}
                className="bg-orange-700 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Connect Wallet
              </button>
            )}
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${isActive ? 'text-orange-400' : 'text-gray-300'} block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                  onClick={() => { window.scrollTo(0, 0); }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `${isActive ? 'text-orange-400' : 'text-gray-300'} block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                  onClick={() => { window.scrollTo(0, 0); }}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/findshows"
                  className={({ isActive }) =>
                    `${isActive ? 'text-orange-400' : 'text-gray-300'} block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                  onClick={() => { window.scrollTo(0, 0); }}
                >
                  Find Shows
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/listshow"
                  className={({ isActive }) =>
                    `${isActive ? 'text-orange-400' : 'text-gray-300'} block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                  onClick={() => { window.scrollTo(0, 0); }}
                >
                  List a Show
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
