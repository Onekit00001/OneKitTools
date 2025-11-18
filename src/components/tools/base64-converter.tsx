"use client";

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowRightLeft } from 'lucide-react';

export default function Base64Converter() {
  const [decoded, setDecoded] = useState('');
  const [encoded, setEncoded] = useState('');
  const { toast } = useToast();

  const handleEncode = () => {
    try {
      // Use Buffer for robust UTF-8 handling, works in browsers
      const encodedText = Buffer.from(decoded, 'utf8').toString('base64');
      setEncoded(encodedText);
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not encode text.' });
    }
  };

  const handleDecode = () => {
    try {
      // Use Buffer for robust UTF-8 handling
      const decodedText = Buffer.from(encoded, 'base64').toString('utf8');
      setDecoded(decodedText);
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Invalid Base64 string.' });
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">
      <div className="space-y-2">
        <Label htmlFor="decoded-input">Decoded (UTF-8)</Label>
        <Textarea
          id="decoded-input"
          value={decoded}
          onChange={(e) => setDecoded(e.target.value)}
          placeholder="Type or paste your text here"
          className="h-48"
        />
        <Button onClick={handleEncode} className="w-full">Encode to Base64 &darr;</Button>
      </div>
      <div className="space-y-2">
        <Label htmlFor="encoded-input">Encoded (Base64)</Label>
        <Textarea
          id="encoded-input"
          value={encoded}
          onChange={(e) => setEncoded(e.target.value)}
          placeholder="SGVsbG8gV29ybGQ="
          className="h-48 font-mono"
        />
        <Button onClick={handleDecode} className="w-full">Decode from Base64 &uarr;</Button>
      </div>
    </div>
  );
}
