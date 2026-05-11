'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { X, ChevronLeft, Check } from 'lucide-react'

// ── Config ──────────────────────────────────────────────────────────────────
const GHL_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/nvTDFkvOe2lKSzq3JWAo/webhook-trigger/0d4fd632-f13a-436b-9c47-abde0c365336'
const BOOKING_URL = 'https://links.monox.ai/widget/booking/TIPJcJk6n571COn8GUQa'

// ── Types ────────────────────────────────────────────────────────────────────
type Step = 'contact' | 'rvType' | 'goal' | 'qualifier' | 'booking'

interface ContactData {
  firstName: string
  lastName: string
  phone: string
  email: string
}

interface Answers {
  rvType: string
  rvTypeOther?: string
  goal: string
  shopVisit: string
  budgetReady: string
}

interface AssessmentModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

// ── Question data ─────────────────────────────────────────────────────────────
const rvTypeOptions = [
  { value: 'class-a', label: 'Class A Motorhome', emoji: '🚌' },
  { value: 'class-c', label: 'Class C Motorhome', emoji: '🚐' },
  { value: 'fifth-wheel', label: '5th Wheel', emoji: '🏠' },
  { value: 'travel-trailer', label: 'Travel Trailer', emoji: '🚗' },
  { value: 'other', label: 'Other', emoji: '⚡' },
]

const goalOptions = [
  { value: 'run-ac', label: 'Run my AC off-grid', sub: 'Stay cool anywhere without hookups', emoji: '❄️' },
  { value: 'ditch-generator', label: 'Ditch the generator for good', sub: 'No more noise, fuel costs, or fumes', emoji: '🔇' },
  { value: 'go-anywhere', label: 'Go anywhere, stay as long as I want', sub: 'True off-grid freedom with zero limits', emoji: '🗺️' },
  { value: 'cut-costs', label: 'Cut my hookup costs', sub: 'Stop paying campground electric fees', emoji: '💰' },
]

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

export function AssessmentModal({ isOpen, onClose, onSuccess }: AssessmentModalProps) {
  const [step, setStep] = useState<Step>('contact')
  const [contact, setContact] = useState<ContactData>({ firstName: '', lastName: '', phone: '', email: '' })
  const [answers, setAnswers] = useState<Answers>({ rvType: '', rvTypeOther: '', goal: '', shopVisit: '', budgetReady: '' })
  const [errors, setErrors] = useState<Partial<ContactData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isShaking, setIsShaking] = useState(false)

  const STEPS: Step[] = ['contact', 'rvType', 'goal', 'qualifier', 'booking']
  const stepIndex = STEPS.indexOf(step)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      setStep('contact')
      setContact({ firstName: '', lastName: '', phone: '', email: '' })
      setAnswers({ rvType: '', goal: '', shopVisit: '', budgetReady: '' })
      setErrors({})
    }
  }, [isOpen])

  const goBack = () => {
    const prev = STEPS[stepIndex - 1]
    if (prev) setStep(prev)
  }

  // Submit contact to GHL then advance
  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const newErrors: Partial<ContactData> = {}
    if (!contact.firstName.trim()) newErrors.firstName = 'required'
    if (!contact.lastName.trim()) newErrors.lastName = 'required'
    if (!contact.phone.trim()) newErrors.phone = 'required'
    if (!contact.email.trim() || !contact.email.includes('@')) newErrors.email = 'required'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) {
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
      return
    }

    setIsSubmitting(true)
    try {
      await fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: contact.firstName,
          last_name: contact.lastName,
          phone: contact.phone,
          email: contact.email,
          tags: 'rv-solar-funnel,quiz-started',
          source: 'RVsOffGrid Funnel',
        }),
      })
    } catch {
      // Non-blocking — proceed even if webhook fails
    }

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'contact_captured',
      lead_name: `${contact.firstName} ${contact.lastName}`,
      lead_phone: contact.phone,
      lead_email: contact.email,
    })

    setIsSubmitting(false)
    setStep('rvType')
  }

  // Push final answers to GHL on qualifier completion
  const handleQualifierComplete = async () => {
    const rvTypeLabel = answers.rvType === 'other'
      ? (answers.rvTypeOther || 'Other')
      : rvTypeOptions.find(o => o.value === answers.rvType)?.label ?? answers.rvType

    const goalLabel = goalOptions.find(o => o.value === answers.goal)?.label ?? answers.goal

    const shopVisitLabel = answers.shopVisit === 'yes' ? 'Yes, no problem' : 'Not sure yet'
    const budgetLabel = answers.budgetReady === 'yes' ? "Yes, ready to invest" : 'Needs to think about it'

    const notes = [
      `=== RV Solar Funnel — Quiz Results ===`,
      `Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} (CST)`,
      ``,
      `RV Type:       ${rvTypeLabel}`,
      `#1 Goal:       ${goalLabel}`,
      `Can visit Burleson TX: ${shopVisitLabel}`,
      `Budget ready:  ${budgetLabel}`,
      ``,
      `Source: RVsOffGrid Funnel`,
    ].join('\n')

    try {
      await fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: contact.firstName,
          last_name: contact.lastName,
          phone: contact.phone,
          email: contact.email,
          rv_type: rvTypeLabel,
          goal: goalLabel,
          can_visit_burleson: shopVisitLabel,
          budget_ready: budgetLabel,
          notes,
          tags: 'rv-solar-funnel,quiz-complete',
          source: 'RVsOffGrid Funnel',
        }),
      })
    } catch {
      // Non-blocking
    }

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'quiz_complete',
      rv_type: answers.rvType,
      goal: answers.goal,
      shop_visit: answers.shopVisit,
      budget_ready: answers.budgetReady,
    })

    setStep('booking')
    onSuccess()
  }

  if (!isOpen) return null

  // Progress bar — only for quiz steps (not contact, not booking)
  const quizSteps: Step[] = ['rvType', 'goal', 'qualifier']
  const quizIndex = quizSteps.indexOf(step)
  const showProgress = quizIndex !== -1

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-background rounded-t-2xl md:rounded-2xl w-full max-w-[500px] max-h-[92vh] flex flex-col animate-slide-up md:animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky header */}
        <div className="sticky top-0 bg-background rounded-t-2xl md:rounded-t-2xl z-10 px-6 pt-5 pb-4 border-b border-border flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            {stepIndex > 0 && step !== 'booking' ? (
              <button
                onClick={goBack}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-muted transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {showProgress && (
            <div>
              <div className="flex gap-1.5">
                {quizSteps.map((s, i) => (
                  <div
                    key={s}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= quizIndex ? 'bg-primary' : 'bg-muted'}`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Step {quizIndex + 1} of {quizSteps.length}
              </p>
            </div>
          )}
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 p-6">

          {/* ── CONTACT (pre-req gate) ───────────────────────────────── */}
          {step === 'contact' && (
            <div>
              {/* Jason intro hook */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative mb-4">
                  <img
                    src="https://rvsoffgrid.com/assets/jason-olivia-BtSE0MiI.avif"
                    alt="Jason Orr"
                    className="w-20 h-20 rounded-full object-cover object-top shadow-md border-2 border-primary/30"
                  />
                  <span className="absolute -bottom-1 -right-1 text-lg">⚡</span>
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
                  Before we connect you directly with Jason...
                </p>
                <h2 className="font-heading text-2xl text-foreground mb-2 leading-tight">
                  Take this 60-second quiz to find your perfect solar setup
                </h2>
                <p className="text-muted-foreground text-sm max-w-xs">
                  So when Jason calls, he already knows exactly what your RV needs — no guessing, no wasted time.
                </p>
              </div>

              <div className="border-t border-border pt-5 mb-5">
                <p className="text-xs text-center text-muted-foreground mb-4 font-medium">Enter your info to get started — free, no commitment</p>
              </div>

              <form onSubmit={handleContactSubmit} className={`space-y-3 ${isShaking ? 'animate-shake' : ''}`}>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={contact.firstName}
                    onChange={(e) => setContact({ ...contact, firstName: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${errors.firstName ? 'border-destructive' : 'border-input'}`}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={contact.lastName}
                    onChange={(e) => setContact({ ...contact, lastName: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${errors.lastName ? 'border-destructive' : 'border-input'}`}
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${errors.phone ? 'border-destructive' : 'border-input'}`}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${errors.email ? 'border-destructive' : 'border-input'}`}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-8 rounded-xl transition-colors text-lg cursor-pointer disabled:opacity-70 mt-2"
                >
                  {isSubmitting ? 'One sec...' : 'Start My Assessment →'}
                </button>
                <p className="text-xs text-center text-muted-foreground">
                  Your info is secure and will never be shared.
                </p>
              </form>
            </div>
          )}

          {/* ── STEP 1: RV TYPE ─────────────────────────────────────── */}
          {step === 'rvType' && (
            <div>
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">🚌</div>
                <h2 className="font-heading text-2xl text-foreground mb-1">
                  What type of RV do you have?
                </h2>
                <p className="text-muted-foreground text-sm">
                  This helps us design the right system for your rig
                </p>
              </div>

              <div className="space-y-2 mb-6">
                {rvTypeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setAnswers({ ...answers, rvType: opt.value, rvTypeOther: '' })}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer text-left ${
                      answers.rvType === opt.value
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-input hover:border-primary/50 hover:bg-muted/40'
                    }`}
                  >
                    <span className="text-2xl w-8 text-center">{opt.emoji}</span>
                    <span className="font-medium text-foreground flex-1">{opt.label}</span>
                    {answers.rvType === opt.value && <Check className="w-4 h-4 text-primary" />}
                  </button>
                ))}
                {answers.rvType === 'other' && (
                  <input
                    type="text"
                    placeholder="Tell us what type of RV you have..."
                    value={answers.rvTypeOther ?? ''}
                    onChange={(e) => setAnswers({ ...answers, rvTypeOther: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-primary bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    autoFocus
                  />
                )}
              </div>

              <button
                onClick={() => {
                  const ready = answers.rvType && (answers.rvType !== 'other' || (answers.rvTypeOther ?? '').trim())
                  if (ready) setStep('goal')
                }}
                className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-colors ${
                  answers.rvType && (answers.rvType !== 'other' || (answers.rvTypeOther ?? '').trim())
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                Continue →
              </button>
            </div>
          )}

          {/* ── STEP 2: GOAL ────────────────────────────────────────── */}
          {step === 'goal' && (
            <div>
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">⚡</div>
                <h2 className="font-heading text-2xl text-foreground mb-1">
                  {"What's your #1 goal with solar?"}
                </h2>
                <p className="text-muted-foreground text-sm">
                  Pick the one that matters most to you right now
                </p>
              </div>

              <div className="space-y-2 mb-6">
                {goalOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setAnswers({ ...answers, goal: opt.value })}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer text-left ${
                      answers.goal === opt.value
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-input hover:border-primary/50 hover:bg-muted/40'
                    }`}
                  >
                    <span className="text-2xl w-8 text-center flex-shrink-0">{opt.emoji}</span>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{opt.label}</div>
                      <div className="text-sm text-muted-foreground">{opt.sub}</div>
                    </div>
                    {answers.goal === opt.value && <Check className="w-4 h-4 text-primary flex-shrink-0" />}
                  </button>
                ))}
              </div>

              <button
                onClick={() => answers.goal && setStep('qualifier')}
                className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-colors ${
                  answers.goal
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                Continue →
              </button>
            </div>
          )}

          {/* ── STEP 3: QUALIFIER (shop visit + budget) ─────────────── */}
          {step === 'qualifier' && (
            <div>
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">🤝</div>
                <h2 className="font-heading text-2xl text-foreground mb-1">
                  Two quick things before we book your call
                </h2>
                <p className="text-muted-foreground text-sm">
                  We want to make sure this is a great fit for both of us
                </p>
              </div>

              {/* Shop visit question */}
              <div className="mb-5">
                <div className="bg-muted/50 rounded-xl p-4 mb-3 border border-border">
                  <p className="text-sm text-foreground font-medium mb-1">📍 Jason works from his shop in Burleson, TX</p>
                  <p className="text-sm text-muted-foreground">
                    Every install starts with a walk-around of your RV at the shop so Jason can design exactly the right system for your rig.
                  </p>
                </div>
                <p className="text-sm font-medium text-foreground mb-2">
                  Are you able to bring your RV to Burleson, TX?
                </p>
                <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2">
                  {[
                    { value: 'yes', label: '✅ Yes, no problem' },
                    { value: 'maybe', label: '🤔 Not sure yet' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setAnswers({ ...answers, shopVisit: opt.value })}
                      className={`w-full p-3 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
                        answers.shopVisit === opt.value
                          ? 'border-primary bg-primary/5 text-foreground'
                          : 'border-input hover:border-primary/50 text-muted-foreground'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget question */}
              <div className="mb-6">
                <div className="bg-muted/50 rounded-xl p-4 mb-3 border border-border">
                  <p className="text-sm text-foreground font-medium mb-1">💰 Investment starts around $4,000</p>
                  <p className="text-sm text-muted-foreground">
                    Every system is custom-built for your RV. The exact price depends on your specs — Jason will walk you through everything on the call.
                  </p>
                </div>
                <p className="text-sm font-medium text-foreground mb-2">
                  Does that fit within your budget?
                </p>
                <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2">
                  {[
                    { value: 'yes', label: "✅ Yes, I'm ready to invest" },
                    { value: 'maybe', label: '🤔 I need to think about it' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setAnswers({ ...answers, budgetReady: opt.value })}
                      className={`p-3 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
                        answers.budgetReady === opt.value
                          ? 'border-primary bg-primary/5 text-foreground'
                          : 'border-input hover:border-primary/50 text-muted-foreground'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => answers.shopVisit && answers.budgetReady && handleQualifierComplete()}
                className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-colors ${
                  answers.shopVisit && answers.budgetReady
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                Book My Call with Jason →
              </button>
              <p className="text-xs text-center text-muted-foreground mt-2">
                Free · No pressure · 15–20 minute call
              </p>
            </div>
          )}

          {/* ── STEP 4: BOOKING ─────────────────────────────────────── */}
          {step === 'booking' && (
            <div>
              <div className="text-center mb-5">
                <div className="text-4xl mb-3">📅</div>
                <h2 className="font-heading text-2xl text-foreground mb-1">
                  {`You're in, ${contact.firstName}!`}
                </h2>
                <p className="text-muted-foreground text-sm">
                  Pick a time below and Jason will give you a call to walk through everything.
                </p>
              </div>

              <div className="rounded-xl overflow-hidden border border-border">
                <iframe
                  src={BOOKING_URL}
                  className="w-full"
                  style={{ height: 'min(560px, 55vh)', border: 'none' }}
                  title="Book a call with Jason"
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
