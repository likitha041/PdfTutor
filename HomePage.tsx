import React from 'react';
import { Baby, GraduationCap, Trophy, BookOpen, Brain, Users, Sparkles, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onViewChange: (view: 'home' | 'learning' | 'upload' | 'quiz' | 'progress') => void;
  onModeSelect: (mode: 'kids' | 'students' | 'competitive' | null) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onViewChange, onModeSelect }) => {
  const handleModeSelect = (mode: 'kids' | 'students' | 'competitive') => {
    onModeSelect(mode);
    onViewChange('learning');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          PDF-Powered Learning
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Companion</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Transform any PDF into personalized quizzes and learning materials. From toddlers to B.Tech students 
          and exam aspirants - AI-powered assessments with multilingual support for everyone.
        </p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => onViewChange('upload')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all hover:scale-105 flex items-center space-x-2"
          >
            <BookOpen className="w-5 h-5" />
            <span>Start Learning</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all hover:scale-105">
            Watch Demo
          </button>
        </div>
      </div>

      {/* Learning Modes */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Choose Your Learning Mode</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div 
            onClick={() => handleModeSelect('kids')}
            className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer group hover:scale-105"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-red-400 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Baby className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Kids Mode</h3>
            <p className="text-gray-600 mb-6">
              Fun, colorful interface with simple explanations and interactive games for toddlers and young children.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">Visual Learning</span>
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Games</span>
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Stories</span>
            </div>
          </div>

          <div 
            onClick={() => handleModeSelect('students')}
            className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer group hover:scale-105"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Student Mode</h3>
            <p className="text-gray-600 mb-6">
              Comprehensive study tools for school and college students with detailed explanations and practice tests.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Detailed Notes</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Quizzes</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Summaries</span>
            </div>
          </div>

          <div 
            onClick={() => handleModeSelect('competitive')}
            className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer group hover:scale-105"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-400 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Competitive Mode</h3>
            <p className="text-gray-600 mb-6">
              Advanced preparation for competitive exams like JEE, NEET, GATE, UPSC, SAT, and GRE.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Mock Tests</span>
              <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">Time Trials</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Analytics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose PDF Tutor?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">PDF-to-Quiz Magic</h3>
            <p className="text-gray-600">Upload any PDF and instantly generate personalized quizzes, summaries, and flashcards.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Universal PDF Support</h3>
            <p className="text-gray-600">Works with textbooks, research papers, notes, and any educational PDF content.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart OCR & Translation</h3>
            <p className="text-gray-600">Extract text from scanned PDFs and translate content into multiple languages instantly.</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">50K+</div>
            <div className="text-blue-100">Active Learners</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">15+</div>
            <div className="text-blue-100">Languages</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">100K+</div>
            <div className="text-blue-100">Questions Generated</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">95%</div>
            <div className="text-blue-100">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;