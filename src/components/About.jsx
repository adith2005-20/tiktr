import React from 'react'

function About() {
  return (
    <>
    <div className='bg-black text-white font-semibold text-6xl p-4 text-center min-h-screen'>
        <span className='font-serif'>About us</span>
        <div className='flex justify-center items-center w-40 h-40 mx-auto mt-20 gap-x-20'>
            
            <img src='aboutPagePerson.webp' className='rounded-full object-cover'/>
            <img src='aboutPagePerson.webp' className='rounded-full object-cover'/>
            <img src='aboutPagePerson.webp' className='rounded-full object-cover'/>
        </div>
        <div className='font-light text-lg p-4 mt-20'>
        At Tiktr, we're not just redefining live events—we're pioneering a revolution in ticketing. Leveraging the power of blockchain technology, we ensure that your tickets are secure, authentic, and uniquely yours. By creating a platform built on transparency and trust, we're tackling issues like ticket fraud and scalping, making your concert experience worry-free.

Our team combines a love for music, cutting-edge technology, and the belief that everyone deserves access to their favorite performances. Each smile represents our dedication to innovation, whether it's through blockchain-based ticketing or connecting fans with unforgettable events.

Join us as we transform the live entertainment industry, one ticket at a time!
        </div>
    </div>
    </>
  )
}

export default About
