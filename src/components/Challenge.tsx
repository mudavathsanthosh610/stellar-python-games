
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PythonChallenge } from '@/data/challenges';

interface ChallengeProps {
  challenge: PythonChallenge;
}

const Challenge: React.FC<ChallengeProps> = ({ challenge }) => {
  // Function to generate difficulty badge color
  const getDifficultyColor = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-500 hover:bg-green-600';
      case 'Medium':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'Hard':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  return (
    <Card className="border-2 border-python-blue/20 shadow-lg animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-python-blue/10 to-transparent pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold text-python-blue">
              {challenge.title}
            </CardTitle>
            <CardDescription className="mt-1 text-gray-600">
              Challenge #{challenge.id}
            </CardDescription>
          </div>
          <Badge className={`${getDifficultyColor(challenge.difficulty)}`}>
            {challenge.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2">Description:</h3>
          <p className="text-gray-700">{challenge.description}</p>
        </div>
        
        {challenge.testCases.length > 0 && (
          <div className="mb-4">
            <h3 className="text-md font-semibold mb-2">Test Cases:</h3>
            <div className="space-y-2">
              {challenge.testCases.map((testCase, index) => (
                <div 
                  key={index}
                  className="bg-gray-100 p-2 rounded text-sm font-mono"
                >
                  {testCase.input ? (
                    <div>
                      <span className="text-python-blue">Input: </span>
                      <code>{JSON.stringify(testCase.input)}</code>
                      <br />
                      <span className="text-python-green">Expected Output: </span>
                      <code>{JSON.stringify(testCase.expectedOutput)}</code>
                    </div>
                  ) : (
                    <div>
                      <span className="text-python-green">Expected Output: </span>
                      <code>{JSON.stringify(testCase.expectedOutput)}</code>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="text-sm text-gray-500 italic">
          Write your solution in the code editor and click "Run Code" to test it!
        </div>
      </CardContent>
    </Card>
  );
};

export default Challenge;
