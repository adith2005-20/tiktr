import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { connectWallet, buyTicket as blockchainBuyTicket } from "../blockchain";
import { ethers } from "ethers";
import { CalendarIcon, MapPinIcon, DollarSignIcon } from "lucide-react";

// Helper function to parse metadata from metadataURI query params
function parseMetadata(metadataURI) {
  try {
    const url = new URL(metadataURI);
    return {
      title: url.searchParams.get("title") || "Untitled Event",
      desc: url.searchParams.get("desc") || "No Description",
      date: url.searchParams.get("date") || "N/A",
      location: url.searchParams.get("location") || "N/A",
      image: url.searchParams.get("image") || "",
    };
  } catch (error) {
    return {
      title: "Untitled Event",
      desc: "No Description",
      date: "N/A",
      location: "N/A",
      image: "",
    };
  }
}

function TicketPage() {
  const location = useLocation();
  const event = location.state?.event;
  // Parse metadata if available
  const metadata = event && event.metadataURI ? parseMetadata(event.metadataURI) : null;

  const [signer, setSigner] = useState(null);
  const [ticketId, setTicketId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Check wallet connection on mount
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

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = async (accounts) => {
        if (accounts.length > 0) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const userSigner = await provider.getSigner();
          setSigner(userSigner);
          console.log("Accounts changed. New wallet:", accounts[0]);
        } else {
          setSigner(null);
          console.log("No wallet connected after account change");
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        }
      };
    }
  }, []);

  const handleConnectWallet = async () => {
    try {
      const userSigner = await connectWallet();
      setSigner(userSigner);
      console.log("Wallet connected:", await userSigner.getAddress());
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const handleBuyTicket = async () => {
    if (!signer) {
      alert("Please connect your wallet first.");
      return;
    }
    const tokenURI = "https://your-ticket-metadata-placeholder.com/ticket.json";
    
    let priceOverride;
    if (event && event.ticketPrice) {
      // Use ethers.toBigInt to convert the stored ticketPrice (in wei) into a BigInt.
      priceOverride = ethers.toBigInt(event.ticketPrice);
    }
    
    setLoading(true);
    try {
      // Pass event.id so the contract knows which event you're buying a ticket for.
      const newTicketId = await blockchainBuyTicket(signer, event.id, tokenURI, priceOverride);
      setTicketId(newTicketId);
      alert(`Ticket purchased! Your token ID is: ${newTicketId.toString()}`);
    } catch (error) {
      console.error("Error buying ticket:", error);
      alert("Error buying ticket. Check console for details.");
    }
    setLoading(false);
  };
  
  return (
    <div className="bg-black/90 min-h-screen pt-[120px] pb-8 px-4">
      {/* Main Card Container */}
      <div className="max-w-5xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row h-[400px]">
        {/* Left side: Event Image */}
        {metadata && metadata.image && (
          <div className="md:w-2/3 h-full overflow-hidden">
            <img
              src={metadata.image}
              alt={metadata.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {/* Right side: Event Details & Ticket Purchase Options */}
        <div className="p-6 md:w-1/3 flex flex-col justify-center">
          {metadata ? (
            <>
              <h1 className="text-3xl font-bold mb-2 text-white pb-3">
                {metadata.title}
              </h1>
              <div className="flex items-center gap-2 text-white mb-2">
                <CalendarIcon className="w-5 h-5" />
                <p>{metadata.date}</p>
              </div>
              <div className="flex items-center gap-2 text-white mb-2">
                <MapPinIcon className="w-5 h-5" />
                <p>{metadata.location}</p>
              </div>
              <div className="flex items-center gap-2 text-white mb-4 pb-3">
                <DollarSignIcon className="w-5 h-5" />
                <p>{ethers.formatEther(event.ticketPrice)} ETH</p>
              </div>
              <p className="text-white mb-4">{metadata.desc}</p>
            </>
          ) : (
            <h1 className="text-2xl font-bold mb-4 text-black">
              Purchase Your NFT Ticket
            </h1>
          )}

          {/* Fallback Connect Wallet Button */}
          {!signer && (
            <button
              onClick={handleConnectWallet}
              className="bg-blue-700 text-white font-medium py-2 px-4 rounded mb-4 hover:bg-blue-800 transition-colors self-start"
            >
              Connect Wallet
            </button>
          )}

          {/* Buy Ticket Button */}
          <button
            onClick={handleBuyTicket}
            className={`${
              loading ? "bg-gray-400 text-white" : "bg-blue-700 text-white hover:bg-blue-800"
            } font-medium py-2 px-4 rounded transition-colors self-start`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Book Tickets"}
          </button>

          {/* Ticket Confirmation */}
          {ticketId && (
            <div className="mt-5">
              <h2 className="text-lg font-semibold text-black mb-1">
                Ticket Purchased!
              </h2>
              <p className="text-gray-300">
                Your Ticket Token ID: <span className="font-bold">{ticketId.toString()}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Event Description Section */}
      {metadata && metadata.desc && (
        <div className="max-w-5xl mx-auto mt-8 bg-gray-900 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-white mb-2">About the Event</h2>
          <p className="text-gray-300">{metadata.desc}</p>
        </div>
      )}
    </div>
  );
}

export default TicketPage;
