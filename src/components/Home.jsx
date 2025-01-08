import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const naviButton=useNavigate()
  return (
    <>
    <div className=' bg-black text-center min-h-screen'>
      
      <div className='top-0 left-0 justify-center text-center my-auto items-center w-full h-full flex-col flex bg-opacity-50 bg-black min-h-screen'>
      <span className='text-white text-5xl p-4 font-bold font-serif drop-shadow-lg'>Concerts. Redefined.</span>
      <div className='text-white text-l p-4'>Help tiktr find you your next concert</div>
      <div className='text-white font-light text-s p-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
      <div className='flex items-center gap-4 justify-between m-4'>
        <button onClick={()=>naviButton('/FindShows')} className='bg-white bg-opacity-95 text-xl font-light hover:scale-105 hover:bg-opacity-5 hover:text-white focus:outline-1 outline-slate-300 p-2 w-40 rounded-3xl transition-transform shadow-black shadow-lg '>Get Started</button>
        <button onClick={()=>naviButton('/About')} className=' bg-black text-white text-xl font-light hover:scale-105 outline-1 outline-slate-300 p-2 w-40 rounded-3xl transition-transform shadow-white hover:shadow-none hover:shadow-white shadow-2xl '>About us</button></div>
    </div>
    <section className='min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white'>
        <h2 className='text-4xl font-bold mb-4'>Explore Events</h2>
        <p className='text-lg max-w-2xl text-center'>
          Discover amazing concerts happening near you. From indie bands to global superstars, we've got it all covered.
        </p>
      </section>

      <section className='min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black to-gray-800 text-white'>
        <h2 className='text-4xl font-bold mb-4'>Stay Connected</h2>
        <p className='text-lg max-w-2xl text-center'>
          Join our community and never miss out on your favorite artist's performances.
        </p>
      </section>
    </div>
    
    </>
  )
}

export default Home
