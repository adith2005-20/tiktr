import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { connectWallet, getContractInstance, getAllEventIds } from "../blockchain";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import QRCode from "react-qr-code";

// Helper function to parse metadata from metadataURI query parameters
function parseMetadata(metadataURI) {
  try {
    const url = new URL(metadataURI);
    return {
      title: url.searchParams.get("title") || "No Title",
      date: url.searchParams.get("date") || "N/A",
      location: url.searchParams.get("location") || "N/A",
      image: url.searchParams.get("image") || ""
    };
  } catch (error) {
    return {
      title: "No Title",
      date: "N/A",
      location: "N/A",
      image: ""
    };
  }
}

function MyEvents() {
  const [myCreatedEvents, setMyCreatedEvents] = useState([]);
  const [myTickets, setMyTickets] = useState([]);
  const [eventMap, setEventMap] = useState({}); // Map eventId → event data
  const [loading, setLoading] = useState(false);
  const [myAddress, setMyAddress] = useState("");
  const [qrModal, setQrModal] = useState({
    open: false,
    qrData: "",
    eventDetails: null,
  });

  useEffect(() => {
    async function fetchMyEvents() {
      setLoading(true);
      try {
        const signer = await connectWallet();
        const address = (await signer.getAddress()).toLowerCase();
        setMyAddress(address);

        const contract = getContractInstance(signer);
        const ids = await getAllEventIds(signer);

        // Fetch details for each event from the contract
        const allEvents = await Promise.all(
          ids.map(async (id) => {
            const ev = await contract.events(id);
            return {
              id: id.toString(),
              creator: ev.creator.toLowerCase(),
              ticketPrice: ev.ticketPrice.toString(),
              metadataURI: ev.metadataURI,
              maxTickets: ev.maxTickets.toString(),
              ticketsSold: ev.ticketsSold.toString(),
            };
          })
        );

        // Filter events that the user created
        const createdEvents = allEvents.filter((ev) => ev.creator === address);
        setMyCreatedEvents(createdEvents);

        // Build a lookup map for events by eventId
        const eMap = {};
        for (const ev of allEvents) {
          eMap[ev.id] = ev;
        }
        setEventMap(eMap);

        // Fetch tickets owned by the user by iterating over token IDs
        const ticketCounter = await contract.ticketCounter();
        const ownedTickets = [];
        for (let tokenId = 0; tokenId < ticketCounter; tokenId++) {
          try {
            const owner = await contract.ownerOf(tokenId);
            if (owner.toLowerCase() === address) {
              // Assumes your contract exposes tokenEventId(tokenId)
              const eventId = await contract.tokenEventId(tokenId);
              ownedTickets.push({
                eventId: eventId.toString(),
                tokenId: tokenId.toString(),
              });
            }
          } catch (error) {
            // Skip if token is burned or doesn't exist
            continue;
          }
        }
        setMyTickets(ownedTickets);
      } catch (error) {
        console.error("Error fetching my events:", error);
      }
      setLoading(false);
    }
    fetchMyEvents();
  }, []);

  // Function to open QR modal with ticket details
  const openQrModal = (ticket) => {
    // Construct a URL that your mobile interface (or burn ticket page) can use.
    // Replace with your actual endpoint as needed.
    const qrData = `http://tiktr.vercel.app/use-ticket?tokenId=${ticket.tokenId}&eventId=${ticket.eventId}`;

    const ev = eventMap[ticket.eventId];
    let parsed = null;
    if (ev) {
      parsed = parseMetadata(ev.metadataURI);
    }

    setQrModal({
      open: true,
      qrData,
      eventDetails: parsed || { title: "No Details", date: "N/A", location: "N/A" },
    });
  };

  // Function to close QR modal
  const closeQrModal = () => {
    setQrModal({ open: false, qrData: "", eventDetails: null });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-800 pt-20 p-8 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center pt-6">My Events</h1>

      {loading ? (
        <p className="text-center">Loading your events...</p>
      ) : (
        <>
          {/* Created Events Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Events You Created</h2>
            {myCreatedEvents.length === 0 ? (
              <p>You haven't created any events yet.</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {myCreatedEvents.map((event, index) => {
                  const meta = parseMetadata(event.metadataURI);
                  return (
                    <Link key={index} to="/tickets" state={{ event }}>
                      <EventCard
                        title={meta.title}
                        image={meta.image || "fallback.jpg"}
                        date={meta.date}
                        location={meta.location}
                        price={ethers.formatEther(event.ticketPrice)}
                      />
                    </Link>
                  );
                })}
              </div>
            )}
          </section>

          {/* Booked Tickets Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4">Tickets You Booked</h2>
            {myTickets.length === 0 ? (
              <p>You haven't booked any tickets yet.</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {myTickets.map((ticket, index) => {
                  const ev = eventMap[ticket.eventId];
                  if (!ev) {
                    return (
                      <div key={index} className="p-4 border border-gray-500 rounded">
                        <p>Event ID: {ticket.eventId}</p>
                        <p>Ticket ID: {ticket.tokenId}</p>
                      </div>
                    );
                  }
                  const meta = parseMetadata(ev.metadataURI);
                  return (
                    <div
                      key={index}
                      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                    >
                      <img
                        src={meta.image || "fallback.jpg"}
                        alt={meta.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <h2 className="text-xl font-bold mb-2">{meta.title}</h2>
                        <p className="text-gray-400 mb-1">📅 {meta.date}</p>
                        <p className="text-gray-400 mb-1">📍 {meta.location}</p>
                        <p className="text-gray-400 mb-2">Ticket ID: {ticket.tokenId}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-orange-500 font-semibold">
                            {ethers.formatEther(ev.ticketPrice)} ETH
                          </p>
                          <button
                            onClick={() => openQrModal(ticket)}
                            className="bg-orange-700 hover:bg-orange-600 text-white font-medium py-1 px-3 rounded transition-colors"
                          >
                            Show QR Code
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </>
      )}

      {/* QR Code Modal */}
      {qrModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
            <button
              onClick={closeQrModal}
              className="absolute top-2 right-2 bg-orange-700 hover:bg-orange-600 text-white font-bold py-1 px-2 rounded"
            >
              ✖
            </button>
            <div className="p-4 bg-white rounded">
              <QRCode value={qrModal.qrData} size={200} bgColor="#090909" fgColor="#ffffff" />
            </div>
            {/* Event Details next to QR code */}
            {qrModal.eventDetails && (
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-2">{qrModal.eventDetails.title}</h2>
                <p className="text-gray-400 mb-1">📅 {qrModal.eventDetails.date}</p>
                <p className="text-gray-400 mb-1">📍 {qrModal.eventDetails.location}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyEvents;
