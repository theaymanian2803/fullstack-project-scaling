export function CallToAction() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-linear-to from-background to-card relative overflow-hidden">
      {/* Gold accent line */}
      <div className="absolute left-0 top-0 h-full w-1 bg-accent" />

      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-black mb-6 leading-tight text-text-balance">
          Ready to Join the Movement?
        </h2>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Own a piece of history. Wear greatness. Celebrate the legends that inspire us all.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-10 py-4 bg-accent text-accent-foreground font-black text-lg hover:opacity-90 transition-opacity">
            SHOP COLLECTION
          </button>
          <button className="px-10 py-4 border-2 border-accent text-accent font-black text-lg hover:bg-accent/10 transition-colors">
            CONTACT US
          </button>
        </div>
      </div>
    </section>
  )
}
