export function BrandStory() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-card">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left - Content */}
        <div>
          <h2 className="text-4xl md:text-5xl font-serif font-black mb-6 leading-tight text-accent">
            Our Story
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              EVANOX was born from a simple belief: that style and culture should honor greatness.
              We started with a vision to create premium t-shirts that go beyond apparel—they're
              wearable art that celebrates the legends who shaped basketball and sports.
            </p>
            <p>
              Every design is meticulously crafted, combining street culture with artistic
              excellence. Each piece tells a story of triumph, passion, and immortal legacies. We
              don't just make t-shirts; we preserve moments that define generations.
            </p>
            <p>
              From the courts to the streets, EVANOX represents excellence. Our commitment to
              quality design and authentic storytelling sets us apart in a crowded marketplace.
            </p>
          </div>
        </div>

        {/* Right - Image placeholder */}
        <div className="relative">
          <img
            src="/ex.png"
            alt="EVANOX brand story - basketball legend"
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  )
}
