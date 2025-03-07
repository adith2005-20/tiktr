import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const naviButton = useNavigate();

  return (
    <>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-[url('concertimg.jpeg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-[10%] bg-gradient-to-t from-black to-transparent"></div>
        </div>

        <div className="relative z-10 flex flex-col min-h-screen justify-start px-10 py-20 pt-32">
          <div className="text-white text-6xl font-bold font-serif drop-shadow-lg text-left leading-snug">
            <span>Concerts.</span>
            <br />
            <span>Redefined.</span>
          </div>
          <div className="text-white text-lg mt-4 text-left">Welcome to Tiktr</div>
          <div className="text-white font-light text-1 mt-4 text-left max-w-lg">
            Your ultimate destination for discovering and booking unforgettable live events, shows, and
            performances. From concerts to theater, comedy to festivals, we bring you closer to the
            moments that matter most.
          </div>
          <div className="pt-12 flex items-center gap-4 justify-start">
            <button
              onClick={() => naviButton('/FindShows')}
              className="bg-[#c2410c] text-white bg-opacity-95 text-xl font-light hover:scale-105 hover:bg-gray-200 hover:text-black focus:outline-1 outline-slate-300 p-2 w-40 rounded-3xl transition-transform font-serif"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      <section className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-4 pb-[200px]">
        <h1 className="text-4xl font-bold mb-4 pt-[200px]">Explore</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl w-full pt-[120px]">
          {[
            { title: 'Concerts', description: '', image: 'concert-tile.webp' },
            { title: 'Movies', description: '', image: 'movies-tile2.webp' },
            { title: 'Webinars', description: '', image: 'webinar-tile2.webp' },
          ].map((event, index) => (
            <div
              key={index}
              className="relative group h-[600px] overflow-hidden rounded-lg shadow-lg bg-gray-800"
            >
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
              <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/20"></div>
              <div className="absolute top-0 left-0 p-6">
                <h3 className="text-2xl font-bold">{event.title}</h3>
                {event.description && <p className="mt-2 text-sm">{event.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black to-gray-800 text-white">
        <h2 className="text-4xl font-bold mb-4">Stay Connected</h2>
        <p className="text-lg max-w-2xl text-center">
          Join our community and never miss out on your favorite artist's performances.
        </p>
      </section>
    </>
  );
}

export default Home;
