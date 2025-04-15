
import React, { useState, useEffect } from 'react';
import GameHeader from '@/components/GameHeader';
import CodeEditor from '@/components/CodeEditor';
import Challenge from '@/components/Challenge';
import { pythonChallenges } from '@/data/challenges';
import { EvaluationResult } from '@/utils/codeEvaluation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeftIcon, ChevronRightIcon, TrophyIcon } from 'lucide-react';
import PythonMascot from '@/components/PythonMascot';

const Index = () => {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  const [lastResult, setLastResult] = useState<EvaluationResult | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const currentChallenge = pythonChallenges[currentChallengeIndex];
  
  // Reset result when challenge changes
  useEffect(() => {
    setLastResult(null);
  }, [currentChallengeIndex]);

  // Handle code submission
  const handleCodeSubmit = (result: EvaluationResult) => {
    setLastResult(result);
    
    if (result.success && !completedChallenges.includes(currentChallenge.id)) {
      setCompletedChallenges(prev => [...prev, currentChallenge.id]);
      setShowCelebration(true);
      
      // Hide celebration after 3 seconds
      setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
    }
  };

  // Navigate to previous challenge
  const goToPreviousChallenge = () => {
    if (currentChallengeIndex > 0) {
      setCurrentChallengeIndex(prev => prev - 1);
    }
  };

  // Navigate to next challenge
  const goToNextChallenge = () => {
    if (currentChallengeIndex < pythonChallenges.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
    }
  };

  // Calculate current level (1-based)
  const currentLevel = Math.floor(completedChallenges.length / 2) + 1;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <GameHeader 
          level={currentLevel} 
          completedChallenges={completedChallenges} 
          totalChallenges={pythonChallenges.length} 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Challenge challenge={currentChallenge} />
            
            {/* Navigation buttons */}
            <div className="mt-6 flex justify-between">
              <Button
                onClick={goToPreviousChallenge}
                disabled={currentChallengeIndex === 0}
                variant="outline"
                className="border-python-blue text-python-blue"
              >
                <ChevronLeftIcon className="mr-2 h-4 w-4" /> Previous
              </Button>
              
              <Button
                onClick={goToNextChallenge}
                disabled={currentChallengeIndex === pythonChallenges.length - 1}
                variant="outline"
                className="border-python-blue text-python-blue"
              >
                Next <ChevronRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            {/* Mobile mascot - only visible on small screens */}
            <div className="mt-8 flex justify-center lg:hidden">
              <PythonMascot 
                mood={lastResult?.success ? "happy" : "thinking"} 
              />
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <CodeEditor 
              challenge={currentChallenge} 
              onCodeSubmit={handleCodeSubmit} 
            />
            
            {/* Results display */}
            {lastResult && (
              <div className={`mt-6 p-4 rounded-lg border ${
                lastResult.success 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <h3 className={`font-bold ${
                  lastResult.success ? 'text-green-700' : 'text-red-700'
                }`}>
                  {lastResult.success ? 'Success!' : 'Not quite right'}
                </h3>
                <p className="mt-1">{lastResult.output}</p>
                
                {lastResult.error && (
                  <div className="mt-2 p-2 bg-red-100 rounded text-sm font-mono text-red-800">
                    {lastResult.error}
                  </div>
                )}
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Tests Passed</span>
                    <span>{lastResult.passedTests}/{lastResult.totalTests}</span>
                  </div>
                  <Progress 
                    value={(lastResult.passedTests / lastResult.totalTests) * 100} 
                    className={`h-2 ${lastResult.success ? 'bg-green-200' : 'bg-red-200'}`}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Celebration overlay */}
        {showCelebration && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-fade-in">
            <div className="bg-white p-8 rounded-lg text-center max-w-md mx-4">
              <TrophyIcon className="w-16 h-16 text-python-yellow mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-python-blue mb-2">Challenge Completed!</h2>
              <p className="mb-4">You've successfully solved the challenge.</p>
              <div className="py-2 px-3 bg-green-100 rounded-md mb-4 text-green-800 text-sm">
                +1 Python Skill Level
              </div>
              <Button 
                onClick={() => {
                  setShowCelebration(false);
                  if (currentChallengeIndex < pythonChallenges.length - 1) {
                    goToNextChallenge();
                  }
                }}
                className="bg-python-blue hover:bg-python-blue/90"
              >
                {currentChallengeIndex < pythonChallenges.length - 1 
                  ? "Next Challenge" 
                  : "Finish"}
              </Button>
            </div>
          </div>
        )}
        
        {/* Code particles for decoration */}
        <div className="fixed bottom-10 right-10 z-0 opacity-10 hidden lg:block">
          <div className="code-particle text-xl">print("Python")</div>
          <div className="code-particle text-xl mt-3 ml-8">def main():</div>
          <div className="code-particle text-xl mt-6 ml-4">if __name__ == "__main__":</div>
        </div>
      </div>
    </div>
  );
};

export default Index;
