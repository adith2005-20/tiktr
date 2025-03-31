import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { Search, TrendingUp as TrendingUpIcon } from "lucide-react";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import { connectWallet, getContractInstance, getAllEventIds } from "../blockchain";
import { ethers } from "ethers";

// Helper function to parse metadata from metadataURI query parameters,
// now also extracting eventType.
function parseMetadata(metadataURI) {
  try {
    const url = new URL(metadataURI);
    return {
      title: url.searchParams.get("title") || "No Title",
      desc: url.searchParams.get("desc") || "No Description",
      date: url.searchParams.get("date") || "N/A",
      location: url.searchParams.get("location") || "N/A",
      image: url.searchParams.get("image") || "",
      eventType: url.searchParams.get("eventType") || ""  // New field for event type
    };
  } catch (error) {
    return {
      title: "No Title",
      desc: "No Description",
      date: "N/A",
      location: "N/A",
      image: "",
      eventType: ""
    };
  }
}

function ShowFinder() {
  const [query, setQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [onChainEvents, setOnChainEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const loadMoreRef = useRef(null);

  // Fetch on-chain events on mount
  useEffect(() => {
    async function fetchEvents() {
      setLoadingEvents(true);
      try {
        const signer = await connectWallet();
        const contract = getContractInstance(signer);
        const ids = await getAllEventIds(signer);
        const eventsArr = await Promise.all(
          ids.map(async (id) => {
            const ev = await contract.events(id);
            return {
              id: id.toString(),
              creator: ev.creator,
              ticketPrice: ev.ticketPrice.toString(),
              metadataURI: ev.metadataURI,
              maxTickets: ev.maxTickets.toString(),
              ticketsSold: ev.ticketsSold.toString(),
            };
          })
        );
        setOnChainEvents(eventsArr);
      } catch (error) {
        console.error("Error fetching on-chain events:", error);
      }
      setLoadingEvents(false);
    }
    fetchEvents();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setVisibleCount(6);
  }, [query]);

  const searchqueryfunc = (e) => {
    setQuery(e.target.value);
  };

  // Filter events based on metadataURI search
  const filteredEvents = onChainEvents.filter(event =>
    event.metadataURI.toLowerCase().includes(query.toLowerCase())
  );
  const currentEvents = filteredEvents.slice(0, visibleCount);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredEvents.length) {
          setVisibleCount(prev => prev + 6);
        }
      },
      { threshold: 0.1 }
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMoreRef, filteredEvents, visibleCount]);

  // Carousel settings for horizontal cards
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: '0px',
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          arrows: false,
        },
      },
    ],
  };

  const horizontalCards = [
    { id: 1, title: '', image: 'findshowscard1.jpg', link: '#' },
    { id: 2, title: '', image: 'findshowscard2.jpg', link: '#' },
    { id: 3, title: '', image: 'findshowscard3.jpg', link: '#' },
    { id: 4, title: '', image: 'findshowscard4.jpg', link: '#' },
    { id: 5, title: '', image: 'findshowscard5.jpg', link: '#' },
    { id: 6, title: '', image: 'findshowscard6.jpg', link: '#' },
  ];

  return (
    <div className="bg-black/90 pt-[100px]">
      <style>{`
        .slick-dots li button:before {
          font-size: 12px;
          color: #ffffff;
        }
        .slick-dots li.slick-active button:before {
          color: #ffa500;
        }
        .custom-card {
          width: 500px;
        }
      `}</style>

      <h1 className="text-white text-4xl font-bold drop-shadow-lg ml-20 pt-4 pb-4">
        <span className="flex items-center gap-2">
          Now Trending
          <TrendingUpIcon className="w-8 h-8" />
        </span>
      </h1>

      <div className="w-full px-8 pb-16">
        <Slider {...sliderSettings}>
          {horizontalCards.map((card) => (
            <div key={card.id} className="px-2 custom-card">
              <a
                href={card.link}
                className="block rounded-lg shadow-lg overflow-hidden relative transition-all duration-300"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-[300px] object-cover"
                />
              </a>
            </div>
          ))}
        </Slider>
      </div>

      {/* Search & Category Buttons */}
      <div className="flex items-center gap-4 px-2 mt-2 w-full justify-center pt-4">
        <button
          className="bg-[#103628] text-gray-400 bg-opacity-60 text-[16px]
                     hover:scale-105 hover:bg-gray-500 hover:text-black
                     focus:outline-1 outline-slate-300 px-4 py-2 
                     rounded-3xl transition-transform"
        >
          Movies
        </button>
        <button
          className="bg-[#103628] text-gray-400 bg-opacity-60 text-[16px]
                     hover:scale-105 hover:bg-gray-500 hover:text-black
                     focus:outline-1 outline-slate-300 px-4 py-2
                     rounded-3xl transition-transform"
        >
          Concerts
        </button>
        <motion.div
          initial={{ width: 40 }}
          animate={{ width: isSearchOpen ? 300 : 40 }}
          transition={{ duration: 0.3 }}
          style={{ height: 40, transformOrigin: 'right center' }}
          className="flex items-center bg-[#103628] bg-opacity-60 rounded-full overflow-hidden"
        >
          {isSearchOpen && (
            <input
              type="text"
              placeholder="Search for events..."
              className="flex-1 px-4 py-2 text-gray-200 bg-transparent focus:outline-none"
              value={query}
              onChange={searchqueryfunc}
            />
          )}
          <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="flex items-center justify-center w-10 h-10 hover:scale-105 text-gray-400 hover:bg-gray-500 hover:text-black focus:outline-1 outline-slate-300 transition-transform"
          >
            <Search size={20} color="currentColor" />
          </button>
        </motion.div>
      </div>

      {/* On-Chain Events Listing */}
      <div className="cards-container">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto pb-8 mt-8 px-4">
          {loadingEvents ? (
            <p className="text-white text-center">Loading events...</p>
          ) : (
            currentEvents.map((event, index) => {
              // Parse metadata from the event's metadataURI
              const metadata = parseMetadata(event.metadataURI);
              const { title, date, location, image, eventType } = metadata;
              return (
                <Link key={index} to="/tickets" state={{ event }}>
                  <EventCard
                    title={title || "Untitled Event"}
                    image={image || "fallback.jpg"}
                    date={date || "N/A"}
                    location={location || "N/A"}
                    price={ethers.formatEther(event.ticketPrice)}
                    eventType={eventType}  // Pass eventType to EventCard
                  />
                </Link>
              );
            })
          )}
        </div>
        {/* Sentinel element for infinite scroll */}
        <div ref={loadMoreRef} className="h-10"></div>
      </div>
    </div>
  );
}

export default ShowFinder;
