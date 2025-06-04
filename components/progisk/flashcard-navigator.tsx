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
  title: string;
  question: string;
  answer: string;
}

export const FlashcardNavigator: React.FC<FlashcardNavigatorProps> = ({ flashcard_collections }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [viewedIndices, setViewedIndices] = useState<Set<number>>(new Set());
  const [allCards, setAllCards] = useState<CardWithCollection[]>([]);
  const [filteredCards, setFilteredCards] = useState<CardWithCollection[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [availableTopics, setAvailableTopics] = useState<string[]>([]);

  // Flatten all cards from all collections into a single array
  useEffect(() => {
    const flattenedCards: CardWithCollection[] = [];
    const topics = new Set<string>();
    
    flashcard_collections.forEach((collection, collectionIndex) => {
      topics.add(collection.topic);
      collection.flashcards.forEach((card, cardIndex) => {
        flattenedCards.push({
          collectionIndex,
          cardIndex,
          topic: collection.topic,
          title: card.title,
          question: card.question,
          answer: card.answer
        });
      });
    });
    
    setAllCards(flattenedCards);
    setAvailableTopics(Array.from(topics));
    setFilteredCards(flattenedCards); // Initially show all cards
    
    // Set initial random index
    if (flattenedCards.length > 0) {
      const randomIndex = Math.floor(Math.random() * flattenedCards.length);
      setCurrentIndex(randomIndex);
    }
  }, [flashcard_collections]);

  // Filter cards based on selected topic
  useEffect(() => {
    let filtered = allCards;
    
    if (selectedTopic !== 'all') {
      filtered = allCards.filter(card => card.topic === selectedTopic);
    }
    
    setFilteredCards(filtered);
    setViewedIndices(new Set()); // Reset viewed cards when filter changes
    
    // Set new random index for filtered cards
    if (filtered.length > 0) {
      const randomIndex = Math.floor(Math.random() * filtered.length);
      setCurrentIndex(randomIndex);
    }
  }, [selectedTopic, allCards]);

  const handleTopicChange = (topic: string) => {
    setSelectedTopic(topic);
  };

  const handleNext = () => {
    // Add current index to viewed list
    setViewedIndices(prev => new Set([...prev, currentIndex]));
    
    // Get unviewed indices from filtered cards
    const unviewedIndices = Array.from({ length: filteredCards.length }, (_, i) => i)
      .filter(index => !viewedIndices.has(index) && index !== currentIndex);
    
    if (unviewedIndices.length > 0) {
      // Pick random from unviewed
      const randomIndex = unviewedIndices[Math.floor(Math.random() * unviewedIndices.length)];
      setCurrentIndex(randomIndex);
    } else {
      // All cards viewed, reset and start over
      setViewedIndices(new Set([currentIndex]));
      const allIndices = Array.from({ length: filteredCards.length }, (_, i) => i)
        .filter(index => index !== currentIndex);
      if (allIndices.length > 0) {
        const randomIndex = allIndices[Math.floor(Math.random() * allIndices.length)];
        setCurrentIndex(randomIndex);
      }
    }
  };

  const handleReset = () => {
    setViewedIndices(new Set());
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    setCurrentIndex(randomIndex);
  };

  if (filteredCards.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center">
        <p className="text-lg text-muted-foreground">No flashcards available for the selected topic</p>
      </div>
    );
  }

  const currentCard = filteredCards[currentIndex];
  const progress = viewedIndices.size;
  const total = filteredCards.length;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Topic Filter */}
      <div className="mb-6">
        <div className="text-lg md:text-xl xl:text-2xl font-medium mb-4">
          Select Topic
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleTopicChange('all')}
            className={`
              px-4 py-2 rounded-md border text-sm md:text-base
              ${selectedTopic === 'all' 
                ? 'bg-foreground text-background border-foreground' 
                : 'bg-background text-foreground border-foreground hover:bg-secondary'
              }
            `}
          >
            All Topics ({allCards.length})
          </button>
          {availableTopics.map((topic) => {
            const topicCount = allCards.filter(card => card.topic === topic).length;
            return (
              <button
                key={topic}
                onClick={() => handleTopicChange(topic)}
                className={`
                  px-4 py-2 rounded-md border text-sm md:text-base
                  ${selectedTopic === topic 
                    ? 'bg-foreground text-background border-foreground' 
                    : 'bg-background text-foreground border-foreground hover:bg-secondary'
                  }
                `}
              >
                {topic} ({topicCount})
              </button>
            );
          })}
        </div>
      </div>

      <Separator className="bg-foreground mb-6" />

      {/* Progress indicator */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm md:text-base text-muted-foreground">
          Progress: {progress}/{total} cards viewed
          {selectedTopic !== 'all' && (
            <span className="block text-xs">Topic: {selectedTopic}</span>
          )}
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
        title={currentCard.title}
        question={currentCard.question}
        answer={currentCard.answer}
      />
      
      {/* Navigation */}
      <div className="flex justify-center mt-4">
        <button 
          onClick={handleNext}
          className="
            text-lg md:text-xl xl:text-2xl font-medium 
            hover:underline hover:cursor-pointer
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          disabled={filteredCards.length <= 1}
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