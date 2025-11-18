"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Clipboard, Sparkles, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SpaceRemover() {
  const [text, setText] = useState("");
  const { toast } = useToast();

  const removeExtraSpaces = () => {
    // 1. Trim leading/trailing spaces
    // 2. Replace multiple spaces with a single space
    // 3. Remove empty lines
    const cleanedText = text
      .trim()
      .replace(/\s+/g, ' ')
    setText(cleanedText);
    toast({ title: "Extra spaces removed!" });
  };
  
  const removeAllSpaces = () => {
    const cleanedText = text.replace(/\s+/g, '');
    setText(cleanedText);
    toast({ title: "All spaces removed!" });
  };
  
  const removeExtraLines = () => {
    const cleanedText = text.replace(/\n\s*\n/g, '\n');
    setText(cleanedText);
    toast({ title: "Extra lines removed!" });
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
        placeholder="Paste text with messy spacing here..."
        className="h-60 text-base"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <Button onClick={removeExtraSpaces}>
          <Sparkles className="mr-2 h-4 w-4" />
          Remove Extra Spaces
        </Button>
        <Button onClick={removeAllSpaces}>
          <Sparkles className="mr-2 h-4 w-4" />
          Remove All Spaces
        </Button>
        <Button onClick={removeExtraLines}>
          <Sparkles className="mr-2 h-4 w-4" />
          Remove Extra Lines
        </Button>
      </div>
      <div className="flex gap-2">
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
