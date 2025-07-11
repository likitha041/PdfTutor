import React from 'react';
import { Trophy, Target, Clock, TrendingUp, BookOpen, Brain, Star, Award } from 'lucide-react';

interface ProgressDashboardProps {
  onViewChange: (view: 'home' | 'learning' | 'upload' | 'quiz' | 'progress') => void;
}

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ onViewChange }) => {
  const recentQuizzes = [
    { subject: 'Photosynthesis', score: 85, date: '2025-01-10', questions: 5 },
    { subject: 'Physics - Motion', score: 92, date: '2025-01-09', questions: 8 },
    { subject: 'Chemistry - Atoms', score: 78, date: '2025-01-08', questions: 6 },
  ];

  const weeklyProgress = [
    { day: 'Mon', score: 75 },
    { day: 'Tue', score: 82 },
    { day: 'Wed', score: 88 },
    { day: 'Thu', score: 85 },
    { day: 'Fri', score: 92 },
    { day: 'Sat', score: 87 },
    { day: 'Sun', score: 90 },
  ];

  const achievements = [
    { title: 'First Quiz', description: 'Completed your first quiz', icon: Trophy, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    { title: 'Perfect Score', description: 'Scored 100% on a quiz', icon: Star, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { title: 'Study Streak', description: '7 days in a row', icon: Award, color: 'text-green-600', bgColor: 'bg-green-100' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Progress Dashboard</h1>
          <p className="text-xl text-gray-600">Track your learning journey and achievements</p>
        </div>
        <button
          onClick={() => onViewChange('upload')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <BookOpen className="w-5 h-5" />
          <span>Take New Quiz</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <StatBox icon={<Trophy className="w-6 h-6 text-blue-600" />} title="87%" subtitle="Average Score" bgColor="bg-blue-100" />
        <StatBox icon={<Target className="w-6 h-6 text-green-600" />} title="23" subtitle="Quizzes Completed" bgColor="bg-green-100" />
        <StatBox icon={<Clock className="w-6 h-6 text-purple-600" />} title="12h" subtitle="Study Time" bgColor="bg-purple-100" />
        <StatBox icon={<TrendingUp className="w-6 h-6 text-orange-600" />} title="+15%" subtitle="This Week" bgColor="bg-orange-100" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Quizzes */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Quizzes</h2>
            <div className="space-y-4">
              {recentQuizzes.map((quiz, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Brain className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{quiz.subject}</h3>
                      <p className="text-sm text-gray-600">{quiz.questions} questions • {quiz.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${quiz.score >= 80 ? 'text-green-600' : quiz.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {quiz.score}%
                    </div>
                    <div className="text-sm text-gray-600">Score</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Progress */}
          <div className="bg-white rounded-xl p-6 shadow-lg mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Weekly Progress</h2>
            <div className="flex items-end space-x-4 h-64">
              {weeklyProgress.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-gray-200 rounded-t-lg relative" style={{ height: '200px' }}>
                    <div
                      className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg w-full absolute bottom-0 transition-all duration-500"
                      style={{ height: `${(day.score / 100) * 200}px` }}
                    />
                  </div>
                  <div className="mt-2 text-center">
                    <div className="text-sm font-semibold text-gray-900">{day.score}%</div>
                    <div className="text-xs text-gray-600">{day.day}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h2>
            <div className="space-y-4">
              {achievements.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-4 p-4 rounded-lg ${item.bgColor}`}
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatBox = ({ icon, title, subtitle, bgColor }: { icon: JSX.Element; title: string; subtitle: string; bgColor: string }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg">
    <div className="flex items-center space-x-4">
      <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900">{title}</div>
        <div className="text-gray-600">{subtitle}</div>
      </div>
    </div>
  </div>
);

export default ProgressDashboard;


