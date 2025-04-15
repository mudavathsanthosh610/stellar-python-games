
export interface PythonChallenge {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  initialCode: string;
  testCases: {
    input?: any[];
    expectedOutput: any;
  }[];
  hints: string[];
  solution: string;
}

export const pythonChallenges: PythonChallenge[] = [
  {
    id: 1,
    title: 'Hello, Python!',
    description: 'Write a function that returns the string "Hello, Python!"',
    difficulty: 'Easy',
    initialCode: 'def hello_python():\n    # Write your code here\n    pass',
    testCases: [
      {
        expectedOutput: 'Hello, Python!'
      }
    ],
    hints: [
      'In Python, you can return a string using the return keyword.',
      'Strings in Python can be defined using single or double quotes.'
    ],
    solution: 'def hello_python():\n    return "Hello, Python!"'
  },
  {
    id: 2,
    title: 'Sum of Two Numbers',
    description: 'Write a function that takes two numbers as parameters and returns their sum.',
    difficulty: 'Easy',
    initialCode: 'def sum_two_numbers(a, b):\n    # Write your code here\n    pass',
    testCases: [
      {
        input: [5, 3],
        expectedOutput: 8
      },
      {
        input: [10, -2],
        expectedOutput: 8
      },
      {
        input: [0, 0],
        expectedOutput: 0
      }
    ],
    hints: [
      'Use the + operator to add two numbers in Python.',
      'Make sure to return the result of the addition.'
    ],
    solution: 'def sum_two_numbers(a, b):\n    return a + b'
  },
  {
    id: 3,
    title: 'Even or Odd',
    description: 'Write a function that takes an integer as input and returns "Even" if the number is even, and "Odd" if the number is odd.',
    difficulty: 'Easy',
    initialCode: 'def even_or_odd(number):\n    # Write your code here\n    pass',
    testCases: [
      {
        input: [4],
        expectedOutput: 'Even'
      },
      {
        input: [7],
        expectedOutput: 'Odd'
      },
      {
        input: [0],
        expectedOutput: 'Even'
      }
    ],
    hints: [
      'Use the modulo operator (%) to check if a number is even or odd.',
      'If number % 2 equals 0, the number is even.'
    ],
    solution: 'def even_or_odd(number):\n    if number % 2 == 0:\n        return "Even"\n    else:\n        return "Odd"'
  },
  {
    id: 4,
    title: 'Reverse a String',
    description: 'Write a function that takes a string as input and returns the string in reverse order.',
    difficulty: 'Medium',
    initialCode: 'def reverse_string(text):\n    # Write your code here\n    pass',
    testCases: [
      {
        input: ['hello'],
        expectedOutput: 'olleh'
      },
      {
        input: ['Python'],
        expectedOutput: 'nohtyP'
      },
      {
        input: [''],
        expectedOutput: ''
      }
    ],
    hints: [
      'In Python, you can reverse a string using slicing: text[::-1]',
      'You can also use a loop to build the reversed string character by character.'
    ],
    solution: 'def reverse_string(text):\n    return text[::-1]'
  },
  {
    id: 5,
    title: 'Count Vowels',
    description: 'Write a function that counts the number of vowels (a, e, i, o, u) in a given string. The function should be case-insensitive.',
    difficulty: 'Medium',
    initialCode: 'def count_vowels(text):\n    # Write your code here\n    pass',
    testCases: [
      {
        input: ['hello'],
        expectedOutput: 2
      },
      {
        input: ['Python Programming'],
        expectedOutput: 5
      },
      {
        input: ['AEIOU'],
        expectedOutput: 5
      }
    ],
    hints: [
      'Convert the string to lowercase to make it case-insensitive.',
      'Iterate through each character and check if it is a vowel.',
      'You can use a list or set of vowels for comparison.'
    ],
    solution: 'def count_vowels(text):\n    vowels = "aeiou"\n    count = 0\n    for char in text.lower():\n        if char in vowels:\n            count += 1\n    return count'
  }
];
