import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Heart, MessageCircle } from 'lucide-react';

interface StoryItem {
  id: number;
  contentUrl: string;
  user: string;
  time: string;
  avatarColor: string;
  isLive: boolean;
}

const mockStories: StoryItem[] = [
  { id: 1, contentUrl: 'https://placehold.co/1080x1920/222/FFF?text=DEV+STORY+1', user: 'Ronin', time: '1h', avatarColor: 'bg-teal-500', isLive: true },
  { id: 2, contentUrl: 'https://placehold.co/1080x1920/4B0082/FFF?text=NEW+CODE+SNIPPET', user: 'Aura', time: '2h', avatarColor: 'bg-purple-500', isLive: false },
  { id: 3, contentUrl: 'https://placehold.co/1080x1920/004080/FFF?text=DASHBOARD+ANALYTICS', user: 'Nexus', time: '4h', avatarColor: 'bg-blue-500', isLive: false },
];

const Stories: React.FC = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const storyDuration = 5000;

  const currentStory = mockStories[currentStoryIndex];
  const isFirst = currentStoryIndex === 0;
  const isLast = currentStoryIndex === mockStories.length - 1;

  const goToNextStory = () => {
    if (!isLast) {
      setCurrentStoryIndex(prev => prev + 1);
      setProgress(0);
    }
  };

  const goToPrevStory = () => {
    if (!isFirst) {
      setCurrentStoryIndex(prev => prev - 1);
      setProgress(0);
    }
  };

  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => Math.min(prev + 1, 100));
      }, storyDuration / 100); 
      return () => clearTimeout(timer);
    } else {
      goToNextStory();
    }
  }, [progress]);

  useEffect(() => {
    setProgress(0);
  }, [currentStoryIndex]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center p-0 md:p-4">
      <div className="relative w-full h-full max-w-sm max-h-screen md:max-h-[90vh] bg-gray-900 rounded-none md:rounded-xl overflow-hidden shadow-2xl">
        
        {/* Story Content Area */}
        <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
                backgroundImage: `url(${currentStory.contentUrl})`,
                backgroundColor: currentStory.avatarColor
            }}
        >
            <img src={currentStory.contentUrl} alt="Story Content" className="w-full h-full object-cover" onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.style.display = 'none';
            }}/>
        </div>

        {/* Overlay Container */}
        <div className="relative w-full h-full p-4 flex flex-col justify-between">
          
          {/* Top Bar (Progress & User Info) */}
          <div>
            {/* Progress Bars */}
            <div className="flex space-x-1 mb-3">
              {mockStories.map((_, index) => (
                <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white transition-all duration-100 ease-linear"
                    style={{ width: `${index < currentStoryIndex ? 100 : (index === currentStoryIndex ? progress : 0)}%` }}
                  />
                </div>
              ))}
            </div>

            {/* User Info & Close */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 ${currentStory.avatarColor} rounded-full flex items-center justify-center text-white font-bold text-sm ring-2 ring-white`}>
                  {currentStory.user[0]}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{currentStory.user}</h3>
                  <p className="text-xs text-gray-300">{currentStory.time} ago {currentStory.isLive && <span className="text-red-400 font-bold ml-1">• LIVE</span>}</p>
                </div>
              </div>
              <button className="text-white hover:text-gray-300 transition" onClick={() => console.log('Close Story')}>
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          {/* Navigation Controls */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
            <button
              onClick={goToPrevStory}
              className={`p-2 rounded-full bg-black/30 text-white ${isFirst ? 'opacity-0 cursor-default' : 'hover:bg-black/50 transition'}`}
              disabled={isFirst}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNextStory}
              className={`p-2 rounded-full bg-black/30 text-white ${isLast ? 'opacity-0 cursor-default' : 'hover:bg-black/50 transition'}`}
              disabled={isLast}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          {/* Bottom Interaction Bar */}
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Send a message..."
              className="flex-1 p-3 bg-white/20 border border-white/30 rounded-full text-white placeholder-gray-300 focus:ring-teal-500 focus:border-teal-500 transition duration-300"
            />
            <button className="p-3 bg-red-500 hover:bg-red-600 rounded-full text-white transition">
              <Heart className="w-6 h-6 fill-white" />
            </button>
            <button className="p-3 bg-blue-500 hover:bg-blue-600 rounded-full text-white transition">
              <MessageCircle className="w-6 h-6" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Stories;