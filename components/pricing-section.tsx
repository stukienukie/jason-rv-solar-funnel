import { Check } from 'lucide-react'

interface PricingSectionProps {
  onCTAClick: () => void
}

export function PricingSection({ onCTAClick }: PricingSectionProps) {
  return (
    <section className="px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-2">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Transparent Pricing — No Surprises
          </div>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-3">
            Two Packages. One Certified Team.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Every install uses Victron Energy components — the gold standard in RV solar.
            Take the quiz to see which package fits you best.
          </p>
        </div>

        {/* Qualifier line */}
        <p className="text-center text-sm text-muted-foreground italic mb-10">
          Built for serious RV owners who are done compromising on power.
        </p>

        {/* Cards — stacked on mobile (Medium first), side-by-side on md+ with Medium dominant */}
        <div className="flex flex-col md:flex-row md:items-start gap-5 md:gap-6 max-w-4xl mx-auto">

          {/* Medium RV Package — dominant card */}
          <div
            className="w-full md:flex-[1.6] rounded-2xl border-2 bg-card flex flex-col relative shadow-xl"
            style={{ borderColor: 'hsl(30 90% 55%)' }}
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span
                className="text-xs font-bold px-4 py-1 rounded-full text-white"
                style={{ backgroundColor: 'hsl(30 90% 55%)' }}
              >
                Most Popular
              </span>
            </div>

            <div className="p-7 flex flex-col flex-1">
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">12v System</p>
                <h3 className="font-heading text-2xl text-foreground mb-1">Medium RV Package</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our most popular system — enough power to run your AC and residential fridge on solar.
                </p>
                <div className="font-heading text-3xl font-bold" style={{ color: 'hsl(30 90% 55%)' }}>
                  $11,900+
                </div>
              </div>

              <ul className="space-y-2.5 mb-4 flex-1">
                {[
                  '(4) 330w Solar Panels (1,320w total)',
                  'Victron Multiplus-II 3000w Inverter',
                  'Victron MPPT 150/100 Charge Controller',
                  '(2) SOK 12v/206ah Lithium Batteries',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'hsl(30 90% 55%)' }} />
                    {item}
                  </li>
                ))}
              </ul>

              <div
                className="text-xs rounded-lg px-3 py-2 mb-5 font-medium"
                style={{ backgroundColor: 'hsl(30 90% 55% / 0.1)', color: 'hsl(30 90% 45%)' }}
              >
                ⚡ Runs: AC (5–6 hrs/day), residential fridge, outlets, TV, microwave
              </div>

              <div className="text-xs text-muted-foreground border-t border-border pt-4 mb-5">
                Best for: 5th wheels, Class C & frequent boondockers
              </div>

              <button
                onClick={onCTAClick}
                className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-opacity cursor-pointer text-white"
                style={{ backgroundColor: 'hsl(30 90% 55%)' }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                Get a Free Quote
              </button>
            </div>
          </div>

          {/* Large RV Package — secondary card */}
          <div className="w-full md:flex-1 rounded-2xl border border-border bg-card flex flex-col relative shadow-sm opacity-80">
            <div className="p-6 flex flex-col flex-1">
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">24v System</p>
                <h3 className="font-heading text-xl text-foreground mb-1">Large RV Package</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Maximum power for full-timers. Run your AC all day and fridge around the clock.
                </p>
                <div className="font-heading text-2xl font-bold text-foreground">
                  $16,900+
                </div>
              </div>

              <ul className="space-y-2 mb-4 flex-1">
                {[
                  '(8) 330w Solar Panels (2,640w total)',
                  'Victron Multiplus-II 24/3000 Inverter',
                  'Victron Cerbo GX + Touch 70',
                  '(2) EG4-LL 24/200ah Lithium Batteries',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="text-xs bg-muted/50 rounded-lg px-3 py-2 mb-4 text-muted-foreground">
                ⚡ Runs: AC all sunny days, residential fridge 24/7, all appliances
              </div>

              <div className="text-xs text-muted-foreground border-t border-border pt-4 mb-4">
                Best for: Class A motorhomes & full-timers
              </div>

              <button
                onClick={onCTAClick}
                className="w-full py-3 px-6 rounded-xl font-semibold text-sm border border-input hover:border-primary/50 hover:bg-muted/50 text-foreground transition-colors cursor-pointer"
              >
                Get a Free Quote
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Not sure which is right for you? Take the 60-second quiz — we&apos;ll recommend the perfect fit.
        </p>
        <p className="text-center text-xs text-muted-foreground/60 mt-3">
          Systems start at $7,900 — not the right fit for everyone, and that&apos;s okay.
        </p>
      </div>
    </section>
  )
}
