'use client'

import { CheckCircle2 } from 'lucide-react'

interface BookingSectionProps {
  isVisible: boolean
}

export function BookingSection({ isVisible }: BookingSectionProps) {
  if (!isVisible) return null

  return (
    <section id="booking-section" className="px-4 py-12 scroll-mt-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
          <CheckCircle2 className="w-4 h-4" />
          {"You're in — request received"}
        </div>

        <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
          One Last Step: Pick a Time for Your Call
        </h2>

        <p className="text-muted-foreground mb-8">
          {"Select a time that works best for you and Jason will give you a call. No pressure, just honest advice."}
        </p>

        <div className="rounded-xl overflow-hidden border border-border">
          <iframe
            src="https://links.monox.ai/widget/booking/TIPJcJk6n571COn8GUQa"
            className="w-full"
            style={{ height: 'min(700px, 80vh)', border: 'none' }}
            title="Book a call with Jason"
          />
        </div>
      </div>
    </section>
  )
}
