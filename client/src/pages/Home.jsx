import React from 'react'
import HeroSection from '../components/home/Hero.jsx'
import KeyFeatures from '../components/home/Feature.jsx'
import CTASection from '../components/home/Cta.jsx'

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
      {/*
      
        <div>
          <ErrorBoundary>
            <Testimonials />
          </ErrorBoundary>
        </div>
      */}
      {/** <CTA  /> */}
        <div>
          <CTASection/>
        </div>   
    </div>
  )
}
