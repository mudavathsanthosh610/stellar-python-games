
import React from 'react';

interface PythonMascotProps {
  mood: 'happy' | 'thinking' | 'surprised';
  className?: string;
}

const PythonMascot: React.FC<PythonMascotProps> = ({ mood, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="w-24 h-24 relative">
        {mood === 'happy' && (
          <div className="python-mascot happy">
            <div className="w-20 h-20 bg-python-blue rounded-full flex items-center justify-center border-4 border-python-yellow">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="flex space-x-6 mb-1">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                  </div>
                  <div className="w-8 h-3 bg-transparent border-b-2 border-black rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-1 left-4 w-12 h-4 bg-python-yellow rounded-full"></div>
            <div className="absolute -bottom-3 left-2 w-16 h-3 bg-python-blue rounded-full"></div>
          </div>
        )}

        {mood === 'thinking' && (
          <div className="python-mascot thinking">
            <div className="w-20 h-20 bg-python-blue rounded-full flex items-center justify-center border-4 border-python-yellow">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="flex space-x-6 mb-1">
                    <div className="w-2 h-1 bg-black rounded-full"></div>
                    <div className="w-2 h-1 bg-black rounded-full"></div>
                  </div>
                  <div className="w-6 h-1 bg-black mt-3"></div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-1 left-4 w-12 h-4 bg-python-yellow rounded-full"></div>
            <div className="absolute -bottom-3 left-2 w-16 h-3 bg-python-blue rounded-full"></div>
          </div>
        )}

        {mood === 'surprised' && (
          <div className="python-mascot surprised">
            <div className="w-20 h-20 bg-python-blue rounded-full flex items-center justify-center border-4 border-python-yellow">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="flex space-x-6 mb-1">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                  </div>
                  <div className="w-4 h-4 bg-transparent border-2 border-black rounded-full mt-1"></div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-1 left-4 w-12 h-4 bg-python-yellow rounded-full"></div>
            <div className="absolute -bottom-3 left-2 w-16 h-3 bg-python-blue rounded-full"></div>
          </div>
        )}
      </div>
      <div className="absolute -z-10 -right-2 -top-1">
        <div className="code-particle text-sm opacity-20">import</div>
        <div className="code-particle text-sm opacity-30 ml-6 mt-6">def</div>
        <div className="code-particle text-sm opacity-20 ml-12 mt-3">for</div>
        <div className="code-particle text-sm opacity-30 ml-3 mt-10">print()</div>
      </div>
    </div>
  );
};

export default PythonMascot;
