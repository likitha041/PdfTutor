import React, { useState } from 'react';
import { Upload, FileText, Image, Link, Brain, ArrowRight, CheckCircle } from 'lucide-react';

interface ContentUploadProps {
  onViewChange: (view: 'home' | 'learning' | 'upload' | 'quiz' | 'progress') => void;
  onContentUpload: (content: string) => void;
}

const ContentUpload: React.FC<ContentUploadProps> = ({ onViewChange, onContentUpload }) => {
  const [uploadMethod, setUploadMethod] = useState<'file' | 'text' | 'link' | null>(null);
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleAnalyze = () => {
    if (!content.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      onContentUpload(content);
      
      // Auto-navigate to quiz after analysis
      setTimeout(() => {
        onViewChange('quiz');
      }, 2000);
    }, 3000);
  };

  const sampleContent = `Photosynthesis is the process by which plants convert light energy into chemical energy. During photosynthesis, plants use sunlight, carbon dioxide from the air, and water from the soil to produce glucose and oxygen. This process occurs mainly in the leaves, specifically in structures called chloroplasts, which contain the green pigment chlorophyll.

The equation for photosynthesis is:
6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂

Photosynthesis is crucial for life on Earth as it provides oxygen for respiration and forms the base of most food chains.`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Upload Your PDF Content</h1>
        <p className="text-xl text-gray-600">Transform your PDFs into interactive learning experiences</p>
      </div>

      {!uploadMethod && (
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div 
            onClick={() => setUploadMethod('file')}
            className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer group hover:scale-105"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Upload File</h3>
            <p className="text-gray-600">Upload PDF, Word documents, or images with text content</p>
          </div>

          <div 
            onClick={() => setUploadMethod('text')}
            className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer group hover:scale-105"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Paste Text</h3>
            <p className="text-gray-600">Paste text extracted from PDFs or type your study content directly</p>
          </div>

          <div 
            onClick={() => setUploadMethod('link')}
            className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer group hover:scale-105"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Link className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Add Link</h3>
            <p className="text-gray-600">Link to online PDFs, research papers, or educational resources</p>
          </div>
        </div>
      )}

      {uploadMethod === 'text' && (
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="w-6 h-6 text-green-600" />
            <h3 className="text-2xl font-bold text-gray-900">Paste Your Content</h3>
          </div>
          
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your study material here..."
            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => setContent(sampleContent)}
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              Use Sample Content
            </button>
            <div className="flex space-x-3">
              <button
                onClick={() => setUploadMethod(null)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleAnalyze}
                disabled={!content.trim() || isAnalyzing}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isAnalyzing ? (
                  <>
                    <Brain className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4" />
                    <span>Analyze Content</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {uploadMethod === 'file' && (
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <Upload className="w-6 h-6 text-blue-600" />
            <h3 className="text-2xl font-bold text-gray-900">Upload File</h3>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-xl font-semibold text-gray-900">Drop files here or click to browse</p>
                <p className="text-gray-600">Supports PDF files, scanned documents, and educational images</p>
              </div>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Browse Files
              </button>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setUploadMethod(null)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      )}

      {uploadMethod === 'link' && (
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <Link className="w-6 h-6 text-purple-600" />
            <h3 className="text-2xl font-bold text-gray-900">Add Web Link</h3>
          </div>
          
          <input
            type="url"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="https://example.com/article"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <div className="mt-4 flex justify-end space-x-3">
            <button
              onClick={() => setUploadMethod(null)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleAnalyze}
              disabled={!content.trim() || isAnalyzing}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isAnalyzing ? (
                <>
                  <Brain className="w-4 h-4 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4" />
                  <span>Analyze Content</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {isAnalyzing && (
        <div className="bg-white rounded-xl p-8 shadow-lg mt-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="w-8 h-8 text-blue-600 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">AI is Analyzing Your Content</h3>
            <p className="text-gray-600 mb-6">Please wait while we process your material and generate personalized questions...</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full w-2/3 animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      {analysisComplete && (
        <div className="bg-white rounded-xl p-8 shadow-lg mt-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Analysis Complete!</h3>
            <p className="text-gray-600 mb-6">Your PDF has been processed and personalized questions are ready. Redirecting to quiz...</p>
            <button
              onClick={() => onViewChange('quiz')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
            >
              <span>Start Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentUpload;