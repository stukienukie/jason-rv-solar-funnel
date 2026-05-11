import Image from 'next/image'

export function Header() {
  return (
    <header className="relative w-full overflow-hidden">
      <div className="relative w-full h-[460px] md:h-[620px]">
        <Image
          src="/hero-rv.jpg"
          alt="RV with solar panels installed"
          fill
          priority
          className="object-cover object-[center_65%]"
          sizes="100vw"
        />
        {/* Gradient — stronger on mobile so text is always readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />

        {/* Logo — top of image */}
        <div className="absolute top-6 md:top-8 left-0 right-0 flex justify-center">
          <Image
            src="/rvs-logo.png"
            alt="RVsOffGrid"
            width={320}
            height={96}
            priority
            className="h-14 md:h-20 w-auto drop-shadow-lg"
          />
        </div>

        {/* Text — bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 text-center px-5 pb-8 md:pb-10">
          <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-medium mb-3 md:mb-4 backdrop-blur-sm">
            RV Solar Installations · Burleson, TX
          </div>

          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-foreground mb-3 md:mb-4 text-balance drop-shadow-sm">
            Stop Running on{' '}
            <span className="text-primary">Generator Power.</span>
          </h1>

          <p className="text-muted-foreground text-base md:text-xl max-w-2xl mx-auto text-pretty leading-snug">
            Get a professional RV solar system installed by Victron-certified technicians.
            No more generator noise, fuel costs, or hookup hassles.
          </p>
        </div>
      </div>
    </header>
  )
}
