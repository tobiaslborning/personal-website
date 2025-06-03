"use server"
import fs from 'fs';
import path from 'path';


// Main function to read flashcard files from public/flashcards
export async function getFlashcardCollections(): Promise<FlashCardCollections> {
  try {
    const flashcardsDirectory = path.join(process.cwd(),'public','flashcards');
    
    if (!fs.existsSync(flashcardsDirectory)) {
      console.warn('Flashcards directory not found');
      return [];
    }
    
    const filenames = fs.readdirSync(flashcardsDirectory);
    const markdownFiles = filenames.filter(name => name.endsWith('.md'));
    
    const collections: FlashCardCollections = [];
    
    for (const filename of markdownFiles) {
      const filePath = path.join(flashcardsDirectory, filename);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Extract topic from filename
      const topic = extractTopicFromSource(filename);
      
      // Parse flashcards from content
      const flashcards = parseFlashcardsFromContent(content);
      
      if (flashcards.length > 0) {
        collections.push({
          topic,
          flashcards
        });
      }
    }
    
    return collections;
  } catch (error) {
    console.error('Error reading flashcard files:', error);
    return [];
  }
}

function parseFlashcardDocuments(documents: any[]): FlashCardCollections {
  return documents.map(doc => {
    const content = doc.document_content;
    const source = doc.source;
    
    // Extract topic from source filename (remove number prefix and file extension)
    const topic = extractTopicFromSource(source);
    
    // Parse flashcards from content
    const flashcards = parseFlashcardsFromContent(content);
    
    return {
      topic,
      flashcards
    };
  });
}

function extractTopicFromSource(source: string): string {
  // Remove file extension
  let topic = source.replace(/\.md$/, '');
  
  // Remove number prefix with various formats (e.g., "1-", "10 - ", "11-")
  topic = topic.replace(/^\d+\s*-\s*/, '');
  
  // Remove "_flashcards" suffix if present
  topic = topic.replace(/_flashcards$/, '');
  
  // Replace underscores and hyphens with spaces
  topic = topic.replace(/[_-]/g, ' ');
  
  // Clean up multiple spaces
  topic = topic.replace(/\s+/g, ' ');
  
  // Convert to title case
  topic = topic.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  
  return topic.trim();
}

function parseFlashcardsFromContent(content: string): FlashCard[] {
  const flashcards: FlashCard[] = [];
  
  // Try multiple card patterns since the format might vary
  let cardSections = content.split(/## Card \d+:/);
  
  // If no cards found with that pattern, try alternative patterns
  if (cardSections.length === 1) {
    cardSections = content.split(/##\s*Card\s*\d+\s*:/);
  }
  
  // If still no cards, try numbered sections
  if (cardSections.length === 1) {
    cardSections = content.split(/##\s*\d+\./);
  }
  
  console.log(`Found ${cardSections.length - 1} card sections`);
  
  // Skip the first element (header before first card)
  for (let i = 1; i < cardSections.length; i++) {
    const section = cardSections[i];
    
    // Try multiple question patterns
    let questionMatch = section.match(/^\s*(.+?)\*\*/);
    
    // If no match, try alternative patterns
    if (!questionMatch) {
      questionMatch = section.match(/^\s*\*\*(.+?)\*\*/);
    }
    
    if (!questionMatch) {
      questionMatch = section.match(/^\s*(.+?)\n/);
    }
    
    if (!questionMatch) {
      console.log(`No question found in section ${i}`);
      continue;
    }
    
    const question = questionMatch[1].trim().replace(/^\*\*|\*\*$/g, '');
    
    // Try multiple answer patterns
    let answerMatch = section.match(/<summary>.*?<\/summary>\s*([\s\S]*?)\s*<\/details>/i);
    
    // If no details/summary tags, try to find answer after question
    if (!answerMatch) {
      const lines = section.split('\n');
      const answerLines = lines.slice(1).filter(line => line.trim());
      if (answerLines.length > 0) {
        answerMatch = ["", answerLines.join('\n')];
      }
    }
    
    if (!answerMatch) {
      console.log(`No answer found in section ${i}`);
      continue;
    }
    
    let answer = answerMatch[1].trim();
    
    // Clean up the answer
    answer = cleanAnswerText(answer);
    
    if (question && answer) {
      flashcards.push({
        question,
        answer
      });
    }
  }
  
  return flashcards;
}

function cleanAnswerText(text: string): string {
  // Remove HTML tags but preserve line breaks
  text = text.replace(/<[^>]*>/g, '');
  
  // Convert multiple consecutive newlines to double newlines (paragraph breaks)
  text = text.replace(/\n\s*\n\s*\n+/g, '\n\n');
  
  // Preserve single newlines but clean up whitespace around them
  text = text.replace(/\s*\n\s*/g, '\n');
  
  // Convert markdown bold to simple text but keep structure
  text = text.replace(/\*\*(.*?)\*\*/g, '$1');
  
  // Handle markdown lists - preserve them
  text = text.replace(/^\s*[-*+]\s+/gm, '• ');
  text = text.replace(/^\s*\d+\.\s+/gm, (match, offset, string) => {
    const num = match.match(/\d+/)?.[0] || '1';
    return `${num}. `;
  });
  
  // Remove markdown code block markers but keep the content with line breaks
  text = text.replace(/```[\w]*\n?([\s\S]*?)\n?```/g, '$1');
  
  // Clean up excessive spaces but preserve intentional formatting
  text = text.replace(/ {3,}/g, ' ');
  text = text.replace(/\t/g, '  '); // Convert tabs to spaces
  
  return text.trim();
}

// Keep original function for backward compatibility
function processFlashcards(documentsData: { documents: any[] }): FlashCardCollections {
  return parseFlashcardDocuments(documentsData.documents);
}

// Export the types and functions
export { parseFlashcardDocuments, processFlashcards };