"use client"
import { useState } from 'react';
import { Separator } from '../ui/separator';

interface FlashcardProps {
  topic: string;
  title: string;
  question: string;
  answer: string;
}

export const Flashcard: React.FC<FlashcardProps> = ({ topic, title, question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Topic and Title - always visible */}
      <div className="text-lg md:text-xl xl:text-2xl font-medium mb-2">
        {topic}
      </div>
      <div className="text-base md:text-lg xl:text-xl text-muted-foreground mb-4">
        {title}
      </div>
      <Separator className="bg-foreground mb-4" />
      
      {/* Card */}
      <div 
        onClick={handleFlip}
        className="relative w-full min-h-[65vh] md:min-h-[75vh] cursor-pointer group"
      >
        <div className={`
          absolute inset-0 w-full h-full transition-transform duration-500 transform-style-preserve-3d
          ${isFlipped ? 'rotate-y-180' : ''}
        `}>
          {/* Front side - Question */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className="w-full h-full bg-background border border-foreground rounded-md shadow-sm flex flex-col p-6 lg:p-8">
              <div className="flex-1 flex items-center justify-center overflow-y-auto">
                <div className="text-center max-h-full">
                  <p className="text-lg md:text-xl xl:text-2xl font-light mb-4 whitespace-pre-line">
                    {question}
                  </p>
                </div>
              </div>
              <p className="text-sm md:text-base text-muted-foreground font-light italic text-center">
                Click to reveal answer
              </p>
            </div>
          </div>
          
          {/* Back side - Answer */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <div className="w-full h-full bg-secondary border border-foreground rounded-md shadow-sm flex flex-col p-6 lg:p-8">
              <div className="flex-1 overflow-y-auto">
                <div className="text-lg md:text-xl xl:text-2xl font-light mb-4 text-secondary-foreground whitespace-pre-line">
                  {answer}
                </div>
              </div>
              <p className="text-sm md:text-base text-muted-foreground font-light italic text-center">
                Click to see question
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};