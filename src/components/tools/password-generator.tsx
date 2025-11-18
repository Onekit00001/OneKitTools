"use client";

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Clipboard, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const { toast } = useToast();

  const generatePassword = () => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let charset = '';
    if (includeUppercase) charset += upper;
    if (includeLowercase) charset += lower;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    if (charset === '') {
      toast({ variant: 'destructive', title: 'Error', description: 'Please select at least one character type.' });
      setPassword('');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast({ title: 'Password copied to clipboard!' });
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Input
          type="text"
          value={password}
          readOnly
          placeholder="Your generated password"
          className="pr-20 text-lg font-mono"
        />
        <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-2">
            <Button variant="ghost" size="icon" onClick={generatePassword} aria-label="Generate new password">
              <RefreshCw className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={copyToClipboard} aria-label="Copy password">
              <Clipboard className="h-5 w-5" />
            </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Length: {length}</Label>
          <Slider min={8} max={64} value={[length]} onValueChange={(val) => setLength(val[0])} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <OptionCheckbox id="uppercase" checked={includeUppercase} onCheckedChange={setIncludeUppercase} label="Uppercase (A-Z)" />
          <OptionCheckbox id="lowercase" checked={includeLowercase} onCheckedChange={setIncludeLowercase} label="Lowercase (a-z)" />
          <OptionCheckbox id="numbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} label="Numbers (0-9)" />
          <OptionCheckbox id="symbols" checked={includeSymbols} onCheckedChange={setIncludeSymbols} label="Symbols (!@#$)" />
        </div>
      </div>
    </div>
  );
}

function OptionCheckbox({ id, checked, onCheckedChange, label }: { id: string, checked: boolean, onCheckedChange: (checked: boolean) => void, label: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <Label htmlFor={id} className="text-sm font-normal cursor-pointer">{label}</Label>
    </div>
  );
}
