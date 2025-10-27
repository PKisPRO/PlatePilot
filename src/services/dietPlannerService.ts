import { UserPreferences, ChatMessage, MealPlan } from '../types/diet';
import { recipes } from '../data/recipes';

const generateResponse = (preferences: UserPreferences): string => {
  const { dietaryPreference, dietGoal, mealsPerDay } = preferences;
  
  // Filter recipes based on dietary preference
  const filteredRecipes = recipes.filter(recipe => {
    const tags = recipe.tags.map(tag => tag.toLowerCase());
    return tags.includes(dietaryPreference.toLowerCase());
  });

  // Generate a sample meal plan
  const mealPlan: MealPlan[] = Array.from({ length: 7 }, (_, i) => ({
    day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i],
    meals: Array.from({ length: mealsPerDay }, (_, j) => {
      const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
      const randomRecipe = filteredRecipes[Math.floor(Math.random() * filteredRecipes.length)];
      return {
        type: mealTypes[j] as 'breakfast' | 'lunch' | 'dinner' | 'snack',
        recipeId: randomRecipe.id,
        calories: Math.floor(Math.random() * 300) + 200
      };
    })
  }));

  // Format the response
  let response = `Based on your ${dietaryPreference} diet and ${dietGoal} goal, here's your personalized meal plan:\n\n`;
  
  mealPlan.forEach(day => {
    response += `${day.day}:\n`;
    day.meals.forEach(meal => {
      const recipe = recipes.find(r => r.id === meal.recipeId);
      response += `- ${meal.type}: ${recipe?.title} (${meal.calories} calories)\n`;
    });
    response += '\n';
  });

  response += 'Would you like me to adjust anything in this plan?';
  
  return response;
};

export const dietPlannerService = {
  async getResponse(preferences: UserPreferences): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return generateResponse(preferences);
  }
}; 