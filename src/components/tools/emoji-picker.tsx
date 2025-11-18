"use client";

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Search } from 'lucide-react';
import { emojiList } from '@/lib/emoji-list';

export default function EmojiPicker() {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const filteredEmojis = useMemo(() => {
    if (!searchTerm) return emojiList.slice(0, 100); // Show first 100 by default
    return emojiList.filter(emoji => 
        emoji.n.some(name => name.includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  const copyEmoji = (emoji: string) => {
    navigator.clipboard.writeText(emoji);
    toast({ title: `Copied ${emoji} to clipboard!` });
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for an emoji..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10"
        />
      </div>
      <div className="h-96 overflow-y-auto border rounded-lg p-4 grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
        {filteredEmojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => copyEmoji(String.fromCodePoint(...emoji.u.split('-').map(c => parseInt(c, 16))))}
            className="text-3xl rounded-md p-2 hover:bg-accent transition-colors"
            title={emoji.n[0]}
          >
            {String.fromCodePoint(...emoji.u.split('-').map(c => parseInt(c, 16)))}
          </button>
        ))}
      </div>
    </div>
  );
}
