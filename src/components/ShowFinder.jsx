import React from 'react'
import { useState } from 'react'
import EventCard from './EventCard';
function ShowFinder() {
    const [query, setQuery] = useState(); 

    const searchqueryfunc=(q)=>{
        setQuery(q.target.value)
        console.log(q.target.value)
    }
    const events = [
        {
          title: 'Coldplay Concert',
          date: 'June 25, 2025',
          location: 'Los Angeles, CA',
          image: 'https://habs.uq.edu.au/files/2777/concert-crowd.jpg',
          price:'199'
        },
        {
          title: 'Jazz Night',
          date: 'July 5, 2025',
          location: 'New Orleans, LA',
          image: 'https://habs.uq.edu.au/files/2777/concert-crowd.jpg',
          price:'599'
        },
        {
          title: 'Rock Festival',
          date: 'August 10, 2025',
          location: 'Chicago, IL',
          image: 'https://habs.uq.edu.au/files/2777/concert-crowd.jpg',
          price:'1199'
        },
        {
          title: 'Comedy Night',
          date: 'September 15, 2025',
          location: 'New York, NY',
          image: 'https://habs.uq.edu.au/files/2777/concert-crowd.jpg',
          price:'99'
        },
        {
          title: 'Indie Music Fest',
          date: 'October 20, 2025',
          location: 'Seattle, WA',
          image: 'https://habs.uq.edu.au/files/2777/concert-crowd.jpg',
          price:'399'
        },
      ];
  return (
    <div className='bg-black'>
    <div className="relative w-full max-w-lg mx-auto p-4 flex">
      <input
        type="text"
        placeholder={"Search for events..."}
        className="w-full px-4 py-2 outline-none text-gray-700 bg-white border rounded-lg shadow-sm focus:ring-2  focus:outline-none"
        onChange={(e)=>searchqueryfunc(e)}
      />
      <button
        type="button"
        className="absolute right-0  px-4 py-[9px] text-white bg-orange-700 rounded-r-lg hover:bg-orange-800 focus:outline-none"
      >
        Search
      </button>
    </div>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto pb-8 mt-8 px-4">
        {events.map((event,index)=>(
            <EventCard
            key={index}
            title={event.title}
            image={event.image}
            date={event.date}
            location={event.location}
            price={event.price}
            />
        ))}
      </div>
    </div>
  )
}

export default ShowFinder
