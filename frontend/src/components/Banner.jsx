import React from 'react'
import banner from '../image/logosinfondo.png'

const Banner = () => {
  return (
    <div className='container mt-5 '>
        <img className='img-fluid w-50' src={banner} alt="banner"/>
    </div>
  )
}

export default Banner
