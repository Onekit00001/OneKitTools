"use client";

import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, RotateCcw, RotateCw, FlipHorizontal, FlipVertical, ImageIcon } from 'lucide-react';

export default function FlipRotateImage() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState('edited-image.png');
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setRotation(0);
        setFlipH(false);
        setFlipV(false);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if(!ctx) return;
    const img = new window.Image();
    img.src = image;
    img.onload = () => {
      const w = img.width;
      const h = img.height;
      const rad = rotation * Math.PI / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      
      canvas.width = Math.abs(w * cos) + Math.abs(h * sin);
      canvas.height = Math.abs(w * sin) + Math.abs(h * cos);
      
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rad);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(img, -w / 2, -h / 2);
      ctx.restore();
    };
  }, [image, rotation, flipH, flipV]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = fileName;
    link.href = canvasRef.current.toDataURL();
    link.click();
    toast({ title: 'Image downloaded!' });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div className="space-y-6">
        <div>
          <Label>1. Upload Image</Label>
          <Input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            <Upload className="mr-2 h-4 w-4" /> Choose File
          </Button>
        </div>

        {image && (
          <>
            <div className="space-y-4">
              <Label>2. Transform</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={() => setRotation(r => (r - 90) % 360)}><RotateCcw /> Rotate Left</Button>
                <Button variant="outline" onClick={() => setRotation(r => (r + 90) % 360)}><RotateCw /> Rotate Right</Button>
                <Button variant="outline" onClick={() => setFlipH(f => !f)}><FlipHorizontal/> Flip Horizontal</Button>
                <Button variant="outline" onClick={() => setFlipV(f => !f)}><FlipVertical /> Flip Vertical</Button>
              </div>
            </div>
            <div>
              <Label>3. Download</Label>
              <Button onClick={handleDownload} className="w-full">
                <Download className="mr-2 h-4 w-4" /> Download Image
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
