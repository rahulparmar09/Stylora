import React from 'react'
import Hero from './Hero'
import { HeroSection } from './HeroSection'
import TopService from './TopService'
import Category from './Category'
import Gallary from './Gallery'
import Menu from './Menu'
import { FixedBg } from './FixedBg'

const Home = () => {
  return (
    <div>
        <Hero />
        <HeroSection />
        <TopService />
        <Category />
        <Gallary />
        <Menu />
        <FixedBg />
    </div>
  )
}

export default Home