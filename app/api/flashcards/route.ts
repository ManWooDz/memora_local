// app/api/flashcards/route.ts (Next.js 13+)
import { NextResponse } from 'next/server';

// Define the Flashcard type to match page.tsx
type Flashcard = {
  id: number;
  frontText: string;
  backText: string;
  imageUrl: string | null;
  videoUrl: string | null;
  audioUrl: string | null;
  status: 'text' | 'image' | 'video' | 'audio';
};

// Initialize with proper typing
export let flashcards: Flashcard[] = [];

export async function GET() {
  return NextResponse.json(flashcards);
}

export async function POST(request: Request) {
  const data = await request.json();
  const newFlashcard: Flashcard = {
    ...data,
    id: Date.now(), // Simple ID generation
  };
  
  flashcards.push(newFlashcard);
  return NextResponse.json(newFlashcard);
}