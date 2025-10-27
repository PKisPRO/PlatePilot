export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface MemoryCard {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface SecretRecipe {
  id: string;
  title: string;
  description: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  unlocked: boolean;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'memory' | 'sorting';
  secretRecipeId: string;
  completed: boolean;
} 