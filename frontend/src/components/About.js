import React from 'react'
import AboutBackground from '../images/about-background.png'
import AboutBackgroundImage from '../images/about-background-image.png'

const About = () => {
  return (
    <div className='about-section-container'>
      <div className='about-background-image-container'>
        <img src={AboutBackground}/>
      </div>
      <div className='about-section-image-container'>
            <img src={AboutBackgroundImage}/>
      </div>
      <div className='about-section-text-container'>
         <P className='primary-subheading'>About</P>
         <h1 className='primary-heading'>
            Food Is Important Part Of a 
         </h1>
         <p className='primary-text'>
            knel kwne knwn wknwlk w lk wl   l wk lekwnl wekln kwekl weknka lkda 
         </p>
         <p className='primary-text'>
            iuggest      bkb fkjbff fwbek fbj fjbc jbfwe kw kjw kjf jfsbkj 
         </p>
         <div className='about-button-container'>
            <button className='secondary-button'>Learn More</button>
            <button className='watch-video-button'>Watch Video</button>
         </div>
      </div>
    </div>
  )
}

export default About
