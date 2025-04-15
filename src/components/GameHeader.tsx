
import React from 'react';
import PythonMascot from './PythonMascot';
import { CheckCircle2Icon } from 'lucide-react';

interface GameHeaderProps {
  level: number;
  completedChallenges: number[];
  totalChallenges: number;
}

const GameHeader: React.FC<GameHeaderProps> = ({ 
  level, 
  completedChallenges, 
  totalChallenges 
}) => {
  return (
    <header className="relative bg-gradient-to-r from-python-blue to-python-green p-6 rounded-lg shadow-lg mb-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-white mb-2">Python Coding Quest</h1>
          <p className="text-white/80">Master Python through interactive challenges</p>
        </div>
        
        <PythonMascot 
          mood={completedChallenges.length > 0 ? "happy" : "thinking"} 
          className="hidden md:block" 
        />
      </div>
      
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-md">
          <span className="text-white mr-2">Current Level:</span>
          <span className="font-bold text-python-yellow">{level}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-white">Progress:</span>
          <div className="flex space-x-1">
            {Array.from({ length: totalChallenges }).map((_, index) => (
              <div key={index} className="relative">
                {completedChallenges.includes(index + 1) ? (
                  <CheckCircle2Icon className="w-6 h-6 text-python-yellow" />
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-white/50"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 right-0 opacity-10 text-white text-5xl font-mono pointer-events-none">
        {">>>"}
      </div>
    </header>
  );
};

export default GameHeader;
