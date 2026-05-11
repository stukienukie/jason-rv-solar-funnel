'use client'

const stats = [
  { number: '150+', label: 'Installs Done', isReview: false },
  { number: '5.0★', label: '58 Google Reviews', isReview: true },
  { number: '100%', label: 'Victron Certified', isReview: false },
  { number: '1-Day', label: 'Typical Install', isReview: false },
]

export function StatsRow() {
  return (
    <section className="px-4 py-8">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 border border-border rounded-xl overflow-hidden">
        {stats.map((stat, index) => {
          const isLeftCol = index % 2 === 0
          const isTopRow = index < 2
          const isLastDesktop = index === stats.length - 1

          const cls = [
            'flex flex-col items-center justify-center p-5 md:p-6',
            isLeftCol ? 'border-r border-border' : '',
            isTopRow ? 'border-b md:border-b-0 border-border' : '',
            !isLastDesktop ? 'md:border-r border-border' : '',
          ].join(' ')

          const inner = (
            <>
              <span className="font-heading text-3xl md:text-4xl text-primary">
                {stat.number}
              </span>
              <span className="text-xs uppercase tracking-wider text-muted-foreground mt-1 text-center leading-tight">
                {stat.label}
              </span>
            </>
          )

          return stat.isReview ? (
            <a
              key={stat.label}
              href="#google-reviews"
              className={`${cls} cursor-pointer hover:bg-muted/40 transition-colors`}
            >
              {inner}
            </a>
          ) : (
            <div key={stat.label} className={cls}>
              {inner}
            </div>
          )
        })}
      </div>
    </section>
  )
}
