"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Clipboard, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CaseConverter() {
  const [text, setText] = useState("");
  const { toast } = useToast();

  const toSentenceCase = () => {
    setText(text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()));
  };

  const toLowerCase = () => setText(text.toLowerCase());
  const toUpperCase = () => setText(text.toUpperCase());
  const toTitleCase = () => {
    setText(text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()));
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
        placeholder="Type or paste your text here..."
        className="h-60 text-base"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <Button onClick={toSentenceCase}>Sentence case</Button>
        <Button onClick={toLowerCase}>lower case</Button>
        <Button onClick={toUpperCase}>UPPER CASE</Button>
        <Button onClick={toTitleCase}>Title Case</Button>
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
