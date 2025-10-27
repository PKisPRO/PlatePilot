import { Game, QuizQuestion, SecretRecipe } from '../types/game';

export const games: Game[] = [
  {
    id: 'nutrition-quiz',
    title: 'Nutrition Knowledge Quiz',
    description: 'Test your knowledge about healthy eating and nutrition!',
    type: 'quiz',
    secretRecipeId: 'golden-turmeric-latte',
    completed: false
  },
  {
    id: 'memory-match',
    title: 'Healthy Food Memory Match',
    description: 'Match pairs of healthy food items to unlock a secret recipe!',
    type: 'memory',
    secretRecipeId: 'super-green-smoothie',
    completed: false
  },
  {
    id: 'food-sorting',
    title: 'Food Sorting Game',
    description: 'Sort different foods into their correct food groups!',
    type: 'sorting',
    secretRecipeId: 'rainbow-buddha-bowl',
    completed: false
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Which of these is a good source of protein?',
    options: ['White bread', 'Quinoa', 'White rice', 'Potato chips'],
    correctAnswer: 1
  },
  {
    id: 2,
    question: 'What is the recommended daily water intake for adults?',
    options: ['2 cups', '4 cups', '8 cups', '12 cups'],
    correctAnswer: 2
  },
  {
    id: 3,
    question: 'Which vitamin is known as the "sunshine vitamin"?',
    options: ['Vitamin A', 'Vitamin C', 'Vitamin D', 'Vitamin E'],
    correctAnswer: 2
  },
  {
    id: 4,
    question: 'What is the main benefit of fiber in our diet?',
    options: [
      'Provides energy',
      'Builds muscle',
      'Aids digestion',
      'Strengthens bones'
    ],
    correctAnswer: 2
  },
  {
    id: 5,
    question: 'Which of these is a healthy fat?',
    options: ['Trans fat', 'Saturated fat', 'Omega-3', 'Margarine'],
    correctAnswer: 2
  }
];

export const secretRecipes: SecretRecipe[] = [
  {
    id: 'super-green-smoothie',
    title: 'Super Green Smoothie',
    description: 'A powerful blend of greens and fruits for maximum nutrition.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    ingredients: [
      '2 cups spinach',
      '1 banana',
      '1 apple',
      '1/2 cucumber',
      '1 tbsp chia seeds',
      '1 cup almond milk',
      '1 tbsp honey'
    ],
    instructions: [
      'Wash all fruits and vegetables',
      'Add all ingredients to a blender',
      'Blend until smooth',
      'Add more almond milk if too thick',
      'Serve immediately'
    ],
    unlocked: false
  },
  {
    id: 'golden-turmeric-latte',
    title: 'Golden Turmeric Latte',
    description: 'A warming, anti-inflammatory drink perfect for cold days.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    ingredients: [
      '1 cup almond milk',
      '1/2 tsp turmeric powder',
      '1/4 tsp cinnamon',
      '1/4 tsp ginger powder',
      '1 tbsp honey',
      'Pinch of black pepper'
    ],
    instructions: [
      'Heat almond milk in a small saucepan',
      'Add turmeric, cinnamon, and ginger',
      'Whisk until well combined',
      'Add honey and black pepper',
      'Strain and serve hot'
    ],
    unlocked: false
  },
  {
    id: 'rainbow-buddha-bowl',
    title: 'Rainbow Buddha Bowl',
    description: 'A colorful and nutritious bowl packed with plant-based goodness.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    ingredients: [
      '1 cup quinoa',
      '1 cup chickpeas',
      '1 avocado',
      '1 cup mixed vegetables',
      '2 cups mixed greens',
      '1/4 cup tahini dressing',
      '1 tbsp olive oil'
    ],
    instructions: [
      'Cook quinoa according to package instructions',
      'Roast vegetables with olive oil',
      'Prepare tahini dressing',
      'Assemble bowl with all ingredients',
      'Drizzle with dressing and serve'
    ],
    unlocked: false
  }
]; 