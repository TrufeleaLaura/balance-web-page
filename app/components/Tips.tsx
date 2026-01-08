"use client";

import React, { useState, useCallback } from "react";

interface Tip {
  category: string;
  tip: string;
  action: string;
}

const tips: Tip[] = [
  { category: "Work", tip: "Set clear boundaries for your work hours", action: "Choose a time to stop working each day and stick to it." },
  { category: "Work", tip: "Take regular breaks during work", action: "Use the Pomodoro technique: 25 min work, 5 min break." },
  { category: "Work", tip: "Learn to say no to non-essential tasks", action: "Before accepting new work, ask: Does this align with my priorities?" },
  { category: "Work", tip: "Batch similar tasks together", action: "Group emails, calls, and meetings to reduce context switching." },
  { category: "Work", tip: "Create a dedicated workspace", action: "Separate your work area from relaxation spaces, even if small." },

  { category: "Health", tip: "Prioritize 7-8 hours of sleep", action: "Set a bedtime alarm 30 minutes before you need to sleep." },
  { category: "Health", tip: "Move your body every day", action: "Start with just 10 minutes of walking and build from there." },
  { category: "Health", tip: "Stay hydrated throughout the day", action: "Keep a water bottle at your desk and set reminders." },
  { category: "Health", tip: "Practice mindful eating", action: "Take lunch away from your desk and focus on your food." },
  { category: "Health", tip: "Reduce screen time before bed", action: "Stop using screens 1 hour before sleep for better rest." },

  { category: "Relationships", tip: "Schedule quality time with loved ones", action: "Block out time in your calendar for family and friends." },
  { category: "Relationships", tip: "Be present during conversations", action: "Put away your phone when talking to someone important." },
  { category: "Relationships", tip: "Express gratitude daily", action: "Tell someone you appreciate them today." },
  { category: "Relationships", tip: "Plan regular date nights", action: "Set a recurring monthly date with your partner or close friend." },
  { category: "Relationships", tip: "Reach out to distant friends", action: "Send a message to someone you have not talked to in a while." },

  { category: "Self-care", tip: "Practice daily mindfulness", action: "Start with 5 minutes of meditation or deep breathing." },
  { category: "Self-care", tip: "Pursue a hobby regularly", action: "Dedicate 30 minutes weekly to something you enjoy." },
  { category: "Self-care", tip: "Disconnect from technology", action: "Have one device-free hour each day." },
  { category: "Self-care", tip: "Spend time in nature", action: "Take a walk outside, even for just 15 minutes." },
  { category: "Self-care", tip: "Celebrate small wins", action: "Acknowledge one thing you accomplished today." },
];

const categories = ["All", "Work", "Health", "Relationships", "Self-care"];

const categoryColors: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  Work: {
    bg: "bg-blue-500/10",
    text: "text-blue-500",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  Health: {
    bg: "bg-teal-500/10",
    text: "text-teal-500",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  Relationships: {
    bg: "bg-pink-500/10",
    text: "text-pink-500",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  "Self-care": {
    bg: "bg-purple-500/10",
    text: "text-purple-500",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
};

export default function Tips() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentTips, setCurrentTips] = useState<Tip[]>([]);
  const [completedTips, setCompletedTips] = useState<Set<number>>(new Set());

  const generateTips = useCallback(() => {
    const filteredTips = selectedCategory === "All"
      ? tips
      : tips.filter((tip) => tip.category === selectedCategory);

    const shuffled = [...filteredTips].sort(() => Math.random() - 0.5);
    setCurrentTips(shuffled.slice(0, 3));
    setCompletedTips(new Set());
  }, [selectedCategory]);

  const toggleComplete = (index: number) => {
    setCompletedTips((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <section
      id="tips"
      className="section-padding bg-card-bg dark:bg-card-bg"
      aria-labelledby="tips-heading"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2
            id="tips-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Daily <span className="gradient-text">Balance</span> Tips
          </h2>
          <p className="text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
            Get personalized micro-tasks to help you build better habits. Select a category and generate
            your daily tips to work towards a more balanced life.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8" role="group" aria-label="Filter tips by category">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-primary-blue to-primary-teal text-white"
                  : "bg-background hover:bg-primary-light dark:hover:bg-primary-light/20"
              }`}
              aria-pressed={selectedCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="text-center mb-8">
          <button
            onClick={generateTips}
            className="btn-primary inline-flex items-center gap-2 text-lg"
            aria-label="Generate new balance tips"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Generate Daily Tips
          </button>
        </div>

        {currentTips.length > 0 ? (
          <div className="space-y-4" role="list" aria-label="Your daily tips">
            {currentTips.map((tip, index) => {
              const categoryStyle = categoryColors[tip.category];
              const isCompleted = completedTips.has(index);

              return (
                <article
                  key={index}
                  className={`bg-background rounded-xl p-6 card-hover transition-all ${
                    isCompleted ? "opacity-60" : ""
                  }`}
                  role="listitem"
                >
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleComplete(index)}
                      className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        isCompleted
                          ? "bg-success border-success text-white"
                          : "border-text-muted hover:border-primary-blue"
                      }`}
                      aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
                      aria-pressed={isCompleted}
                    >
                      {isCompleted && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${categoryStyle.bg} ${categoryStyle.text}`}>
                          {categoryStyle.icon}
                          {tip.category}
                        </span>
                      </div>
                      <h3 className={`text-lg font-semibold mb-2 ${isCompleted ? "line-through" : ""}`}>
                        {tip.tip}
                      </h3>
                      <p className="text-text-muted">
                        <strong>Action:</strong> {tip.action}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}

            <div className="mt-6 p-4 bg-background rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Today&apos;s Progress</span>
                <span className="text-sm text-text-muted">{completedTips.size} / {currentTips.length} completed</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${(completedTips.size / currentTips.length) * 100}%` }}
                  role="progressbar"
                  aria-valuenow={completedTips.size}
                  aria-valuemin={0}
                  aria-valuemax={currentTips.length}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-background rounded-xl">
            <svg className="w-16 h-16 mx-auto text-text-muted mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p className="text-text-muted text-lg mb-2">Ready to get started?</p>
            <p className="text-sm text-text-muted">Click the button above to generate your personalized daily tips.</p>
          </div>
        )}
      </div>
    </section>
  );
}
