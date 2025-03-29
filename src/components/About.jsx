import React from 'react'
import personImage from '../assets/images/aboutPagePerson.webp'

function About() {
  return (
    <>
      <div className="bg-black/90 text-white font-semibold text-center text-6xl p-4 min-h-screen pt-[90px]">
        <span className="block mt-8 font-bold">About us</span>

        <div className="flex justify-center items-center w-40 h-40 mx-auto mt-20 gap-x-20">
          <img src={personImage} className="rounded-full p-2 object-cover" alt="Person" />
          <img src={personImage} className="rounded-full p-2 object-cover" alt="Person" />
          <img src={personImage} className="rounded-full p-2 object-cover" alt="Person" />
        </div>
        <div className="font-light text-lg p-4 mt-20 mb-20 text-center">
          At Tiktr, we're not just redefining live events—we're pioneering a revolution in ticketing. Leveraging the power of blockchain technology, we ensure that your tickets are secure, authentic, and uniquely yours. By creating a platform built on transparency and trust, we're tackling issues like ticket fraud and scalping, making your concert experience worry-free.
          <br /><br />
          Our team combines a love for music, cutting-edge technology, and the belief that everyone deserves access to their favorite performances. Each smile represents our dedication to innovation, whether it's through blockchain-based ticketing or connecting fans with unforgettable events.
          <br /><br />
          Join us as we transform the live entertainment industry, one ticket at a time!
        </div>
      </div>
    </>
  )
}

export default About
