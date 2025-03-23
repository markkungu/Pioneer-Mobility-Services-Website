import React from 'react'
import HeroSection from '../components/home/Hero.jsx'
import KeyFeatures from '../components/home/Feature.jsx'
import CTASection from '../components/home/Cta.jsx'
import Testimonials from '../components/home/Testimonial.jsx'

export default function Home() {
  return (
    <div >
      {/** <Hero /> */}
      <div>
        <HeroSection />
      </div>
      {/** <key features /> */}
        <div>
          <KeyFeatures />
        </div>
      {/** <testimonial /> */}    
        <div>
            <Testimonials />
        </div>
     
      {/** <CTA  /> */}
        <div>
          <CTASection/>
        </div>   
    </div>
  )
}
