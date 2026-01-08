const pillars = [
  {
    title: "Work",
    description: "Professional growth, career satisfaction, and meaningful contributions to your field.",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Health",
    description: "Physical fitness, mental wellness, and sustainable energy for all aspects of life.",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    color: "from-teal-500 to-teal-600",
  },
  {
    title: "Relationships",
    description: "Nurturing connections with family, friends, and community that enrich your life.",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: "from-indigo-500 to-indigo-600",
  },
  {
    title: "Personal Growth",
    description: "Continuous learning, hobbies, and self-development that fuel your passions.",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "from-purple-500 to-purple-600",
  },
];

export default function WhatIsBalance() {
  return (
    <section
      id="what-is-balance"
      className="section-padding bg-background"
      aria-labelledby="what-is-balance-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            id="what-is-balance-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            What is <span className="gradient-text">Balance</span>?
          </h2>
          <p className="text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
            Work-life balance is the equilibrium between professional responsibilities and personal activities.
            It&apos;s not about perfect equality, but about finding the right mix that allows you to thrive
            in all areas of your life.
          </p>
        </div>

        <div className="bg-card-bg dark:bg-card-bg rounded-2xl p-8 md:p-12 mb-16 card-hover">
          <blockquote className="text-center">
            <p className="text-xl md:text-2xl lg:text-3xl font-light italic text-foreground mb-4">
              &ldquo;Balance is not something you find, it&apos;s something you create.&rdquo;
            </p>
            <cite className="text-text-muted text-base md:text-lg not-italic">
              — Jana Kingsford
            </cite>
          </blockquote>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-semibold text-center mb-10">
            The Four Pillars of Balance
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {pillars.map((pillar, index) => (
            <article
              key={pillar.title}
              className={`bg-card-bg dark:bg-card-bg rounded-xl p-6 md:p-8 card-hover text-center animation-delay-${index}`}
            >
              <div
                className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white`}
                aria-hidden="true"
              >
                {pillar.icon}
              </div>
              <h4 className="text-xl font-semibold mb-3">{pillar.title}</h4>
              <p className="text-text-muted leading-relaxed">{pillar.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-primary-light dark:bg-primary-light/20 rounded-xl p-6 md:p-8">
            <h4 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <svg className="w-6 h-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Balance is Personal
            </h4>
            <p className="text-text-muted leading-relaxed">
              What balance looks like varies from person to person. A parent might prioritize family time,
              while a young professional might focus more on career growth. The key is finding what works for you.
            </p>
          </div>
          <div className="bg-primary-light dark:bg-primary-light/20 rounded-xl p-6 md:p-8">
            <h4 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <svg className="w-6 h-6 text-primary-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Balance is Dynamic
            </h4>
            <p className="text-text-muted leading-relaxed">
              Life circumstances change, and so should your balance. Seasons of intense work may be followed
              by periods of rest and recovery. Flexibility is essential to long-term well-being.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
