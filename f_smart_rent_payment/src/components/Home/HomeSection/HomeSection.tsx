import React from 'react'
import Navbar from "../../Navbar/Navbar"
import HeroSection from '../HeroSection/HeroSection'
import FeatureSection from '../FeatureSection/FeatureSection'
function HomeSection() {
  return (
    <div className=''>
      <Navbar/>
      <HeroSection/>
      <FeatureSection/>
    </div>
  )
}

export default HomeSection