export function AboutJason() {
  return (
    <section className="px-4 py-14 bg-secondary/30">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
          <div className="shrink-0">
            <img
              src="https://rvsoffgrid.com/assets/jason-olivia-BtSE0MiI.avif"
              alt="Jason and Olivia Orr, owners of RVsOffGrid"
              className="w-44 h-44 rounded-2xl object-cover shadow-md"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="flex flex-col gap-3 text-center sm:text-left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Meet Your Installer</p>
              <h2 className="text-2xl font-extrabold text-foreground">Jason Orr</h2>
              <p className="text-sm text-muted-foreground">Owner · RVsOffGrid · Burleson, TX</p>
            </div>

            <p className="text-muted-foreground leading-relaxed text-sm">
              My wife Olivia and I started RVsOffGrid to help families break free from the grid.
              When I was a kid, I traveled the USA for a year with my family in an RV — and those memories never left me.
              Now, as a trained Victron Energy installer with 6 kids of our own, I engineer systems I&apos;d trust for my own family.
            </p>

            <p className="text-xs text-muted-foreground italic border-l-2 border-primary/40 pl-3">
              &ldquo;I truly believe excellence is doing a small thing well. I stand behind every install.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
