// Simulated API service
// In a real app, these would connect to actual endpoints


// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


// Mock database
let highScores = [
  { id: 1, score: 800, moves: 10, difficulty: 'medium', cardCount: 16, date: new Date().toISOString() },
  { id: 2, score: 1200, moves: 8, difficulty: 'hard', cardCount: 16, date: new Date().toISOString() },
  { id: 3, score: 600, moves: 12, difficulty: 'easy', cardCount: 16, date: new Date().toISOString() }
];


// Fetch high scores
export const fetchHighScores = async () => {
  await delay(500); // Simulate network delay
  return [...highScores].sort((a, b) => b.score - a.score);
};


// Save a new score
export const saveScore = async (scoreData) => {
  await delay(500); // Simulate network delay
  const newScore = {
    id: highScores.length + 1,
    ...scoreData,
    date: new Date().toISOString()
  };
  highScores.push(newScore);
  return newScore;
};


// Fetch game animals (simulating external API)
export const fetchGameAnimals = async () => {
  await delay(300); // Simulate network delay
  return [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼',
    '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔',
    '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺',
    '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞'
  ];
};

