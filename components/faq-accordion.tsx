'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'How much does an RV solar system cost?',
    answer: 'RV solar systems typically range from $2,000 to $15,000+ depending on your power needs, battery capacity, and the complexity of the install. During your free assessment call, we\'ll discuss your specific usage and give you an accurate quote with no surprises.',
  },
  {
    question: 'What brands do you use?',
    answer: 'We exclusively use Victron Energy components for all our installs. Victron is the gold standard in RV solar - they offer the most reliable, efficient, and feature-rich equipment on the market. Their monitoring app lets you check your system status from anywhere.',
  },
  {
    question: 'How long does installation take?',
    answer: 'Most of our installations are completed in a single day. More complex builds with multiple batteries or extensive wiring may take 2 days. We\'ll give you a clear timeline during your assessment call.',
  },
  {
    question: 'Do you service areas outside Burleson?',
    answer: 'Yes! While we\'re based in Burleson, we serve the entire DFW metroplex and surrounding areas. We also occasionally travel for larger projects - just ask during your call.',
  },
  {
    question: 'Can solar power my RV air conditioner?',
    answer: 'Absolutely! Running AC on solar is one of the most common requests we get. It requires a properly sized system with adequate battery capacity, but it\'s definitely achievable. We\'ll help you design a system that can handle your AC and all your other needs.',
  },
  {
    question: 'What happens during the free assessment call?',
    answer: 'It\'s a casual 15-20 minute conversation where we learn about your RV, how you camp, and what you want to achieve with solar. We\'ll answer your questions, discuss options, and if it\'s a good fit, we\'ll schedule an in-person assessment. No pressure, no hard sell.',
  },
]

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-heading text-3xl text-center text-foreground mb-8">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-card rounded-xl border border-border overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
              >
                <span className="font-medium text-foreground pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <p className="px-5 pb-5 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
