export type DietaryPreference = 
  | 'vegetarian'
  | 'vegan'
  | 'pescatarian'
  | 'gluten-free'
  | 'dairy-free'
  | 'keto'
  | 'paleo'
  | 'mediterranean';

export type DietGoal = 
  | 'weight-loss'
  | 'muscle-gain'
  | 'maintenance'
  | 'energy-boost'
  | 'heart-healthy';

export interface UserPreferences {
  dietaryPreference: DietaryPreference;
  dietGoal: DietGoal;
  allergies?: string[];
  calorieTarget?: number;
  mealsPerDay: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface MealPlan {
  day: string;
  meals: {
    type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    recipeId: string;
    calories: number;
  }[];
} 