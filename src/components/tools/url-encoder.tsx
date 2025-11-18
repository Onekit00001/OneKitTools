"use client";

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowRightLeft } from 'lucide-react';

export default function UrlEncoder() {
  const [decoded, setDecoded] = useState('https://example.com/?q=hello world&price=€25');
  const [encoded, setEncoded] = useState('https%3A%2F%2Fexample.com%2F%3Fq%3Dhello%20world%26price%3D%E2%82%AC25');
  const { toast } = useToast();

  const handleDecodedChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDecoded = e.target.value;
    setDecoded(newDecoded);
    try {
      setEncoded(encodeURIComponent(newDecoded));
    } catch (e) {
      // Ignore errors while typing
    }
  };

  const handleEncodedChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newEncoded = e.target.value;
    setEncoded(newEncoded);
    try {
      setDecoded(decodeURIComponent(newEncoded));
    } catch (e) {
      // Ignore malformed URI errors while typing
    }
  };
  
  const swap = () => {
    setDecoded(encoded);
    setEncoded(decoded);
  }

  return (
    <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
      <div className="space-y-2">
        <Label htmlFor="decoded-url">Decoded URL</Label>
        <Textarea
          id="decoded-url"
          value={decoded}
          onChange={handleDecodedChange}
          placeholder="https://example.com/?q=hello world"
          className="h-48"
        />
      </div>

       <div className="flex justify-center">
        <Button variant="ghost" size="icon" onClick={swap}>
          <ArrowRightLeft />
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="encoded-url">Encoded URL</Label>
        <Textarea
          id="encoded-url"
          value={encoded}
          onChange={handleEncodedChange}
          placeholder="https%3A%2F%2Fexample.com%2F%3Fq%3Dhello%20world"
          className="h-48 font-mono"
        />
      </div>
    </div>
  );
}
