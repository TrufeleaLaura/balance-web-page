"use client";

import { useState } from "react";

interface ReflectionEntry {
  id: string;
  date: string;
  mood: string;
  gratitude: string;
  challenge: string;
  goal: string;
}

const moodOptions = [
  { emoji: "😊", label: "Great" },
  { emoji: "🙂", label: "Good" },
  { emoji: "😐", label: "Okay" },
  { emoji: "😔", label: "Low" },
  { emoji: "😫", label: "Stressed" },
];

const resources = [
  {
    title: "Mind - Work-Life Balance Tips",
    description: "Mental health charity with practical advice on managing work-life balance.",
    url: "https://www.mind.org.uk/",
    category: "Mental Health",
  },
  {
    title: "Headspace",
    description: "Meditation and mindfulness app for stress reduction and mental wellness.",
    url: "https://www.headspace.com/",
    category: "Mindfulness",
  },
  {
    title: "Harvard Business Review - Work-Life Balance",
    description: "Research-backed articles on achieving balance in professional life.",
    url: "https://hbr.org/topic/subject/work-life-balance",
    category: "Career",
  },
  {
    title: "The Wheel of Life",
    description: "Learn more about the coaching tool that inspired our Balance Wheel.",
    url: "https://wheeloflife.noomii.com/",
    category: "Self-Assessment",
  },
];

function loadEntriesFromStorage(): ReflectionEntry[] {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("balanceReflections");
  return saved ? JSON.parse(saved) : [];
}

export default function Resources() {
  const [entries, setEntries] = useState<ReflectionEntry[]>(loadEntriesFromStorage);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    mood: "",
    gratitude: "",
    challenge: "",
    goal: "",
  });

  const saveEntries = (newEntries: ReflectionEntry[]) => {
    localStorage.setItem("balanceReflections", JSON.stringify(newEntries));
    setEntries(newEntries);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: ReflectionEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      ...formData,
    };
    saveEntries([newEntry, ...entries]);
    setFormData({ mood: "", gratitude: "", challenge: "", goal: "" });
    setShowForm(false);
  };

  const deleteEntry = (id: string) => {
    saveEntries(entries.filter((entry) => entry.id !== id));
  };

  const clearAllEntries = () => {
    if (window.confirm("Are you sure you want to delete all reflection entries?")) {
      saveEntries([]);
    }
  };

  return (
    <footer
      id="resources"
      className="section-padding bg-card-bg dark:bg-card-bg"
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Resources & <span className="gradient-text">Reflection</span>
          </h2>
          <p className="text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
            Continue your journey with helpful resources and track your progress with a personal reflection journal.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div>
            <div className="bg-background rounded-2xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <svg className="w-6 h-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Reflection Journal
                </h3>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="btn-primary text-sm py-2 px-4"
                  aria-expanded={showForm}
                >
                  {showForm ? "Cancel" : "New Entry"}
                </button>
              </div>

              {showForm && (
                <form onSubmit={handleSubmit} className="mb-6 p-4 bg-card-bg dark:bg-card-bg rounded-xl">
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">How are you feeling today?</label>
                    <div className="flex gap-2" role="radiogroup" aria-label="Select your mood">
                      {moodOptions.map((mood) => (
                        <button
                          key={mood.label}
                          type="button"
                          onClick={() => setFormData({ ...formData, mood: mood.label })}
                          className={`flex-1 p-3 rounded-lg text-center transition-all ${
                            formData.mood === mood.label
                              ? "bg-primary-blue text-white"
                              : "bg-background hover:bg-primary-light"
                          }`}
                          role="radio"
                          aria-checked={formData.mood === mood.label}
                        >
                          <span className="text-2xl block mb-1">{mood.emoji}</span>
                          <span className="text-xs">{mood.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="gratitude" className="block text-sm font-medium mb-2">
                      What are you grateful for today?
                    </label>
                    <textarea
                      id="gratitude"
                      value={formData.gratitude}
                      onChange={(e) => setFormData({ ...formData, gratitude: e.target.value })}
                      className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-background reflection-textarea"
                      placeholder="Write something you are thankful for..."
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="challenge" className="block text-sm font-medium mb-2">
                      What balance challenge did you face?
                    </label>
                    <textarea
                      id="challenge"
                      value={formData.challenge}
                      onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                      className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-background reflection-textarea"
                      placeholder="Describe a challenge with work-life balance..."
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="goal" className="block text-sm font-medium mb-2">
                      Tomorrow&apos;s balance goal
                    </label>
                    <input
                      type="text"
                      id="goal"
                      value={formData.goal}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                      className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-background"
                      placeholder="One thing to improve tomorrow..."
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full" disabled={!formData.mood || !formData.gratitude}>
                    Save Reflection
                  </button>
                </form>
              )}

              {entries.length > 0 ? (
                <>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {entries.slice(0, 5).map((entry) => (
                      <article key={entry.id} className="p-4 bg-card-bg dark:bg-card-bg rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <span className="text-2xl mr-2">
                              {moodOptions.find((m) => m.label === entry.mood)?.emoji}
                            </span>
                            <span className="text-sm text-text-muted">{entry.date}</span>
                          </div>
                          <button
                            onClick={() => deleteEntry(entry.id)}
                            className="text-text-muted hover:text-red-500 transition-colors"
                            aria-label={`Delete entry from ${entry.date}`}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-sm mb-1"><strong>Grateful for:</strong> {entry.gratitude}</p>
                        {entry.challenge && <p className="text-sm mb-1 text-text-muted"><strong>Challenge:</strong> {entry.challenge}</p>}
                        {entry.goal && <p className="text-sm text-primary-teal"><strong>Goal:</strong> {entry.goal}</p>}
                      </article>
                    ))}
                  </div>
                  {entries.length > 0 && (
                    <div className="mt-4 flex justify-between items-center text-sm">
                      <span className="text-text-muted">{entries.length} total entries</span>
                      <button
                        onClick={clearAllEntries}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        Clear All
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8 text-text-muted">
                  <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <p>No reflections yet. Start your journey!</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="bg-background rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-primary-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Helpful Resources
              </h3>
              <div className="space-y-4">
                {resources.map((resource) => (
                  <a
                    key={resource.title}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-card-bg dark:bg-card-bg rounded-lg card-hover"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-medium text-primary-teal mb-1 block">
                          {resource.category}
                        </span>
                        <h4 className="font-semibold mb-1">{resource.title}</h4>
                        <p className="text-sm text-text-muted">{resource.description}</p>
                      </div>
                      <svg className="w-5 h-5 text-text-muted flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <a href="#home" className="text-2xl font-bold gradient-text">
                BALANCE
              </a>
              <p className="text-sm text-text-muted mt-1">
                Finding harmony in work and life
              </p>
            </div>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap justify-center gap-4 text-sm">
                <li><a href="#home" className="text-text-muted hover:text-primary-blue transition-colors">Home</a></li>
                <li><a href="#what-is-balance" className="text-text-muted hover:text-primary-blue transition-colors">What is Balance</a></li>
                <li><a href="#why-it-matters" className="text-text-muted hover:text-primary-blue transition-colors">Why It Matters</a></li>
                <li><a href="#balance-wheel" className="text-text-muted hover:text-primary-blue transition-colors">Balance Wheel</a></li>
                <li><a href="#tips" className="text-text-muted hover:text-primary-blue transition-colors">Tips</a></li>
                <li><a href="#quiz" className="text-text-muted hover:text-primary-blue transition-colors">Quiz</a></li>
              </ul>
            </nav>
          </div>
          <div className="text-center mt-8 text-sm text-text-muted">
            <p>Created for educational purposes. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
