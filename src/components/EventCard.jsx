import React from 'react';

function EventCard({ title, date, location, image, price, eventType }) {
  return (
    <div className="bg-black/80 shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-800 pb-4">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
        <p className="text-sm text-gray-300">{date}</p>
        <p className="text-sm text-gray-300">{location}</p>
        {eventType && (
          <p className="text-sm text-gray-300">Type: {eventType}</p>
        )}
        <div className="flex justify-between items-center mt-4">
          <button className="px-4 py-2 bg-orange-700 text-white text-sm font-medium rounded-md hover:bg-white hover:text-black transition-transform duration-800">
            View Details
          </button>
          <span className="px-4 py-2 text-gray-100">{price} ETH</span>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
