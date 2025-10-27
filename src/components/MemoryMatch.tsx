import React, { useState, useEffect } from 'react';
import { MemoryCard } from '../types/game';

interface MemoryMatchProps {
  onComplete: () => void;
}

const MemoryMatch: React.FC<MemoryMatchProps> = ({ onComplete }) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);

  const foodEmojis = ['🥗', '🥑', '🥦', '🥕', '🍎', '🍓', '🥝', '🥬'];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const cardPairs = [...foodEmojis, ...foodEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      }));
    setCards(cardPairs);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
  };

  const handleCardClick = (index: number) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(index) ||
      cards[index].isMatched
    ) {
      return;
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstIndex, secondIndex] = newFlippedCards;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.emoji === secondCard.emoji) {
        setCards(
          cards.map((card, i) =>
            i === firstIndex || i === secondIndex
              ? { ...card, isMatched: true }
              : card
          )
        );
        setMatchedPairs(matchedPairs + 1);
        setFlippedCards([]);

        if (matchedPairs + 1 === foodEmojis.length) {
          onComplete();
        }
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-600 dark:text-gray-300">
          Moves: {moves}
        </div>
        <div className="text-gray-600 dark:text-gray-300">
          Matched: {matchedPairs}/{foodEmojis.length}
        </div>
        <button
          onClick={initializeGame}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Restart
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <button
            key={index}
            onClick={() => handleCardClick(index)}
            className={`aspect-square flex items-center justify-center text-4xl rounded-lg transition-all transform ${
              card.isMatched
                ? 'bg-green-100 dark:bg-green-900'
                : flippedCards.includes(index)
                ? 'bg-white dark:bg-gray-700'
                : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'
            }`}
          >
            {flippedCards.includes(index) || card.isMatched ? card.emoji : '❓'}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MemoryMatch; 