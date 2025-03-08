import React from 'react'

function EventCard({ title, date, location, image, price }) {
    return (
      <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:scale-y-105 transition-transform duration-600 pb-4">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
          <p className="text-sm text-gray-300">{date}</p>
          <p className="text-sm text-gray-300">{location}</p>
          <div className='flex justify-between'>
          <button className="mt-4 px-4 py-2 bg-orange-700 text-white text-sm font-medium rounded-md hover:bg-white hover:text-black">
            View Details
          </button>
          <span className='right-0 mt-4 px-4 py-2 text-gray-100'>{price} ETH</span>
          </div>
        </div>
      </div>
    );
  }
  
  export default EventCard;
  
