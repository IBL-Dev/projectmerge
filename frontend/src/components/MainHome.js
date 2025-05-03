import React from 'react'
import BannerImage from "../images/home-banner-background.png"

const MainHome = () => {
  return (
    <div className='home-container'>
      <div className='home-banner-container'>
        <div className='home-bannerImage-container'>
           <img src={BannerImage}/>
           
        </div>
        <div className='home-text-section'>
            <h1 className='primary-heading'>
                Your Faviourite Fod
            </h1>
            <p className='primary-text'>bswbj  kbf  sj kj kss sjcbsjkbs kskjbjs bjkgbe ewfbwjb </p>
            <button className='secondary-button'>
                order now
            </button>
        </div>
        <div className='home-image-container'>
              <img src={BannerImage}/>
        </div>
      </div>
    </div>
  )
}

export default MainHome;
