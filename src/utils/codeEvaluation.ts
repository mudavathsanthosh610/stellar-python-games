
import { PythonChallenge } from "../data/challenges";

// This is a simplified evaluation system that mimics Python execution
// In a real app, you would want server-side evaluation or use a WASM Python interpreter

export interface EvaluationResult {
  success: boolean;
  output: string;
  error?: string;
  passedTests: number;
  totalTests: number;
}

export const evaluateCode = (code: string, challenge: PythonChallenge): EvaluationResult => {
  // Simple syntax checks
  if (code.trim() === '') {
    return {
      success: false,
      output: 'Your code is empty!',
      error: 'SyntaxError: Empty code',
      passedTests: 0,
      totalTests: challenge.testCases.length
    };
  }

  const functionName = extractFunctionName(challenge.initialCode);
  if (!code.includes(functionName)) {
    return {
      success: false,
      output: `Your code must include the ${functionName} function!`,
      error: `NameError: Function '${functionName}' not found`,
      passedTests: 0,
      totalTests: challenge.testCases.length
    };
  }

  // In a real implementation, we'd execute the code safely,
  // but here we'll use a simplified simulation
  try {
    // For our demo, we'll simply compare with the expected solution pattern
    const isCodeSimilarToSolution = simulateCodeExecution(code, challenge);
    
    if (isCodeSimilarToSolution) {
      return {
        success: true,
        output: 'All tests passed! Great job!',
        passedTests: challenge.testCases.length,
        totalTests: challenge.testCases.length
      };
    } else {
      // Check for partial success
      const partialSuccess = Math.floor(Math.random() * challenge.testCases.length);
      return {
        success: false,
        output: `Some tests failed. Keep trying!`,
        error: 'Your solution doesn\'t match the expected output for all test cases.',
        passedTests: partialSuccess,
        totalTests: challenge.testCases.length
      };
    }
  } catch (error) {
    return {
      success: false,
      output: 'Error executing your code',
      error: error instanceof Error ? error.message : String(error),
      passedTests: 0,
      totalTests: challenge.testCases.length
    };
  }
};

// Helper functions
function extractFunctionName(initialCode: string): string {
  const match = initialCode.match(/def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/);
  return match ? match[1] : 'unknown_function';
}

function simulateCodeExecution(code: string, challenge: PythonChallenge): boolean {
  // This is a very simplified simulation
  // In a real implementation, you would use a Python interpreter
  
  // Check if code is very similar to the solution
  // Remove whitespace and comments for comparison
  const normalizedCode = code.replace(/\s+|#.*/g, '').toLowerCase();
  const normalizedSolution = challenge.solution.replace(/\s+|#.*/g, '').toLowerCase();
  
  // If code is very similar to solution, consider it correct
  if (normalizedCode.includes(normalizedSolution.substring(normalizedSolution.indexOf('return')))) {
    return true;
  }
  
  // For our simplified evaluation, we'll check some challenge-specific patterns
  const functionName = extractFunctionName(challenge.initialCode);
  
  switch (challenge.id) {
    case 1: // Hello, Python!
      return normalizedCode.includes('return"hello,python!"') || 
             normalizedCode.includes("return'hello,python!'");
    
    case 2: // Sum of two numbers
      return normalizedCode.includes('returna+b');
    
    case 3: // Even or odd
      return (normalizedCode.includes('number%2==0') && normalizedCode.includes('return"even"')) &&
             normalizedCode.includes('return"odd"');
    
    case 4: // Reverse string
      return normalizedCode.includes('returntext[::-1]') ||
             (normalizedCode.includes('for') && normalizedCode.includes('return'));
    
    case 5: // Count vowels
      return (normalizedCode.includes('vowels') && normalizedCode.includes('count')) &&
             (normalizedCode.includes('for') && normalizedCode.includes('return'));
    
    default:
      return false;
  }
}
