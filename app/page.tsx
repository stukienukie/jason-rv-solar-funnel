'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { StatsRow } from '@/components/stats-row'
import { CTAButton } from '@/components/cta-button'
import { TrustRow } from '@/components/trust-row'
import { ProblemSection } from '@/components/problem-section'
import { HowItWorks } from '@/components/how-it-works'
import { GoogleReviews } from '@/components/google-reviews'
import { PhotoGrid } from '@/components/photo-grid'
import { UrgencySection } from '@/components/urgency-section'
import { BookingSection } from '@/components/booking-section'
import { FAQAccordion } from '@/components/faq-accordion'
import { Footer } from '@/components/footer'
import { AssessmentModal } from '@/components/assessment-modal'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showBooking, setShowBooking] = useState(false)

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  const handleFormSuccess = () => {
    setIsModalOpen(false)
    setShowBooking(true)
  }

  useEffect(() => {
    if (showBooking) {
      setTimeout(() => {
        document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [showBooking])

  return (
    <main className="min-h-screen bg-background">

      {/* 1. HERO — above the fold */}
      <Header />
      <StatsRow />
      <CTAButton onClick={handleOpenModal} />

      {/* 2. TRUST SIGNALS */}
      <TrustRow />

      {/* 3. PROBLEM / AGITATION */}
      <ProblemSection />

      {/* RECENT INSTALLATIONS */}
      <PhotoGrid />

      {/* 4. SOLUTION & OFFER */}
      <HowItWorks />

      {/* 5. DEEP SOCIAL PROOF */}
      <GoogleReviews />
      <CTAButton onClick={handleOpenModal} />

      {/* 6. URGENCY & SCARCITY */}
      <UrgencySection />

      {/* 7. CTA & CHECKOUT */}
      <CTAButton onClick={handleOpenModal} />
      <BookingSection isVisible={showBooking} />

      <FAQAccordion />
      <Footer />

      <AssessmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleFormSuccess}
      />
    </main>
  )
}
