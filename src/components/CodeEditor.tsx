
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlayIcon, RotateCcwIcon, LightbulbIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { PythonChallenge } from '@/data/challenges';
import { evaluateCode, EvaluationResult } from '@/utils/codeEvaluation';

interface CodeEditorProps {
  challenge: PythonChallenge;
  onCodeSubmit: (result: EvaluationResult) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ challenge, onCodeSubmit }) => {
  const [code, setCode] = useState(challenge.initialCode);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const { toast } = useToast();

  // Reset code when challenge changes
  useEffect(() => {
    setCode(challenge.initialCode);
    setShowHint(false);
    setCurrentHint(0);
  }, [challenge]);

  const handleRunCode = () => {
    const result = evaluateCode(code, challenge);
    onCodeSubmit(result);
    
    if (result.success) {
      toast({
        title: "Success!",
        description: "Your code passed all tests!",
        variant: "default",
      });
    } else {
      toast({
        title: "Oops! Something's not right",
        description: result.error || "Your code didn't pass all tests.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setCode(challenge.initialCode);
    toast({
      title: "Code Reset",
      description: "The code has been reset to its initial state.",
    });
  };

  const handleShowHint = () => {
    if (!showHint) {
      setShowHint(true);
    } else {
      // Cycle through available hints
      setCurrentHint((prev) => (prev + 1) % challenge.hints.length);
    }
  };

  // Function to generate line numbers
  const lineNumbers = () => {
    const lines = code.split('\n').length;
    return Array.from({ length: lines }, (_, i) => i + 1)
      .map(num => (
        <div key={num} className="code-editor-line-numbers">{num}</div>
      ));
  };

  return (
    <div className="code-editor-container bg-gray-100 rounded-lg overflow-hidden shadow-md">
      <div className="bg-python-darkBlue p-3 flex justify-between items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-white opacity-70 text-sm">Python Editor</div>
      </div>
      
      <div className="flex">
        <div className="code-editor-line-numbers-container py-4 bg-python-darkBlue/90 text-sm">
          {lineNumbers()}
        </div>
        
        <textarea
          className="code-editor resize-none w-full min-h-[300px] outline-none p-4 bg-python-darkBlue text-white text-sm"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          data-testid="code-editor"
        />
      </div>
      
      <div className="p-4 bg-gray-800 flex flex-wrap gap-2 justify-between items-center">
        <div className="flex space-x-2">
          <Button 
            onClick={handleRunCode}
            className="bg-python-green hover:bg-python-green/80 text-white"
          >
            <PlayIcon className="mr-2 h-4 w-4" /> Run Code
          </Button>
          
          <Button 
            onClick={handleReset}
            variant="outline"
            className="text-gray-300 border-gray-600 hover:bg-gray-700"
          >
            <RotateCcwIcon className="mr-2 h-4 w-4" /> Reset
          </Button>
        </div>
        
        <Button 
          onClick={handleShowHint}
          variant="ghost"
          className="text-python-yellow hover:text-python-yellow/80 hover:bg-gray-700"
        >
          <LightbulbIcon className="mr-2 h-4 w-4" /> 
          {showHint ? `Hint ${currentHint + 1}/${challenge.hints.length}` : "Get Hint"}
        </Button>
      </div>
      
      {showHint && (
        <div className="p-4 bg-python-yellow/10 border-t border-python-yellow/30 text-sm text-python-yellow">
          💡 {challenge.hints[currentHint]}
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
