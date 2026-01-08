export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-light"
      aria-labelledby="hero-heading"
    >
      <div
        className="absolute top-20 left-10 w-32 h-32 md:w-64 md:h-64 bg-primary-blue/10 shape-blob"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-20 right-10 w-40 h-40 md:w-72 md:h-72 bg-primary-teal/10 shape-blob"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-1/4 w-20 h-20 md:w-32 md:h-32 bg-secondary/10 rounded-full float"
        aria-hidden="true"
      />

      <div className="text-center px-4 max-w-4xl mx-auto fade-in relative z-10">
        <div className="mb-8 flex justify-center" aria-hidden="true">
          <svg
            className="w-32 h-32 md:w-48 md:h-48 balance-scale"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Balance scale illustration"
          >
            <rect x="90" y="160" width="20" height="30" fill="url(#gradient1)" rx="2" />
            <rect x="70" y="185" width="60" height="10" fill="url(#gradient1)" rx="5" />

            <rect x="97" y="40" width="6" height="120" fill="url(#gradient1)" />

            <rect x="20" y="35" width="160" height="8" fill="url(#gradient2)" rx="4" />

            <line x1="40" y1="43" x2="40" y2="80" stroke="url(#gradient2)" strokeWidth="3" />
            <line x1="25" y1="43" x2="40" y2="80" stroke="url(#gradient2)" strokeWidth="2" />
            <line x1="55" y1="43" x2="40" y2="80" stroke="url(#gradient2)" strokeWidth="2" />

            <ellipse cx="40" cy="90" rx="30" ry="10" fill="url(#gradient1)" />
            <text x="40" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">WORK</text>

            <line x1="160" y1="43" x2="160" y2="80" stroke="url(#gradient2)" strokeWidth="3" />
            <line x1="145" y1="43" x2="160" y2="80" stroke="url(#gradient2)" strokeWidth="2" />
            <line x1="175" y1="43" x2="160" y2="80" stroke="url(#gradient2)" strokeWidth="2" />

            <ellipse cx="160" cy="90" rx="30" ry="10" fill="url(#gradient1)" />
            <text x="160" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">LIFE</text>

            <circle cx="100" cy="39" r="12" fill="url(#gradient2)" />
            <circle cx="100" cy="39" r="6" fill="white" />

            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#0D9488" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#0D9488" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h1
          id="hero-heading"
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-text"
        >
          BALANCE
        </h1>

        <h2 className="text-xl md:text-2xl lg:text-3xl text-text-muted mb-4 font-light">
          Finding Harmony in Life
        </h2>

        <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          In a world that never stops, learning to balance work and life is not just important—it&apos;s essential.
          Discover how to create equilibrium between your professional ambitions and personal well-being.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#balance-wheel"
            className="btn-primary inline-flex items-center gap-2"
            aria-label="Try the interactive Balance Wheel tool"
          >
            <span>Try Balance Wheel</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="#what-is-balance"
            className="btn-secondary inline-flex items-center gap-2"
            aria-label="Learn more about balance"
          >
            <span>Learn More</span>
          </a>
        </div>
      </div>

      <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 bounce" aria-hidden="true">
        <a
          href="#what-is-balance"
          className="flex flex-col items-center text-text-muted hover:text-primary-blue transition-colors"
          aria-label="Scroll down to learn more"
        >
          <span className="text-sm mb-2">Scroll</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
