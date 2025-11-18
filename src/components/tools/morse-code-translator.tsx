"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRightLeft } from "lucide-react";

const morseCodeMap: { [key: string]: string } = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
  'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
  'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..',
  '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', '0': '-----',
  ' ': '/',
};

const textMap: { [key: string]: string } = Object.fromEntries(
  Object.entries(morseCodeMap).map(([k, v]) => [v, k])
);

export default function MorseCodeTranslator() {
  const [text, setText] = useState('Hello World');
  const [morse, setMorse] = useState('.... . .-.. .-.. --- / .-- --- .-. .-.. -..');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value.toUpperCase();
    setText(newText);
    const newMorse = newText.split('').map(char => morseCodeMap[char] || '').join(' ');
    setMorse(newMorse);
  };

  const handleMorseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMorse = e.target.value;
    setMorse(newMorse);
    const newText = newMorse.split(' ').map(code => textMap[code] || '').join('');
    setText(newText);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">
      <div className="space-y-2">
        <Label htmlFor="text-input">Text</Label>
        <Textarea
          id="text-input"
          value={text}
          onChange={handleTextChange}
          placeholder="Type text here"
          className="h-40"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="morse-input">Morse Code</Label>
        <Textarea
          id="morse-input"
          value={morse}
          onChange={handleMorseChange}
          placeholder=".-.. --- .-. . --"
          className="h-40 font-mono"
        />
      </div>
    </div>
  );
}
