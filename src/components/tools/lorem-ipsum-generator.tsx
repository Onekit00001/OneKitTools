"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Clipboard, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const loremIpsumText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export default function LoremIpsumGenerator() {
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [count, setCount] = useState(5);
  const [generatedText, setGeneratedText] = useState('');
  const { toast } = useToast();

  const generateText = () => {
    let result = '';
    const words = loremIpsumText.split(' ');
    const sentences = loremIpsumText.split('. ');

    if (type === 'words') {
      result = Array.from({ length: count }, (_, i) => words[i % words.length]).join(' ');
    } else if (type === 'sentences') {
      result = Array.from({ length: count }, (_, i) => sentences[i % sentences.length]).join('. ') + '.';
    } else { // paragraphs
      result = Array.from({ length: count }, () => loremIpsumText).join('\n\n');
    }
    setGeneratedText(result);
  };

  const copyToClipboard = () => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText);
      toast({ title: 'Text copied to clipboard!' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <RadioGroup defaultValue="paragraphs" onValueChange={(v) => setType(v as any)} className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="paragraphs" id="r1" />
            <Label htmlFor="r1">Paragraphs</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sentences" id="r2" />
            <Label htmlFor="r2">Sentences</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="words" id="r3" />
            <Label htmlFor="r3">Words</Label>
          </div>
        </RadioGroup>
        <Input
          type="number"
          value={count}
          onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-24"
        />
        <Button onClick={generateText}>
          <Sparkles className="mr-2 h-4 w-4" /> Generate
        </Button>
      </div>

      {generatedText && (
        <div className="space-y-2">
          <Textarea value={generatedText} readOnly className="h-48" />
          <Button variant="outline" onClick={copyToClipboard}>
            <Clipboard className="mr-2 h-4 w-4" /> Copy
          </Button>
        </div>
      )}
    </div>
  );
}
