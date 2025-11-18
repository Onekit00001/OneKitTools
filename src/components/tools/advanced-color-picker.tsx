"use client";

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Clipboard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
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

export default function AdvancedColorPicker() {
  const [color, setColor] = useState('#1e90ff');
  const [history, setHistory] = useState<string[]>([]);
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

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };
  
  const handleAddToHistory = () => {
    if (!history.includes(color)) {
      setHistory([color, ...history.slice(0, 9)]);
    }
  }

  const copy = (value: string) => {
    navigator.clipboard.writeText(value);
    toast({ title: `Copied ${value}!` });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <input type="color" value={color} onChange={handleColorChange} onBlur={handleAddToHistory} className="w-full h-32 cursor-pointer" />
        <div className="space-y-2">
            <ColorDisplay label="HEX" value={colorValues.hex} onCopy={copy} />
            <ColorDisplay label="RGB" value={colorValues.rgb} onCopy={copy} />
            <ColorDisplay label="HSL" value={colorValues.hsl} onCopy={copy} />
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

function ColorDisplay({ label, value, onCopy }: { label: string, value: string, onCopy: (v: string) => void }) {
    return (
        <div className="flex items-center gap-2">
            <Label className="w-12">{label}</Label>
            <Input value={value} readOnly className="font-mono"/>
            <Button variant="ghost" size="icon" onClick={() => onCopy(value)}><Clipboard /></Button>
        </div>
    )
}
