import React, { useState, useEffect } from 'react';
import { secretRecipes } from '../data/games';
import { SecretRecipe } from '../types/game';

const SecretRecipes: React.FC = () => {
  const [unlockedRecipes, setUnlockedRecipes] = useState<SecretRecipe[]>([]);

  useEffect(() => {
    // Get current user
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      return;
    }

    // Get user's unlocked recipes
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === currentUser);
    
    if (user && user.unlockedRecipes) {
      // Get the unlocked recipes based on user's unlocked recipes
      const unlocked = secretRecipes.filter(recipe => 
        user.unlockedRecipes.includes(recipe.id)
      );
      setUnlockedRecipes(unlocked);
    }
  }, []);

  if (unlockedRecipes.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Secret Recipes
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            No Secret Recipes Unlocked Yet
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Play games to unlock secret recipes! Each game you complete will reveal a special recipe.
          </p>
          <a
            href="/games"
            className="inline-block bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            Play Games
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Secret Recipes
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {unlockedRecipes.map(recipe => (
          <div
            key={recipe.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {recipe.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {recipe.description}
              </p>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Ingredients
                </h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Instructions
                </h3>
                <ol className="list-decimal list-inside text-gray-600 dark:text-gray-300">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="mb-2">{instruction}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecretRecipes; 