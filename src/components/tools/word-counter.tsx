"use client";

import { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function WordCounter() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    if (!text.trim()) {
      return { words: 0, characters: 0, sentences: 0, paragraphs: 0 };
    }
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const characters = text.length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = text.split(/\n+/).filter(p => p.trim() !== '').length;
    return { words, characters, sentences, paragraphs };
  }, [text]);

  return (
    <div className="grid gap-6">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing or paste your text here..."
        className="h-64 text-base"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Words" value={stats.words} />
        <StatCard title="Characters" value={stats.characters} />
        <StatCard title="Sentences" value={stats.sentences} />
        <StatCard title="Paragraphs" value={stats.paragraphs} />
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <Card>
      <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
