import Image from 'next/image'

const photos = [
  '/gallery-1-BxAI98jw.png',
  '/gallery-2-BZATHmxh.png',
  '/gallery-3-CloAN3ci.png',
  '/gallery-4-Cn7JMmUk.png',
  '/gallery-5-CE6TC3LT.png',
  '/gallery-6-C_v2jxDv.png',
  '/gallery-7-CNGYzqgz.png',
  '/gallery-8-C-4X7FKz.png',
  '/gallery-9-m_21LPuv.png',
]

export function PhotoGrid() {
  return (
    <section className="px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-lg font-medium text-foreground mb-8">
          📸 Recent Installations
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((src, i) => (
            <div key={i} className="aspect-[4/3] relative rounded-xl overflow-hidden border border-border bg-muted">
              <Image
                src={src}
                alt={`RV solar installation job ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
