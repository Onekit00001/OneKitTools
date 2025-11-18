"use client";

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Clipboard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

// --- Conversion Functions ---

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToHex(r: number, g: number, b: number) {
    const toHex = (c: number) => ("0" + c.toString(16)).slice(-2);
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h: number, s: number, l: number) {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
    return { r: 255 * f(0), g: 255 * f(8), b: 255 * f(4) };
}


// --- Main Component ---

export default function AdvancedColorPicker() {
  const [color, setColor] = useState('#1e90ff');
  const [history, setHistory] = useState<string[]>(['#1e90ff']);
  const { toast } = useToast();

  const colorValues = useMemo(() => {
    const rgb = hexToRgb(color);
    if (!rgb) return { hex: color, rgb: '', hsl: '' };
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return {
      hex: color,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
    };
  }, [color]);
  
  const handleAddToHistory = (newColor: string) => {
    if (!history.includes(newColor)) {
      setHistory(prev => [newColor, ...prev.slice(0, 9)]);
    }
  }

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHex = e.target.value;
    setColor(newHex);
    if (/^#[0-9a-f]{6}$/i.test(newHex)) {
        handleAddToHistory(newHex);
    }
  };

  const handleRgbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRgb = e.target.value;
    const matches = newRgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if(matches) {
        const [, r, g, b] = matches.map(Number);
        if (r <= 255 && g <= 255 && b <= 255) {
            const newHex = rgbToHex(r,g,b);
            setColor(newHex);
            handleAddToHistory(newHex);
        }
    }
  };
  
  const handleHslChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHsl = e.target.value;
    const matches = newHsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
     if(matches) {
        const [, h, s, l] = matches.map(Number);
        if (h <= 360 && s <= 100 && l <= 100) {
            const { r, g, b } = hslToRgb(h,s,l);
            const newHex = rgbToHex(Math.round(r), Math.round(g), Math.round(b));
            setColor(newHex);
            handleAddToHistory(newHex);
        }
    }
  };

  const copy = (value: string) => {
    navigator.clipboard.writeText(value);
    toast({ title: `Copied ${value}!` });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <input type="color" value={color} onChange={handleHexChange} className="w-full h-32 cursor-pointer" />
        <div className="space-y-2">
            <ColorInput label="HEX" value={colorValues.hex} onChange={handleHexChange} onCopy={copy} />
            <ColorInput label="RGB" value={colorValues.rgb} onChange={handleRgbChange} onCopy={copy} />
            <ColorInput label="HSL" value={colorValues.hsl} onChange={handleHslChange} onCopy={copy} />
        </div>
      </div>
      <div>
        <Label>History</Label>
        <Card>
            <CardContent className="p-2">
                <div className="grid grid-cols-5 gap-2">
                    {history.map((c, i) => (
                        <div key={i} style={{ backgroundColor: c }} onClick={() => setColor(c)} className="h-12 w-full rounded-md cursor-pointer border"/>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ColorInput({ label, value, onChange, onCopy }: { label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, onCopy: (v: string) => void }) {
    return (
        <div className="flex items-center gap-2">
            <Label className="w-12">{label}</Label>
            <Input value={value} onChange={onChange} className="font-mono"/>
            <Button variant="ghost" size="icon" onClick={() => onCopy(value)}><Clipboard /></Button>
        </div>
    )
}
