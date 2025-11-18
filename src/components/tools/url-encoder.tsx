"use client";

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function UrlEncoder() {
  const [decoded, setDecoded] = useState('');
  const [encoded, setEncoded] = useState('');
  const { toast } = useToast();

  const handleEncode = () => {
    try {
      setEncoded(encodeURIComponent(decoded));
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not encode URL.' });
    }
  };

  const handleDecode = () => {
    try {
      setDecoded(decodeURIComponent(encoded));
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not decode URL. Check for malformed URI sequences like invalid % encodings.' });
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">
      <div className="space-y-2">
        <Label htmlFor="decoded-url">Decoded URL</Label>
        <Textarea
          id="decoded-url"
          value={decoded}
          onChange={(e) => setDecoded(e.target.value)}
          placeholder="https://example.com/?q=hello world"
          className="h-48"
        />
        <Button onClick={handleEncode} className="w-full">Encode &darr;</Button>
      </div>
      <div className="space-y-2">
        <Label htmlFor="encoded-url">Encoded URL</Label>
        <Textarea
          id="encoded-url"
          value={encoded}
          onChange={(e) => setEncoded(e.target.value)}
          placeholder="https://example.com/%3Fq%3Dhello%20world"
          className="h-48 font-mono"
        />
        <Button onClick={handleDecode} className="w-full">Decode &uarr;</Button>
      </div>
    </div>
  );
}
