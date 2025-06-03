type ImageFetchData = {
  src: string;
  alt: string;
  name: string;
  width?: number;
  height?: number;
  make?: string
  model?: string
  lensMake?: string
  lensModel?: string
  fstop?: number
  exposureTime?: string
}

type FlashCard = {
  title: string;
  question: string;
  answer: string;
};

type FlashCardCollections = {
  topic: string;
  flashcards: FlashCard[];
}[];