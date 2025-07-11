import React from 'react';
import { ArrowLeft, BookOpen, FileText, HelpCircle, Star } from 'lucide-react';

interface LearningModeProps {
  mode: 'kids' | 'students' | 'competitive' | null;
  onViewChange: (view: 'home' | 'learning' | 'upload' | 'quiz' | 'progress') => void;
}

const LearningMode: React.FC<LearningModeProps> = ({ mode, onViewChange }) => {
  const getModeConfig = () => {
    switch (mode) {
      case 'kids':
        return {
          title: "Kids Learning Zone",
          subtitle: "Fun and colorful learning for young minds!",
          bgGradient: "from-pink-400 to-red-400",
          features: [
            { icon: Star, title: "Story Learning", desc: "Learn through fun stories and characters" },
            { icon: BookOpen, title: "Picture Books", desc: "Visual learning with colorful illustrations" },
            { icon: HelpCircle, title: "Simple Quizzes", desc: "Easy questions with friendly feedback" },
          ]
        };
      case 'students':
        return {
          title: "Student Study Hub",
          subtitle: "Comprehensive learning tools for academic success",
          bgGradient: "from-blue-400 to-purple-400",
          features: [
            { icon: FileText, title: "Detailed Notes", desc: "Comprehensive summaries and explanations" },
            { icon: BookOpen, title: "Practice Tests", desc: "Chapter-wise quizzes and assessments" },
            { icon: HelpCircle, title: "Doubt Clearing", desc: "AI-powered explanations for difficult concepts" },
          ]
        };
      case 'competitive':
        return {
          title: "Competitive Exam Prep",
          subtitle: "Advanced preparation for competitive examinations",
          bgGradient: "from-green-400 to-teal-400",
          features: [
            { icon: FileText, title: "Mock Tests", desc: "Full-length practice exams with timing" },
            { icon: BookOpen, title: "Previous Papers", desc: "Extensive database of past questions" },
            { icon: HelpCircle, title: "Performance Analytics", desc: "Detailed analysis of strengths and weaknesses" },
          ]
        };
      default:
        return {
          title: "Learning Mode",
          subtitle: "Select your learning preference",
          bgGradient: "from-blue-400 to-purple-400",
          features: []
        };
    }
  };

  const config = getModeConfig();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center mb-8">
        <button
          onClick={() => onViewChange('home')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>
      </div>

      <div className={`bg-gradient-to-r ${config.bgGradient} rounded-2xl p-8 text-white mb-12`}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{config.title}</h1>
          <p className="text-xl opacity-90">{config.subtitle}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {config.features.map((feature, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <feature.icon className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => onViewChange('upload')}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all hover:scale-105 inline-flex items-center space-x-2"
        >
          <BookOpen className="w-5 h-5" />
          <span>Upload Content to Start Learning</span>
        </button>
      </div>
    </div>
  );
};

export default LearningMode;