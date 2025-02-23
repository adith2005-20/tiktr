import React from 'react'
import { Link } from 'react-router-dom'

function ShowLister() {
  return (
    <>
    <div className='min-h-64 bg-gradient-to-b from-black via-black to-[#c2410c]'>
        <div className='bg-opacity-50 flex'><span className='text-white text-6xl font-serif mx-auto text-center justify-center pt-96 font-semibold'>Host any event with tiktr</span></div>
    </div>
    <div className='min-h-screen bg-orange-700'>
        <div className='grid lg:grid-cols-3 sm:grid-cols-2 justify-between gap-4 p-12 text-white font-semibold'>
            <Link><div className='hover:scale-105 transition-transform duration-150 pointer-events-none'><img src='\Sing a song.png' className='scale-50 object-cover rounded-2xl'/><span>Concerts</span></div></Link>
            <Link><div className='hover:scale-105 transition-transform duration-150 pointer-events-none'><img src='\Sing a song.png' className='scale-50 object-cover rounded-2xl'/><span>Concerts</span></div></Link>
            <Link><div className='hover:scale-105 transition-transform duration-150 pointer-events-none'><img src='\Sing a song.png' className='scale-50 object-cover rounded-2xl'/><span>Concerts</span></div></Link>
            <Link><div className='hover:scale-105 transition-transform duration-150 pointer-events-none'><img src='\Sing a song.png' className='scale-50 object-cover rounded-2xl'/><span>Concerts</span></div></Link>
            <Link><div className='hover:scale-105 transition-transform duration-150 pointer-events-none'><img src='\Sing a song.png' className='scale-50 object-cover rounded-2xl'/><span>Concerts</span></div></Link>
            <Link><div className='hover:scale-105 transition-transform duration-150 pointer-events-none'><img src='\Sing a song.png' className='scale-50 object-cover rounded-2xl'/><span>Concerts</span></div></Link>
            
            

        </div>
    </div>
    </>
  )
}

export default ShowLister
