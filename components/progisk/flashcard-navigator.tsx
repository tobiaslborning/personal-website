"use client"
import { useState, useEffect } from 'react';
import { Flashcard } from './flashcard';
import { Separator } from '../ui/separator';

interface FlashcardNavigatorProps {
  flashcard_collections: FlashCardCollections; // All collections
}

interface CardWithCollection {
  collectionIndex: number;
  cardIndex: number;
  topic: string;
  question: string;
  answer: string;
}

export const FlashcardNavigator: React.FC<FlashcardNavigatorProps> = ({ flashcard_collections }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [viewedIndices, setViewedIndices] = useState<Set<number>>(new Set());
  const [allCards, setAllCards] = useState<CardWithCollection[]>([]);

  // Flatten all cards from all collections into a single array
  useEffect(() => {
    const flattenedCards: CardWithCollection[] = [];
    
    flashcard_collections.forEach((collection, collectionIndex) => {
      collection.flashcards.forEach((card, cardIndex) => {
        flattenedCards.push({
          collectionIndex,
          cardIndex,
          topic: collection.topic,
          question: card.question,
          answer: card.answer
        });
      });
    });
    
    setAllCards(flattenedCards);
    
    // Set initial random index
    if (flattenedCards.length > 0) {
      const randomIndex = Math.floor(Math.random() * flattenedCards.length);
      setCurrentIndex(randomIndex);
    }
  }, [flashcard_collections]);

  const handleNext = () => {
    // Add current index to viewed list
    setViewedIndices(prev => new Set([...prev, currentIndex]));
    
    // Get unviewed indices
    const unviewedIndices = Array.from({ length: allCards.length }, (_, i) => i)
      .filter(index => !viewedIndices.has(index) && index !== currentIndex);
    
    if (unviewedIndices.length > 0) {
      // Pick random from unviewed
      const randomIndex = unviewedIndices[Math.floor(Math.random() * unviewedIndices.length)];
      setCurrentIndex(randomIndex);
    } else {
      // All cards viewed, reset and start over
      setViewedIndices(new Set([currentIndex]));
      const allIndices = Array.from({ length: allCards.length }, (_, i) => i)
        .filter(index => index !== currentIndex);
      if (allIndices.length > 0) {
        const randomIndex = allIndices[Math.floor(Math.random() * allIndices.length)];
        setCurrentIndex(randomIndex);
      }
    }
  };

  const handleReset = () => {
    setViewedIndices(new Set());
    const randomIndex = Math.floor(Math.random() * allCards.length);
    setCurrentIndex(randomIndex);
  };

  if (allCards.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center">
        <p className="text-lg text-muted-foreground">No flashcards available</p>
      </div>
    );
  }

  const currentCard = allCards[currentIndex];
  const progress = viewedIndices.size;
  const total = allCards.length;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress indicator */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm md:text-base text-muted-foreground">
          Progress: {progress}/{total} cards viewed
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleReset}
            className="text-sm md:text-base hover:underline text-muted-foreground"
          >
            Reset
          </button>
        </div>
      </div>
      
      <Separator className="bg-foreground mb-6" />
      
      {/* Current flashcard */}
      <Flashcard
        topic={currentCard.topic}
        question={currentCard.question}
        answer={currentCard.answer}
      />
      
      <Separator className="bg-foreground mt-6 mb-4" />
      
      {/* Navigation */}
      <div className="flex justify-center">
        <button 
          onClick={handleNext}
          className="
            text-lg md:text-xl xl:text-2xl font-medium 
            hover:underline hover:cursor-pointer
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          disabled={allCards.length <= 1}
        >
          Next Card →
        </button>
      </div>
      
      {progress === total && total > 1 && (
        <div className="text-center mt-4">
          <p className="text-sm md:text-base text-muted-foreground italic">
            All cards viewed! Click "Next" to start over.
          </p>
        </div>
      )}
    </div>
  );
};