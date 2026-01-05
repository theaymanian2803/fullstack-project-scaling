import React from 'react'
const values = [
  {
    title: 'Premium Quality',
    description:
      'We use only the finest materials and printing techniques to ensure every t-shirt is a masterpiece.',
    icon: '✓',
  },
  {
    title: 'Authentic Design',
    description:
      'Each design is deeply researched and crafted to authentically represent the legends we celebrate.',
    icon: '★',
  },
  {
    title: 'Cultural Respect',
    description:
      'We honor the athletes and icons who inspire us, ensuring every piece carries genuine reverence.',
    icon: '♦',
  },
  {
    title: 'Community Driven',
    description:
      'EVANOX is built by fans, for fans. Your passion fuels our mission to celebrate greatness.',
    icon: '◆',
  },
]

export function MissionValues() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-black mb-4 leading-tight">
            Our Mission
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            To create iconic wearable art that honors basketball legends and celebrates the culture
            that defines sports excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="p-8 border border-border hover:border-accent transition-colors">
              <div className="flex items-start gap-4">
                <div className="text-3xl text-accent flex-shrink-0 mt-1">{value.icon}</div>
                <div>
                  <h3 className="text-xl font-black mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
