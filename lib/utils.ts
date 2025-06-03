import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shuffleInPlace<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function getIndexOfLowest(numbers: number[]): number {
    if (numbers.length === 0) return -1; // Handle empty array
    
    let lowestIndex = 0;
    
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] < numbers[lowestIndex]) {
            lowestIndex = i;
        }
    }
    
    return lowestIndex;
}