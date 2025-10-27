import React, { useState, useRef, useEffect } from 'react';
import { UserPreferences, ChatMessage, DietaryPreference, DietGoal } from '../types/diet';
import { dietPlannerService } from '../services/dietPlannerService';

const dietaryPreferences: DietaryPreference[] = [
  'vegetarian',
  'vegan',
  'pescatarian',
  'gluten-free',
  'dairy-free',
  'keto',
  'paleo',
  'mediterranean'
];

const dietGoals: DietGoal[] = [
  'weight-loss',
  'muscle-gain',
  'maintenance',
  'energy-boost',
  'heart-healthy'
];

const DietPlanner: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPreferences, setShowPreferences] = useState(true);
  const [preferences, setPreferences] = useState<UserPreferences>({
    dietaryPreference: 'vegetarian',
    dietGoal: 'maintenance',
    mealsPerDay: 3
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmitPreferences = async () => {
    setShowPreferences(false);
    setIsLoading(true);

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: `I'm following a ${preferences.dietaryPreference} diet and my goal is ${preferences.dietGoal}. I'd like ${preferences.mealsPerDay} meals per day.`,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);

    // Get AI response
    const response = await dietPlannerService.getResponse(preferences);
    
    // Add AI message
    const aiMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);

    setIsLoading(true);
    // Get AI response
    const response = await dietPlannerService.getResponse(preferences);
    
    // Add AI message
    const aiMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        AI Diet Planner
      </h1>

      {showPreferences ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
            Tell us about your dietary preferences
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Dietary Preference
              </label>
              <select
                value={preferences.dietaryPreference}
                onChange={e => setPreferences(prev => ({
                  ...prev,
                  dietaryPreference: e.target.value as DietaryPreference
                }))}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              >
                {dietaryPreferences.map(pref => (
                  <option key={pref} value={pref}>
                    {pref.charAt(0).toUpperCase() + pref.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Diet Goal
              </label>
              <select
                value={preferences.dietGoal}
                onChange={e => setPreferences(prev => ({
                  ...prev,
                  dietGoal: e.target.value as DietGoal
                }))}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              >
                {dietGoals.map(goal => (
                  <option key={goal} value={goal}>
                    {goal.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Meals per Day
              </label>
              <input
                type="number"
                min="1"
                max="6"
                value={preferences.mealsPerDay}
                onChange={e => setPreferences(prev => ({
                  ...prev,
                  mealsPerDay: parseInt(e.target.value)
                }))}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <button
              onClick={handleSubmitPreferences}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
            >
              Get Personalized Meal Plan
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <div className="h-[500px] overflow-y-auto mb-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`mb-4 ${
                    message.role === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block p-4 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <span className="text-xs opacity-75 mt-1 block">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="text-center text-gray-500 dark:text-gray-400">
                  AI is thinking...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                const input = e.currentTarget.elements.namedItem('message') as HTMLInputElement;
                handleSendMessage(input.value);
                input.value = '';
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                name="message"
                placeholder="Ask about your meal plan..."
                className="flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </div>

          <button
            onClick={() => setShowPreferences(true)}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
          >
            ← Change Preferences
          </button>
        </div>
      )}
    </div>
  );
};

export default DietPlanner; 