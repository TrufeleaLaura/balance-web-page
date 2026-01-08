"use client";

import { useState, useEffect, useRef } from "react";

const statistics = [
  {
    value: 77,
    suffix: "%",
    label: "of employees have experienced burnout",
    source: "Deloitte Survey",
  },
  {
    value: 94,
    suffix: "%",
    label: "say balance improves mental health",
    source: "Mental Health Foundation",
  },
  {
    value: 21,
    suffix: "%",
    label: "more productive when balanced",
    source: "Corporate Leadership Council",
  },
  {
    value: 50,
    suffix: "%",
    label: "lower turnover with good balance",
    source: "Gallup Research",
  },
];

const benefits = [
  {
    title: "Reduced Stress",
    description: "Proper boundaries prevent chronic stress and its harmful effects on your body and mind.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Better Health",
    description: "Time for exercise, sleep, and healthy eating leads to improved physical wellness.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: "Stronger Relationships",
    description: "Quality time with loved ones strengthens bonds and provides emotional support.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: "Increased Productivity",
    description: "Rest and recovery actually boost your efficiency and creativity at work.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: "Greater Fulfillment",
    description: "Pursuing hobbies and passions outside work creates a more meaningful life.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: "Long-term Success",
    description: "Sustainable pace prevents burnout and supports a longer, healthier career.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <span ref={ref} className="counter text-4xl md:text-5xl font-bold gradient-text">
      {count}{suffix}
    </span>
  );
}

export default function WhyItMatters() {
  return (
    <section
      id="why-it-matters"
      className="section-padding bg-card-bg dark:bg-card-bg"
      aria-labelledby="why-it-matters-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            id="why-it-matters-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Why <span className="gradient-text">Balance</span> Matters
          </h2>
          <p className="text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
            The evidence is clear: work-life balance isn&apos;t just a nice-to-have—it&apos;s essential
            for your health, happiness, and success.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
          {statistics.map((stat) => (
            <div
              key={stat.label}
              className="bg-background rounded-xl p-6 text-center card-hover"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-text-muted mt-3 text-sm md:text-base">{stat.label}</p>
              <p className="text-xs text-text-muted/70 mt-2">{stat.source}</p>
            </div>
          ))}
        </div>

        <div className="bg-warning/10 border border-warning/30 rounded-xl p-6 md:p-8 mb-16">
          <h3 className="text-xl md:text-2xl font-semibold mb-4 flex items-center gap-3">
            <svg className="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            The Cost of Imbalance
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-background/50 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Physical Health</h4>
              <p className="text-sm text-text-muted">Chronic stress leads to heart disease, weakened immunity, and sleep disorders.</p>
            </div>
            <div className="bg-background/50 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Mental Health</h4>
              <p className="text-sm text-text-muted">Burnout, anxiety, and depression become more likely without proper boundaries.</p>
            </div>
            <div className="bg-background/50 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Relationships</h4>
              <p className="text-sm text-text-muted">Neglected connections suffer, leading to isolation and relationship breakdown.</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-semibold text-center mb-10">
            Benefits of a Balanced Life
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <article
              key={benefit.title}
              className="bg-background rounded-xl p-6 card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-blue to-primary-teal flex items-center justify-center text-white mb-4" aria-hidden="true">
                {benefit.icon}
              </div>
              <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
              <p className="text-text-muted text-sm leading-relaxed">{benefit.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
