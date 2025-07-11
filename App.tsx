import React, { useState } from 'react';
import {
  Brain,
  Upload,
  Trophy,
  Languages,
} from 'lucide-react';

import HomePage from './components/HomePage';
import LearningMode from './components/LearningMode';
import ContentUpload from './components/ContentUpload';
import QuizInterface from './components/QuizInterface';
import ProgressDashboard from './components/ProgressDashboard';

type View = 'home' | 'learning' | 'upload' | 'quiz' | 'progress';
type LearningModeType = 'kids' | 'students' | 'competitive' | null;

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedMode, setSelectedMode] = useState<LearningModeType>(null);
  const [uploadedContent, setUploadedContent] = useState<string | null>(null);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage onViewChange={setCurrentView} onModeSelect={setSelectedMode} />;
      case 'learning':
        return <LearningMode mode={selectedMode} onViewChange={setCurrentView} />;
      case 'upload':
        return <ContentUpload onViewChange={setCurrentView} onContentUpload={setUploadedContent} />;
      case 'quiz':
        return <QuizInterface onViewChange={setCurrentView} content={uploadedContent} />;
      case 'progress':
        return <ProgressDashboard onViewChange={setCurrentView} />;
      default:
        return <HomePage onViewChange={setCurrentView} onModeSelect={setSelectedMode} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 font-sans">
      {/* Top Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="w-7 h-7 text-blue-600" />
              <span className="text-xl font-semibold text-gray-800">PDF Tutor</span>
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setCurrentView('home')}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Home
              </button>
              <button
                onClick={() => setCurrentView('upload')}
                className="text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-1"
              >
                <Upload className="w-4 h-4" />
                <span>Upload</span>
              </button>
              <button
                onClick={() => setCurrentView('progress')}
                className="text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-1"
              >
                <Trophy className="w-4 h-4" />
                <span>Progress</span>
              </button>
              <button className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1">
                <Languages className="w-4 h-4" />
                <span>EN</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Renderer */}
      <main className="pt-6 pb-12">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
