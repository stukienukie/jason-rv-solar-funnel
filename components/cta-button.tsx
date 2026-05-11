'use client'

import { Zap } from 'lucide-react'

interface CTAButtonProps {
  onClick: () => void
}

export function CTAButton({ onClick }: CTAButtonProps) {
  return (
    <section className="px-4 py-6 text-center">
      <button
        onClick={onClick}
        className="w-full max-w-[440px] mx-auto flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-8 rounded-xl transition-colors text-lg cursor-pointer shadow-lg shadow-primary/20"
      >
        <Zap className="w-5 h-5" />
        Find My Perfect Solar Package →
      </button>
      <p className="text-sm text-muted-foreground mt-3">
        60-second quiz · Free · No commitment
      </p>
    </section>
  )
}
