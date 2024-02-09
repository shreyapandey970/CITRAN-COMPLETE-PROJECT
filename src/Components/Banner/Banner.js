import React from 'react'
import Carousel from './Carousel';

const Banner = () => {
  return (
    <>
    <div className='container'>
        <img src={require('../../Images/cryptoback.jpg')}  id="cryptoimg" />
         <div id="Banner">
               CITRAN 
         <p id="tagline">Glance through the worldwide Cryptos!!</p>
         
        </div>
        <Carousel />
    </div>
    
    </>
  )
}

export default Banner;