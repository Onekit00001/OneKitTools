"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Clipboard, Sparkles, CheckCircle, XCircle, Eraser } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();

  const formatJson = () => {
    try {
      if (!input.trim()) {
        setError("");
        setInput("");
        return;
      }
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setInput(formatted);
      setError("");
      toast({
        title: "JSON Formatted Successfully!",
        description: "Your JSON is valid and has been beautified.",
      });
    } catch (e: any) {
      setError(e.message);
      toast({
        variant: "destructive",
        title: "Invalid JSON",
        description: "Please check your JSON syntax.",
      });
    }
  };

  const copyToClipboard = () => {
    if (input && !error) {
      navigator.clipboard.writeText(input);
      toast({ title: "Formatted JSON copied!" });
    }
  };

  const clearInput = () => {
    setInput("");
    setError("");
  }

  return (
    <div className="space-y-4">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Paste your JSON here, e.g., {"key": "value"}'
        className="h-80 font-code text-sm"
        aria-label="JSON Input"
      />
      {error && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Validation Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {!error && input.trim() && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>JSON appears to be valid</AlertTitle>
          <AlertDescription>You can format it or copy it.</AlertDescription>
        </Alert>
      )}
      <div className="flex gap-2">
        <Button onClick={formatJson}>
          <Sparkles className="mr-2 h-4 w-4" /> Format / Validate
        </Button>
        <Button variant="outline" onClick={copyToClipboard} disabled={!input || !!error}>
          <Clipboard className="mr-2 h-4 w-4" /> Copy
        </Button>
        <Button variant="destructive" onClick={clearInput} disabled={!input}>
          <Eraser className="mr-2 h-4 w-4" /> Clear
        </Button>
      </div>
    </div>
  );
}
