import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { connectWallet, getContractInstance } from "../blockchain";
import { ethers } from "ethers";

function UseTicket() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tokenId = searchParams.get("tokenId");
  const eventId = searchParams.get("eventId");
  const burnType = searchParams.get("burnType"); // "guard" if a guard is calling the burn function
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!tokenId || !eventId) {
      setMessage("Missing ticket information in URL.");
    }
  }, [tokenId, eventId]);

  const handleBurnTicket = async () => {
    setLoading(true);
    try {
      const signer = await connectWallet();
      const contract = getContractInstance(signer);
      let tx;
      if (burnType === "guard") {
        // Call the guardBurnTicket function (ensure your contract implements this)
        tx = await contract.guardBurnTicket(tokenId);
      } else {
        // Normal ticket burning by the ticket owner
        tx = await contract.useTicket(tokenId);
      }
      await tx.wait();
      setMessage("Ticket burned successfully!");
    } catch (error) {
      console.error("Error burning ticket:", error);
      setMessage("Error burning ticket. Please check the console for details.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Use Your Ticket</h1>
      <p className="mb-2">Ticket ID: {tokenId || "N/A"}</p>
      <p className="mb-4">Event ID: {eventId || "N/A"}</p>
      {message && <p className="mb-4">{message}</p>}
      <button
        onClick={handleBurnTicket}
        disabled={loading || !tokenId || !eventId}
        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? "Processing..." : "Burn Ticket"}
      </button>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
      >
        Go Back
      </button>
    </div>
  );
}

export default UseTicket;
