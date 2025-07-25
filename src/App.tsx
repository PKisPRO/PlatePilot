import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

// Pages
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Games from './pages/Games';
import SecretRecipes from './pages/SecretRecipes';
import DietPlanner from './pages/DietPlanner';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        {/* Navigation */}
        <nav className="bg-white dark:bg-gray-800 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold text-green-600 dark:text-green-400">
                  PlatePilot
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">
                  Home
                </Link>
                <Link to="/recipes" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">
                  Recipes
                </Link>
                <Link to="/games" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">
                  Games
                </Link>
                <Link to="/secret-recipes" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">
                  Secret Recipes
                </Link>
                <Link to="/diet-planner" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">
                  Diet Planner
                </Link>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  {darkMode ? (
                    <SunIcon className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <MoonIcon className="h-5 w-5 text-gray-700" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/games" element={<Games />} />
            <Route path="/secret-recipes" element={<SecretRecipes />} />
            <Route path="/diet-planner" element={<DietPlanner />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 shadow-lg mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-gray-600 dark:text-gray-400">
              © 2024 PlatePilot. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App; 