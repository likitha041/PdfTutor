import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Brain, ArrowRight, ArrowLeft, Trophy, Target } from 'lucide-react';

interface QuizInterfaceProps {
  onViewChange: (view: 'home' | 'learning' | 'upload' | 'quiz' | 'progress') => void;
  content: string | null;
}

interface Question {
  id: number;
  type: 'mcq' | 'fill' | 'tf';
  question: string;
  options?: string[];
  correct: string | boolean;
  explanation: string;
}

const QuizInterface: React.FC<QuizInterfaceProps> = ({ onViewChange, content }) => {
  const [questions] = useState<Question[]>([
    {
      id: 1,
      type: 'mcq',
      question: 'What is the main process by which plants convert light energy into chemical energy?',
      options: ['Respiration', 'Photosynthesis', 'Digestion', 'Fermentation'],
      correct: 'Photosynthesis',
      explanation: 'Photosynthesis is the process where plants use sunlight, carbon dioxide, and water to produce glucose and oxygen.'
    },
    {
      id: 2,
      type: 'fill',
      question: 'The green pigment in plants that captures light energy is called _______.',
      correct: 'chlorophyll',
      explanation: 'Chlorophyll is the green pigment found in chloroplasts that absorbs light energy for photosynthesis.'
    },
    {
      id: 3,
      type: 'tf',
      question: 'Photosynthesis produces both glucose and oxygen as products.',
      correct: true,
      explanation: 'True. Photosynthesis produces glucose (food for the plant) and oxygen (released into the atmosphere).'
    },
    {
      id: 4,
      type: 'mcq',
      question: 'Which of the following is NOT a requirement for photosynthesis?',
      options: ['Sunlight', 'Carbon dioxide', 'Oxygen', 'Water'],
      correct: 'Oxygen',
      explanation: 'Oxygen is a product of photosynthesis, not a requirement. Plants need sunlight, carbon dioxide, and water.'
    },
    {
      id: 5,
      type: 'fill',
      question: 'Photosynthesis mainly occurs in the _______ of the plant.',
      correct: 'leaves',
      explanation: 'Leaves contain the highest concentration of chloroplasts, making them the primary site of photosynthesis.'
    }
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string | boolean>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  useEffect(() => {
    if (quizComplete) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setQuizComplete(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizComplete]);

  const handleAnswer = (answer: string | boolean) => {
    setUserAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answer
    }));
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowFeedback(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setShowFeedback(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScore = () => {
    let correct = 0;
    questions.forEach(q => {
      const userAnswer = userAnswers[q.id];
      if (userAnswer === q.correct) {
        correct++;
      }
    });
    return correct;
  };

  const getScorePercentage = () => {
    return Math.round((getScore() / questions.length) * 100);
  };

  if (quizComplete) {
    const score = getScore();
    const percentage = getScorePercentage();
    
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Quiz Complete!</h1>
          <p className="text-xl text-gray-600 mb-8">Great job on completing your personalized quiz</p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">{score}/{questions.length}</div>
              <div className="text-gray-600">Correct Answers</div>
            </div>
            <div className="bg-green-50 rounded-xl p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">{percentage}%</div>
              <div className="text-gray-600">Score</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">{formatTime(600 - timeLeft)}</div>
              <div className="text-gray-600">Time Taken</div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => onViewChange('progress')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Target className="w-5 h-5" />
              <span>View Progress</span>
            </button>
            <button
              onClick={() => onViewChange('upload')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Try Another Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const userAnswer = userAnswers[currentQ.id];
  const isCorrect = userAnswer === currentQ.correct;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Quiz Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">PDF-Generated Quiz</h1>
              <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
            <div className="w-24 h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {currentQ.type === 'mcq' ? 'Multiple Choice' : 
               currentQ.type === 'fill' ? 'Fill in the Blank' : 'True/False'}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{currentQ.question}</h2>
        </div>

        {/* MCQ Options */}
        {currentQ.type === 'mcq' && currentQ.options && (
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={showFeedback}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  showFeedback
                    ? option === currentQ.correct
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : option === userAnswer
                      ? 'border-red-500 bg-red-50 text-red-800'
                      : 'border-gray-200 bg-gray-50 text-gray-600'
                    : userAnswer === option
                    ? 'border-blue-500 bg-blue-50 text-blue-800'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center text-sm font-medium">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                  {showFeedback && option === currentQ.correct && (
                    <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                  )}
                  {showFeedback && option === userAnswer && option !== currentQ.correct && (
                    <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Fill in the Blank */}
        {currentQ.type === 'fill' && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Type your answer here..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAnswer(e.currentTarget.value);
                }
              }}
              disabled={showFeedback}
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {!showFeedback && (
              <button
                onClick={() => {
                  const input = document.querySelector('input') as HTMLInputElement;
                  if (input?.value) handleAnswer(input.value);
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Answer
              </button>
            )}
          </div>
        )}

        {/* True/False */}
        {currentQ.type === 'tf' && (
          <div className="flex space-x-4">
            <button
              onClick={() => handleAnswer(true)}
              disabled={showFeedback}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                showFeedback
                  ? currentQ.correct === true
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : userAnswer === true
                    ? 'border-red-500 bg-red-50 text-red-800'
                    : 'border-gray-200 bg-gray-50 text-gray-600'
                  : userAnswer === true
                  ? 'border-blue-500 bg-blue-50 text-blue-800'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg font-semibold">True</span>
                {showFeedback && currentQ.correct === true && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
                {showFeedback && userAnswer === true && currentQ.correct !== true && (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
            </button>
            <button
              onClick={() => handleAnswer(false)}
              disabled={showFeedback}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                showFeedback
                  ? currentQ.correct === false
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : userAnswer === false
                    ? 'border-red-500 bg-red-50 text-red-800'
                    : 'border-gray-200 bg-gray-50 text-gray-600'
                  : userAnswer === false
                  ? 'border-blue-500 bg-blue-50 text-blue-800'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg font-semibold">False</span>
                {showFeedback && currentQ.correct === false && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
                {showFeedback && userAnswer === false && currentQ.correct !== false && (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
            </button>
          </div>
        )}

        {/* Feedback */}
        {showFeedback && (
          <div className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-start space-x-3">
              {isCorrect ? (
                <CheckCircle className="w-6 h-6 text-green-600 mt-0.5" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600 mt-0.5" />
              )}
              <div>
                <p className={`font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </p>
                <p className={`mt-1 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {currentQ.explanation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>

        {showFeedback && (
          <button
            onClick={handleNext}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>{currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizInterface;