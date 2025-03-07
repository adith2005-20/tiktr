import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import EventCard from './EventCard';
import { Link } from 'react-router-dom';

function ShowFinder() {
  const [query, setQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchqueryfunc = (e) => {
    setQuery(e.target.value);
    console.log(e.target.value);
  };

  // Trending horizontal cards
  const horizontalCards = [
    { id: 1, title: '', image: 'findshowscard1.jpg', link: '#' },
    { id: 2, title: '', image: 'findshowscard2.jpg', link: '#' },
    { id: 3, title: '', image: 'findshowscard3.jpg', link: '#' },
    { id: 4, title: '', image: 'findshowscard4.jpg', link: '#' },
    { id: 5, title: '', image: 'findshowscard5.jpg', link: '#' },
    { id: 6, title: '', image: 'findshowscard6.jpg', link: '#' },
  ];

  // React-slick settings for an infinite carousel with auto scroll.
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
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
        },
      },
    ],
  };

  // Events data
  const events = [
    {
      title: 'Coldplay Concert',
      date: 'June 25, 2025',
      location: 'Mumbai, IND',
      image: 'https://habs.uq.edu.au/files/2777/concert-crowd.jpg',
      price: '0.01',
    },
    {
      title: 'Jazz Night',
      date: 'July 5, 2025',
      location: 'Delhi, IND',
      image: 'https://habs.uq.edu.au/files/2777/concert-crowd.jpg',
      price: '0.01',
    },
    {
      title: 'Rock Festival',
      date: 'August 10, 2025',
      location: 'Pune, IND',
      image: 'https://habs.uq.edu.au/files/2777/concert-crowd.jpg',
      price: '0.01',
    },
    {
      title: 'Comedy Night',
      date: 'September 15, 2025',
      location: 'Kolkata, IND',
      image: 'https://habs.uq.edu.au/files/2777/concert-crowd.jpg',
      price: '0.01',
    },
    {
      title: 'Indie Music Fest',
      date: 'October 20, 2025',
      location: 'Chennai, IND',
      image: 'https://habs.uq.edu.au/files/2777/concert-crowd.jpg',
      price: '0.01',
    },
  ];

  return (
    <div className="bg-gradient-to-b from-black to-gray-800 pt-[100px]">
      {/* Inline style overrides for slick dots and custom card width */}
      <style>{`
        .slick-dots li button:before {
          font-size: 12px;
          color: #ffffff; /* White for inactive dots */
        }
        .slick-dots li.slick-active button:before {
          color: #ffa500; /* Orange for the active dot */
        }
        .custom-card {
          width: 500px;
        }
      `}</style>

      {/* Trending Header */}
      <h1 className="text-orange-200 text-opacity-90 text-2xl font-bold drop-shadow-lg leading-snug text-center pb-8 pt-4">
        <span className="inline-flex items-center">
          <svg
            xmlns="public/trending-up-outline-svgrepo-com.svg"
            className="w-8 h-8 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 17l6-6 4 4 8-8" />
          </svg>
          TRENDING
        </span>
      </h1>

      {/* Carousel using react-slick */}
      <div className="w-full px-8">
        <Slider {...settings}>
          {horizontalCards.map((card) => (
            <div key={card.id} className="px-2 custom-card">
              <a
                href={card.link}
                className="block rounded-lg shadow-lg overflow-hidden relative transition-all duration-300"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-[370px] object-cover"
                />
              </a>
            </div>
          ))}
        </Slider>
      </div>

    
      <div className="flex items-center gap-4 px-8 mt-8 w-full justify-center pt-[100px]">
        {/* Movies Button */}
        <button
          className="bg-[#103628] text-gray-400 bg-opacity-60 text-[16px]
                     hover:scale-105 hover:bg-gray-500 hover:text-black
                     focus:outline-1 outline-slate-300 px-4 py-2 
                     rounded-3xl transition-transform font-[Poppins]"
        >
          Movies
        </button>

        {/* Concerts Button */}
        <button
          className="bg-[#103628] text-gray-400 bg-opacity-60 text-[16px]
                     hover:scale-105 hover:bg-gray-500 hover:text-black
                     focus:outline-1 outline-slate-300 px-4 py-2
                     rounded-3xl transition-transform font-[Poppins]"
        >
          Concerts
        </button>

        {/* Search Icon + Expanding Bar (anchored on the right, expands left) */}
        <motion.div
          initial={{ width: 40 }}
          animate={{ width: isSearchOpen ? 300 : 40 }}
          transition={{ duration: 0.3 }}
          style={{ 
            height: 40,
            transformOrigin: 'right center' // Anchor on the right, expands left
          }}
          className="flex items-center bg-[#103628] bg-opacity-60
                     rounded-full overflow-hidden"
        >
          {/* Show input only if open */}
          {isSearchOpen && (
            <input
              type="text"
              placeholder="Search for events..."
              className="flex-1 px-4 py-2 text-gray-200 bg-transparent
                         focus:outline-none font-[Poppins] "
              value={query}
              onChange={searchqueryfunc}
            />
          )}

          {/* Icon Button */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="flex items-center justify-center w-10 h-10 hover:scale-105 text-gray-400 hover:bg-gray-500 hover:text-black
                     focus:outline-1 outline-slate-300 transition-transform"
          >
            <Search size={20} color="currentColor" />
          </button>
        </motion.div>
      </div>

      {/* Events Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto pb-8 mt-8 px-4">
        {events.map((event, index) => (
          <Link key={index} to="/tickets" state={{ event }}>
            <EventCard
              title={event.title}
              image={event.image}
              date={event.date}
              location={event.location}
              price={event.price}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ShowFinder;
