import React from 'react'
import Navbar from "../../Navbar/Navbar"
import HeroSection from '../HeroSection/HeroSection'
import FeatureSection from '../FeatureSection/FeatureSection'
import Contract from "../../Contract/ContractEnter"
function HomeSection() {
  return (
    <div className=''>
      <HeroSection/>
      <FeatureSection/>
      <Contract></Contract>
    </div>
  )
}

export default HomeSection