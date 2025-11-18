"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Sparkles, History } from 'lucide-react';

export default function RandomNumberGenerator() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [result, setResult] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);

  const generate = () => {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    setResult(num);
    setHistory([num, ...history.slice(0, 9)]);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="min">Min</Label>
          <Input id="min" type="number" value={min} onChange={(e) => setMin(parseInt(e.target.value))} />
        </div>
        <div>
          <Label htmlFor="max">Max</Label>
          <Input id="max" type="number" value={max} onChange={(e) => setMax(parseInt(e.target.value))} />
        </div>
      </div>
      <Button onClick={generate} className="w-full">
        <Sparkles className="mr-2" /> Generate
      </Button>
      
      {result !== null && (
        <div className="text-center p-8 bg-secondary rounded-lg">
          <p className="text-6xl font-bold">{result}</p>
        </div>
      )}

      {history.length > 0 && (
        <div className="space-y-2">
          <h3 className="flex items-center gap-2 text-lg font-semibold"><History /> History</h3>
          <div className="flex flex-wrap gap-2">
            {history.map((num, i) => (
              <span key={i} className="bg-muted px-3 py-1 rounded-full text-sm">{num}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
