"use client";

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowRightLeft } from 'lucide-react';

export default function Base64Converter() {
  const [decoded, setDecoded] = useState('Hello World!');
  const [encoded, setEncoded] = useState('SGVsbG8gV29ybGQh');
  const [lastEdited, setLastEdited] = useState<'decoded' | 'encoded'>('decoded');
  const { toast } = useToast();

  const handleDecodedChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDecoded = e.target.value;
    setDecoded(newDecoded);
    setLastEdited('decoded');
    try {
      const encodedText = Buffer.from(newDecoded, 'utf8').toString('base64');
      setEncoded(encodedText);
    } catch (e) {
      // Ignore encoding errors while typing
    }
  };

  const handleEncodedChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newEncoded = e.target.value;
    setEncoded(newEncoded);
    setLastEdited('encoded');
    try {
      const decodedText = Buffer.from(newEncoded, 'base64').toString('utf8');
      setDecoded(decodedText);
    } catch (e) {
      // Ignore decoding errors for invalid base64 while typing
    }
  };

  const swap = () => {
    setDecoded(encoded);
    setEncoded(decoded);
  }

  return (
    <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
      <div className="space-y-2">
        <Label htmlFor="decoded-input">Decoded (UTF-8)</Label>
        <Textarea
          id="decoded-input"
          value={decoded}
          onChange={handleDecodedChange}
          placeholder="Type or paste your text here"
          className="h-48"
        />
      </div>

       <div className="flex justify-center">
        <Button variant="ghost" size="icon" onClick={swap}>
          <ArrowRightLeft />
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="encoded-input">Encoded (Base64)</Label>
        <Textarea
          id="encoded-input"
          value={encoded}
          onChange={handleEncodedChange}
          placeholder="SGVsbG8gV29ybGQ="
          className="h-48 font-mono"
        />
      </div>
    </div>
  );
}
