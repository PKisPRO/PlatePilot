import React, { useState } from 'react';
import { Recipe } from '../types/recipe';
import { useNavigate } from 'react-router-dom';

interface RecipeCardProps {
  recipe: Recipe;
  onLike: (id: string) => void;
  onComment: (id: string, comment: string) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onLike, onComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const navigate = useNavigate();

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${recipe.title}</title>
            <style>
              body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
              img { max-width: 100%; height: auto; }
              .ingredients, .steps { margin: 20px 0; }
              .ingredients li, .steps li { margin: 10px 0; }
            </style>
          </head>
          <body>
            <h1>${recipe.title}</h1>
            <img src="${recipe.image}" alt="${recipe.title}" />
            <p>${recipe.description}</p>
            <div class="ingredients">
              <h2>Ingredients</h2>
              <ul>
                ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
              </ul>
            </div>
            <div class="steps">
              <h2>Instructions</h2>
              <ol>
                ${recipe.steps.map(step => `<li>${step}</li>`).join('')}
              </ol>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
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

        <div className="flex flex-wrap gap-2 mb-4">
          {recipe.tags.map(tag => (
            <span
              key={tag}
              className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-2 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span>⏱️ {recipe.cookingTime} mins</span>
          <span>👥 {recipe.servings} servings</span>
          <span>📊 {recipe.difficulty}</span>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Ingredients
          </h3>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Instructions
          </h3>
          <ol className="list-decimal list-inside text-gray-600 dark:text-gray-300">
            {recipe.steps.map((step, index) => (
              <li key={index} className="mb-2">{step}</li>
            ))}
          </ol>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => onLike(recipe.id)}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <span>❤️</span>
            <span>{recipe.likes}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <span>💬</span>
            <span>{recipe.comments.length}</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <span>🖨️</span>
            <span>Print</span>
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <span>←</span>
            <span>Back</span>
          </button>
        </div>

        {showComments && (
          <div className="mt-4">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Your name"
                value={commentAuthor}
                onChange={e => setCommentAuthor(e.target.value)}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 mb-2"
              />
              <textarea
                placeholder="Write a comment..."
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 mb-2"
                rows={3}
              />
              <button
                onClick={() => {
                  if (newComment.trim() && commentAuthor.trim()) {
                    onComment(recipe.id, newComment);
                    setNewComment('');
                  }
                }}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Post Comment
              </button>
            </div>

            <div className="space-y-4">
              {recipe.comments.map((comment, index) => (
                <div
                  key={index}
                  className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg"
                >
                  <div className="font-semibold text-gray-800 dark:text-white mb-1">
                    {comment.author}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {comment.text}
                  </p>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {new Date(comment.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard; 