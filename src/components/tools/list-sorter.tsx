"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { SortAsc, SortDesc, Shuffle } from "lucide-react";

export default function ListSorter() {
  const [text, setText] = useState("");
  const { toast } = useToast();

  const sort = (direction: 'asc' | 'desc' | 'shuffle') => {
    let lines = text.split('\n').filter(line => line.trim() !== '');
    if (direction === 'shuffle') {
      lines.sort(() => Math.random() - 0.5);
    } else {
      lines.sort((a, b) => {
        const compare = a.localeCompare(b, undefined, { numeric: true });
        return direction === 'asc' ? compare : -compare;
      });
    }
    setText(lines.join('\n'));
    toast({ title: `List sorted ${direction}ending!` });
  };

  return (
    <div className="space-y-4">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter list items, one per line..."
        className="h-60 text-base"
      />
      <div className="flex gap-2">
        <Button onClick={() => sort('asc')}><SortAsc className="mr-2" /> Sort A-Z</Button>
        <Button onClick={() => sort('desc')}><SortDesc className="mr-2" /> Sort Z-A</Button>
        <Button onClick={() => sort('shuffle')}><Shuffle className="mr-2" /> Shuffle</Button>
      </div>
    </div>
  );
}
