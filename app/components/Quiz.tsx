"use client";

import { useState } from "react";

interface Question {
  question: string;
  options: { text: string; score: number }[];
}

const questions: Question[] = [
  {
    question: "How often do you feel overwhelmed by your workload?",
    options: [
      { text: "Almost never - I manage my tasks well", score: 4 },
      { text: "Sometimes - during busy periods", score: 3 },
      { text: "Often - I struggle to keep up", score: 2 },
      { text: "Almost always - I am constantly stressed", score: 1 },
    ],
  },
  {
    question: "How much quality time do you spend with family and friends each week?",
    options: [
      { text: "Several hours of meaningful connection", score: 4 },
      { text: "A few hours, but I would like more", score: 3 },
      { text: "Very little - work takes most of my time", score: 2 },
      { text: "Almost none - I am too busy", score: 1 },
    ],
  },
  {
    question: "How well do you maintain healthy habits (sleep, exercise, nutrition)?",
    options: [
      { text: "Very well - health is my priority", score: 4 },
      { text: "Fairly well - I could do better", score: 3 },
      { text: "Poorly - I often neglect my health", score: 2 },
      { text: "Not at all - I have no time for it", score: 1 },
    ],
  },
  {
    question: "How often do you engage in hobbies or activities you enjoy?",
    options: [
      { text: "Regularly - I make time for what I love", score: 4 },
      { text: "Sometimes - when I can fit it in", score: 3 },
      { text: "Rarely - other priorities take over", score: 2 },
      { text: "Never - I have given up my hobbies", score: 1 },
    ],
  },
  {
    question: "How do you feel when you think about your work-life balance?",
    options: [
      { text: "Content - I have found a good rhythm", score: 4 },
      { text: "Hopeful - I am working on improving", score: 3 },
      { text: "Frustrated - I want change but struggle", score: 2 },
      { text: "Exhausted - I am running on empty", score: 1 },
    ],
  },
];

interface Result {
  range: [number, number];
  title: string;
  description: string;
  advice: string[];
  color: string;
}

const results: Result[] = [
  {
    range: [17, 20],
    title: "Excellent Balance",
    description: "You have achieved a healthy work-life balance. You prioritize what matters and maintain boundaries effectively.",
    advice: [
      "Continue nurturing your current habits",
      "Share your strategies with others who struggle",
      "Stay vigilant during stressful periods",
    ],
    color: "text-success",
  },
  {
    range: [13, 16],
    title: "Good Balance",
    description: "You are on the right track with room for improvement. You understand the importance of balance but occasionally struggle.",
    advice: [
      "Identify your weakest area and focus there",
      "Set clearer boundaries during busy times",
      "Schedule regular check-ins with yourself",
    ],
    color: "text-primary-blue",
  },
  {
    range: [9, 12],
    title: "Moderate Imbalance",
    description: "Your balance needs attention. Work often takes priority over personal needs and relationships.",
    advice: [
      "Start with one small change this week",
      "Block time for non-work activities",
      "Learn to delegate or say no more often",
    ],
    color: "text-warning",
  },
  {
    range: [5, 8],
    title: "Significant Imbalance",
    description: "You are experiencing significant imbalance that may be affecting your health and relationships. Immediate changes are needed.",
    advice: [
      "Speak with a mentor or counselor",
      "Take a day off to reset and plan",
      "Make health and relationships non-negotiable",
      "Consider if your current situation is sustainable",
    ],
    color: "text-red-500",
  },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleAnswer = (score: number, optionIndex: number) => {
    setSelectedOption(optionIndex);
    setTimeout(() => {
      const newAnswers = [...answers, score];
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 300);
  };

  const totalScore = answers.reduce((sum, score) => sum + score, 0);
  const result = results.find(
    (r) => totalScore >= r.range[0] && totalScore <= r.range[1]
  ) || results[results.length - 1];

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setSelectedOption(null);
  };

  const progress = ((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100;

  return (
    <section
      id="quiz"
      className="section-padding bg-background"
      aria-labelledby="quiz-heading"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2
            id="quiz-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Balance <span className="gradient-text">Quiz</span>
          </h2>
          <p className="text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
            Discover your current work-life balance score and get personalized recommendations
            to help you thrive in all areas of life.
          </p>
        </div>

        <div className="bg-card-bg dark:bg-card-bg rounded-2xl p-6 md:p-8">
          {!showResult ? (
            <>
              <div className="mb-8">
                <div className="flex justify-between text-sm text-text-muted mb-2">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-semibold mb-6">
                  {questions[currentQuestion].question}
                </h3>

                <div className="space-y-3" role="radiogroup" aria-label="Answer options">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option.score, index)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all quiz-option ${
                        selectedOption === index
                          ? "border-primary-blue bg-primary-light dark:bg-primary-light/20"
                          : "border-transparent bg-background hover:border-primary-blue/50"
                      }`}
                      role="radio"
                      aria-checked={selectedOption === index}
                      disabled={selectedOption !== null}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedOption === index
                            ? "border-primary-blue bg-primary-blue text-white"
                            : "border-text-muted"
                        }`}>
                          {selectedOption === index && (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                        {option.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center scale-in">
              <div className="mb-6">
                <div className={`text-6xl md:text-7xl font-bold ${result.color} mb-2`}>
                  {totalScore}
                </div>
                <p className="text-text-muted">out of 20 points</p>
              </div>

              <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${result.color}`}>
                {result.title}
              </h3>

              <p className="text-lg text-text-muted mb-8 max-w-xl mx-auto">
                {result.description}
              </p>

              <div className="bg-background rounded-xl p-6 mb-8 text-left">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Personalized Advice
                </h4>
                <ul className="space-y-3">
                  {result.advice.map((advice, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-text-muted">{advice}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetQuiz}
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Retake Quiz
                </button>
                <a
                  href="#balance-wheel"
                  className="btn-secondary inline-flex items-center justify-center gap-2"
                >
                  Try Balance Wheel
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
