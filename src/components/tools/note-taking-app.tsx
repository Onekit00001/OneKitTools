"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash, Search, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

type Note = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

// Custom hook for localStorage
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) { return initialValue; }
  });
  const setValue = (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) { console.log(error); }
  };
  return [storedValue, setValue];
}

export default function NoteTakingApp() {
  const [notes, setNotes] = useLocalStorage<Note[]>('onekit-notes', []);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const createNote = () => {
    const newNote: Note = {
      id: Date.now(),
      title: 'New Note',
      content: '',
      createdAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
  };

  const updateNote = (id: number, title: string, content: string) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, title, content } : note
    );
    setNotes(updatedNotes);
    if (activeNote?.id === id) {
      setActiveNote({ ...activeNote, title, content });
    }
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
    if (activeNote?.id === id) {
      const remainingNotes = notes.filter(note => note.id !== id);
      setActiveNote(remainingNotes.length > 0 ? remainingNotes[0] : null);
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  useEffect(() => {
    if(activeNote && !notes.find(n => n.id === activeNote.id)) {
        setActiveNote(notes.length > 0 ? notes[0] : null);
    }
  }, [notes, activeNote]);

  return (
    <div className="grid md:grid-cols-3 gap-6 h-[70vh]">
      {/* Sidebar */}
      <div className="md:col-span-1 flex flex-col gap-4 border-r pr-4">
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button onClick={createNote} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="flex-grow">
          <div className="space-y-2">
            {filteredNotes.map(note => (
              <Card
                key={note.id}
                onClick={() => setActiveNote(note)}
                className={`cursor-pointer transition-colors ${activeNote?.id === note.id ? 'border-primary' : ''}`}
              >
                <CardHeader className="p-3">
                  <CardTitle className="text-sm truncate">{note.title}</CardTitle>
                  <CardDescription className="text-xs">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Editor */}
      <div className="md:col-span-2 flex flex-col">
        {activeNote ? (
          <div className="flex flex-col h-full gap-4">
            <div className="flex items-center gap-2">
              <Input
                value={activeNote.title}
                onChange={e => updateNote(activeNote.id, e.target.value, activeNote.content)}
                className="text-lg font-bold h-10 flex-grow"
              />
              <Button variant="destructive" size="icon" onClick={() => deleteNote(activeNote.id)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Textarea
              value={activeNote.content}
              onChange={e => updateNote(activeNote.id, activeNote.title, e.target.value)}
              className="flex-grow resize-none text-base"
              placeholder="Start writing..."
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground bg-secondary rounded-lg">
            <Edit className="h-12 w-12 mb-4" />
            <p className="text-lg font-semibold">Select a note to view or edit</p>
            <p>Or create a new one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}
