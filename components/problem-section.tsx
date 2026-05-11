const pains = [
  {
    emoji: '😤',
    headline: 'The generator goes off at 6am.',
    body: 'Your neighbors hate you. You hate it too. But without hookups, what choice do you have?',
  },
  {
    emoji: '💸',
    headline: "You're paying $50–$100/night just for electricity.",
    body: "Full hookup sites are expensive, crowded, and booked out weeks in advance. You didn't buy an RV for this.",
  },
  {
    emoji: '😔',
    headline: 'You drive past incredible boondocking spots.',
    body: "BLM land. National forests. Total solitude. But you keep driving because you can't survive off-grid. Not yet.",
  },
  {
    emoji: '🔋',
    headline: 'Battery anxiety is real.',
    body: "You're rationing power. Turning things off. Scrambling for a hookup before dark. Every single trip.",
  },
]

export function ProblemSection() {
  return (
    <section className="px-4 py-14 bg-muted/40">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-3">
            Sound Familiar?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            If you&apos;re still running on generator power or chasing hookups, you already know the problem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pains.map((pain) => (
            <div
              key={pain.headline}
              className="bg-background rounded-xl border border-border p-6"
            >
              <div className="text-3xl mb-3">{pain.emoji}</div>
              <h3 className="font-semibold text-foreground mb-2">{pain.headline}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{pain.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-foreground font-medium text-lg">
            There&apos;s a better way. And it starts with one professional install.
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            No more compromises. No more campground dependency. Just clean, silent power — wherever you park.
          </p>
        </div>
      </div>
    </section>
  )
}
