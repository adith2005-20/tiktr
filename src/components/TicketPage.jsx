// src/components/TicketPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { connectWallet, buyTicket as blockchainBuyTicket } from "../blockchain";
import { ethers } from "ethers";

function TicketPage() {
  const location = useLocation();
  const event = location.state?.event;
  const [signer, setSigner] = useState(null);
  const [ticketId, setTicketId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkWalletConnection() {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          if (accounts.length > 0) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const userSigner = await provider.getSigner();
            setSigner(userSigner);
            console.log("Wallet already connected:", accounts[0]);
          } else {
            console.log("No wallet connected yet");
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    }
    checkWalletConnection();
  }, []);

  const handleConnectWallet = async () => {
    try {
      const userSigner = await connectWallet();
      setSigner(userSigner);
      console.log("Wallet connected:", userSigner);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const handleBuyTicket = async () => {
    if (!signer) {
      alert("Please connect your wallet first.");
      return;
    }
    const tokenURI = "https://your-metadata-url.com/ticket.json";
    
    let priceOverride;
    if (event && event.price) {
      priceOverride = ethers.parseEther(event.price);
    }
    
    setLoading(true);
    try {
      const newTicketId = await blockchainBuyTicket(signer, tokenURI, priceOverride);
      setTicketId(newTicketId);
      alert(`Ticket purchased! Your token ID is: ${newTicketId.toString()}`);
    } catch (error) {
      console.error("Error buying ticket:", error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-b from-black to-gray-800 min-h-screen pt-[120px] pb-8 px-4">
      <div className="max-w-xl mx-auto bg-[#103628] bg-opacity-60 rounded-lg p-8 shadow-lg">
        {event ? (
          <>
            <h1 className="text-orange-200 text-3xl font-bold text-center mb-6">
              {event.title}
            </h1>
            <p className="text-gray-300 text-center mb-4">
              Date: {event.date} • Location: {event.location}
            </p>
            <p className="text-gray-300 text-center mb-6">
              Price: {event.price} ETH
            </p>
          </>
        ) : (
          <h1 className="text-orange-200 text-3xl font-bold text-center mb-6">
            Purchase Your NFT Ticket
          </h1>
        )}
        <p className="text-gray-300 text-center mb-6">
          Connect your wallet and buy your ticket for this event.
        </p>

        <button
          onClick={handleConnectWallet}
          className="w-full bg-orange-700 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded mb-4 transition-colors"
        >
          Connect Wallet
        </button>

        <button
          onClick={handleBuyTicket}
          className={`w-full ${
            loading ? "bg-gray-500" : "bg-orange-700 hover:bg-orange-600"
          } text-white font-medium py-2 px-4 rounded transition-colors`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Buy Ticket"}
        </button>

        {ticketId && (
          <div className="mt-6 text-center">
            <h2 className="text-orange-200 text-xl font-semibold mb-2">
              Ticket Purchased!
            </h2>
            <p className="text-gray-300">
              Your Ticket Token ID:{" "}
              <span className="text-white font-bold">{ticketId.toString()}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketPage;
