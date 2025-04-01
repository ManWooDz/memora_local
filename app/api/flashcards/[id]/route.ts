// app/api/flashcards/[id]/route.ts
import { NextResponse } from 'next/server';
import { flashcards } from '../route';

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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const flashcard = flashcards.find(card => card.id === id);
  
  if (!flashcard) {
    return new NextResponse(JSON.stringify({ error: 'Flashcard not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  return NextResponse.json(flashcard);
}

// PUT and DELETE methods as in previous example
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);
    const data = await request.json();
    
    const index = flashcards.findIndex(card => card.id === id);
    
    if (index === -1) {
    return new NextResponse(JSON.stringify({ error: 'Flashcard not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
    });
    }
    
    // Update the flashcard but preserve the ID
    flashcards[index] = {
    ...data,
    id
    };
    
    return NextResponse.json(flashcards[index]);
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);
    
    const index = flashcards.findIndex(card => card.id === id);
    
    if (index === -1) {
    return new NextResponse(JSON.stringify({ error: 'Flashcard not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
    });
    }
    
    // Remove the flashcard
    const deleted = flashcards.splice(index, 1)[0];
    
    return NextResponse.json({ deleted, success: true });
}