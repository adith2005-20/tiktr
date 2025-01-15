import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const naviButton = useNavigate();
  return (
    <>
      <div className="bg-gradient-to-b from-black to-[#c2410c] text-center min-h-screen">
        <div className="top-0 left-0 justify-start my-auto items-start w-full h-full flex-col flex bg-opacity-50 bg-black min-h-screen px-10 py-20">
          <div className="text-white text-6xl font-bold font-serif drop-shadow-lg text-left leading-snug">
            <span>Concerts.</span>
            <br />
            <span>Redefined.</span>
          </div>
          <div className="text-white text-l mt-4 text-left">Help tiktr find you your next concert</div>
          <div className="text-white font-light text-s mt-4 text-left max-w-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
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

        <section className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
          <h2 className="text-4xl font-bold mb-4">Explore Events</h2>
          <p className="text-lg max-w-2xl text-center p-4">
            Discover amazing concerts happening near you. From indie bands to global superstars, we've got it all
            covered.
          </p>
        </section>

        <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black to-gray-800 text-white">
          <h2 className="text-4xl font-bold mb-4">Stay Connected</h2>
          <p className="text-lg max-w-2xl text-center">
            Join our community and never miss out on your favorite artist's performances.
          </p>
        </section>
      </div>
    </>
  );
}

export default Home;
