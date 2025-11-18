"use client";

import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, Type, ImageIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function AddTextWatermark() {
  const [image, setImage] = useState<string | null>(null);
  const [watermarkText, setWatermarkText] = useState('OneKit');
  const [fontSize, setFontSize] = useState(48);
  const [opacity, setOpacity] = useState(0.5);
  const [color, setColor] = useState('#ffffff');
  const [fileName, setFileName] = useState('watermarked-image.png');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => setImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = new window.Image();
    img.src = image;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      const textWidth = ctx.measureText(watermarkText).width;
      ctx.fillText(watermarkText, (canvas.width - textWidth) / 2, canvas.height / 2);
      ctx.globalAlpha = 1.0;
    };
  }, [image, watermarkText, fontSize, opacity, color]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = fileName;
    link.href = canvasRef.current.toDataURL();
    link.click();
    toast({ title: 'Watermarked image downloaded!' });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>1. Upload Image</Label>
          <Input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            <Upload className="mr-2 h-4 w-4" /> Choose File
          </Button>
        </div>

        {image && (
          <>
            <div className="space-y-2">
              <Label htmlFor="watermark-text">2. Watermark Text</Label>
              <div className="flex gap-2">
                <Input
                  id="watermark-text"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  placeholder="Enter your watermark text"
                />
                 <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" style={{backgroundColor: color}} className="w-12 border-2" aria-label="Pick color" />
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                       <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-10 cursor-pointer" />
                    </PopoverContent>
                  </Popover>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Font Size: {fontSize}px</Label>
                <Slider min={10} max={200} value={[fontSize]} onValueChange={(v) => setFontSize(v[0])} />
              </div>
              <div>
                <Label>Opacity: {Math.round(opacity * 100)}%</Label>
                <Slider min={0.1} max={1} step={0.1} value={[opacity]} onValueChange={(v) => setOpacity(v[0])} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>3. Download</Label>
              <Button onClick={handleDownload} className="w-full">
                <Download className="mr-2 h-4 w-4" /> Download Watermarked Image
              </Button>
            </div>
          </>
        )}
      </div>

      <div className="bg-secondary rounded-lg p-4 flex items-center justify-center min-h-[300px]">
        {image ? (
          <canvas ref={canvasRef} className="max-w-full h-auto object-contain rounded-md" />
        ) : (
          <div className="text-center text-muted-foreground">
            <ImageIcon className="mx-auto h-12 w-12" />
            <p className="mt-2">Image preview will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
