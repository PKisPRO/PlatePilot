import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types/game';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: () => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswerClick = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowScore(true);
      if (score + 1 >= questions.length * 0.8) { // 80% correct to win
        onComplete();
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
  };

  if (showScore) {
    return (
      <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Quiz Complete!
        </h2>
        <p className="text-lg mb-4 text-gray-600 dark:text-gray-300">
          Your score: {score} out of {questions.length}
        </p>
        {score >= questions.length * 0.8 ? (
          <p className="text-green-500 font-semibold mb-4">
            Congratulations! You've unlocked a secret recipe!
          </p>
        ) : (
          <p className="text-red-500 font-semibold mb-4">
            Try again to unlock the secret recipe! You need at least 80% correct.
          </p>
        )}
        <button
          onClick={resetQuiz}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="mb-4">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Question {currentQuestion + 1} of {questions.length}
        </span>
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-2">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`
            }}
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        {questions[currentQuestion].question}
      </h2>

      <div className="space-y-3">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(index)}
            className={`w-full p-3 text-left rounded-lg transition-colors ${
              selectedAnswer === index
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        onClick={handleNextQuestion}
        disabled={selectedAnswer === null}
        className={`mt-6 w-full py-2 rounded-lg ${
          selectedAnswer === null
            ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
            : 'bg-green-500 hover:bg-green-600 text-white'
        }`}
      >
        {currentQuestion + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
      </button>
    </div>
  );
};

export default Quiz; 