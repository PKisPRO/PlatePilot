import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to <span className="text-green-600 dark:text-green-400">PlatePilot</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Your ultimate destination for healthy recipes, interactive games, and personalized diet planning.
          Discover a world of nutritious and delicious meals that will transform your eating habits.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/recipes"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
          >
            Explore Recipes
          </Link>
          <Link
            to="/diet-planner"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-green-100 hover:bg-green-200 transition-colors"
          >
            Start Diet Planning
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Healthy Recipes</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Access our curated collection of nutritious and delicious recipes, perfect for any occasion.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Interactive Games</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Make learning about nutrition fun with our engaging games and challenges.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">AI Diet Planner</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Get personalized meal plans and nutrition advice powered by advanced AI technology.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home; 