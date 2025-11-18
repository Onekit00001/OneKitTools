"use client";

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { slugify } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Clipboard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function TextToSlug() {
  const [text, setText] = useState('');
  const { toast } = useToast();
  
  const slug = useMemo(() => slugify(text), [text]);

  const copyToClipboard = () => {
    if (slug) {
      navigator.clipboard.writeText(slug);
      toast({ title: "Slug copied to clipboard!" });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="input-text">Your Text</Label>
        <Input
          id="input-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to convert to slug"
        />
      </div>
      <div>
        <Label htmlFor="output-slug">Generated Slug</Label>
        <div className="flex items-center gap-2">
          <Input
            id="output-slug"
            value={slug}
            readOnly
            placeholder="your-generated-slug"
            className="font-mono bg-secondary"
          />
          <Button variant="outline" size="icon" onClick={copyToClipboard} disabled={!slug} aria-label="Copy slug">
            <Clipboard className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
