"use client";

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function BinaryConverter() {
  const [text, setText] = useState('');
  const [binary, setBinary] = useState('');
  const { toast } = useToast();

  const textToBinary = () => {
    try {
      const binaryResult = text.split('').map(char => {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
      }).join(' ');
      setBinary(binaryResult);
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not convert text to binary.' });
    }
  };

  const binaryToText = () => {
    try {
      const textResult = binary.split(' ').map(bin => {
        return String.fromCharCode(parseInt(bin, 2));
      }).join('');
      setText(textResult);
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Invalid binary string.' });
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">
      <div className="space-y-2">
        <Label htmlFor="text-input">Text</Label>
        <Textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Hello World"
          className="h-40"
        />
        <Button onClick={textToBinary} className="w-full">Convert to Binary &darr;</Button>
      </div>
      <div className="space-y-2">
        <Label htmlFor="binary-input">Binary</Label>
        <Textarea
          id="binary-input"
          value={binary}
          onChange={(e) => setBinary(e.target.value)}
          placeholder="01001000 01100101 01101100 01101100 01101111"
          className="h-40 font-mono"
        />
        <Button onClick={binaryToText} className="w-full">Convert to Text &uarr;</Button>
      </div>
    </div>
  );
}
