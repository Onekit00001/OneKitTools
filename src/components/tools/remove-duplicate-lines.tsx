"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Clipboard, Sparkles, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function RemoveDuplicateLines() {
  const [text, setText] = useState("");
  const { toast } = useToast();

  const handleRemoveDuplicates = () => {
    const lines = text.split('\n');
    const seen = new Set();
    const uniqueLines = lines.filter(line => {
      // For case-sensitive comparison, just use 'line'
      // For case-insensitive, use line.toLowerCase()
      const lineToCompare = line; 
      if (seen.has(lineToCompare)) {
        return false;
      } else {
        seen.add(lineToCompare);
        return true;
      }
    });
    
    setText(uniqueLines.join('\n'));
    toast({ title: "Duplicate lines removed!" });
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard!" });
  };

  const clearText = () => setText("");

  return (
    <div className="space-y-4">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your list here, with each item on a new line..."
        className="h-60 text-base"
      />
      <div className="flex flex-wrap gap-2">
        <Button onClick={handleRemoveDuplicates}>
          <Sparkles className="mr-2 h-4 w-4" /> Remove Duplicates
        </Button>
        <Button variant="outline" onClick={copyToClipboard} disabled={!text}>
          <Clipboard className="mr-2 h-4 w-4" /> Copy
        </Button>
        <Button variant="destructive" onClick={clearText} disabled={!text}>
          <Trash className="mr-2 h-4 w-4" /> Clear
        </Button>
      </div>
    </div>
  );
}
