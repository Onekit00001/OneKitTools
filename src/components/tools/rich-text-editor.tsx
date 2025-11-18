"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Underline, List, ListOrdered, Code, Pilcrow } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function RichTextEditor() {
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();
  
  useState(() => {
    setIsClient(true);
    if(typeof window !== 'undefined') {
        document.execCommand('styleWithCSS', false);
    }
  });

  const handleCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };
  
  const copyHtml = () => {
      const editor = document.getElementById('editor');
      if(editor) {
          navigator.clipboard.writeText(editor.innerHTML);
          toast({ title: "HTML copied to clipboard!" });
      }
  }

  if (!isClient) return <p>Loading editor...</p>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1 p-2 border rounded-md">
        <EditorButton onClick={() => handleCommand('bold')}><Bold /></EditorButton>
        <EditorButton onClick={() => handleCommand('italic')}><Italic /></EditorButton>
        <EditorButton onClick={() => handleCommand('underline')}><Underline /></EditorButton>
        <EditorButton onClick={() => handleCommand('insertUnorderedList')}><List /></EditorButton>
        <EditorButton onClick={() => handleCommand('insertOrderedList')}><ListOrdered /></EditorButton>
        <EditorButton onClick={() => handleCommand('formatBlock', '<p>')}><Pilcrow /></EditorButton>
        <EditorButton onClick={() => handleCommand('formatBlock', '<blockquote>')}><Code /></EditorButton>
      </div>
      <div
        id="editor"
        contentEditable
        suppressContentEditableWarning
        className="h-96 p-4 border rounded-md overflow-y-auto focus:outline-none focus:ring-2 focus:ring-ring"
        dangerouslySetInnerHTML={{ __html: "<p>Start writing here...</p>" }}
      />
      <Button onClick={copyHtml}>Copy HTML</Button>
    </div>
  );
}

function EditorButton({ children, ...props }: React.ComponentProps<typeof Button>) {
    return <Button variant="outline" size="icon" onMouseDown={e => e.preventDefault()} {...props}>{children}</Button>
}
