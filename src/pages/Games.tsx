import React, { useState, useEffect } from 'react';
import { games as initialGames, quizQuestions, secretRecipes } from '../data/games';
import Quiz from '../components/Quiz';
import MemoryMatch from '../components/MemoryMatch';
import { Game, SecretRecipe } from '../types/game';

const Games: React.FC = () => {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [unlockedRecipe, setUnlockedRecipe] = useState<SecretRecipe | null>(null);

  useEffect(() => {
    // Load completed games from localStorage
    const completedGames = JSON.parse(localStorage.getItem('completedGames') || '[]');
    const updatedGames = games.map(game => ({
      ...game,
      completed: completedGames.includes(game.id)
    }));
    setGames(updatedGames);
  }, []);

  const handleGameComplete = (gameId: string) => {
    // Save completed game to localStorage
    const completedGames = JSON.parse(localStorage.getItem('completedGames') || '[]');
    if (!completedGames.includes(gameId)) {
      completedGames.push(gameId);
      localStorage.setItem('completedGames', JSON.stringify(completedGames));
    }

    // Update games state
    setGames(prevGames =>
      prevGames.map(game =>
        game.id === gameId ? { ...game, completed: true } : game
      )
    );

    // Show unlock modal and save unlocked recipe
    const game = games.find(g => g.id === gameId);
    if (game && game.secretRecipeId) {
      const recipe = secretRecipes.find(r => r.id === game.secretRecipeId);
      if (recipe) {
        // Save unlocked recipe to localStorage
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const userIndex = users.findIndex(u => u.email === currentUser);
          if (userIndex !== -1) {
            if (!users[userIndex].unlockedRecipes) {
              users[userIndex].unlockedRecipes = [];
            }
            if (!users[userIndex].unlockedRecipes.includes(recipe.id)) {
              users[userIndex].unlockedRecipes.push(recipe.id);
              localStorage.setItem('users', JSON.stringify(users));
            }
          }
        }
        setUnlockedRecipe(recipe);
        setShowUnlockModal(true);
      }
    }
  };

  const renderGame = () => {
    if (!selectedGame) return null;

    switch (selectedGame.type) {
      case 'quiz':
        return (
          <Quiz
            questions={quizQuestions}
            onComplete={() => handleGameComplete(selectedGame.id)}
          />
        );
      case 'memory':
        return (
          <MemoryMatch
            onComplete={() => handleGameComplete(selectedGame.id)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Healthy Food Games
      </h1>

      {!selectedGame ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {games.map(game => (
            <div
              key={game.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => setSelectedGame(game)}
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                {game.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {game.description}
              </p>
              {game.completed && (
                <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-3 py-1 rounded-full text-sm">
                  Completed ✓
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedGame(null)}
            className="mb-6 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
          >
            ← Back to Games
          </button>
          {renderGame()}
        </div>
      )}

      {showUnlockModal && unlockedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold text-green-500 mb-4">
              Secret Recipe Unlocked! 🎉
            </h2>
            <div className="mb-4">
              <img
                src={unlockedRecipe.image}
                alt={unlockedRecipe.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {unlockedRecipe.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {unlockedRecipe.description}
              </p>
            </div>
            <button
              onClick={() => setShowUnlockModal(false)}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Games; 