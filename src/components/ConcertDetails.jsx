import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

function ConcertDetails({ title, date, location, image, price, concertid }) {
  return (
    
    <>
    <div className='min-h-screen bg-black'>
        <span className='justify-center text-center'>${title}</span>
        <div>

        </div>

    </div>
    </>
  )
}

//figure out how to get the argument to the component and render all elements as such. can think of importing a function from showfinder, where the array is. might have to make it a key:value pair array. <-yes.
export default ConcertDetails
