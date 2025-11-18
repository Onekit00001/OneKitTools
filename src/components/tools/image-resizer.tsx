"use client";

import { useState, useRef, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, Crop, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

export default function ImageResizer() {
  const [image, setImage] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<{ w: number; h: number } | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [keepAspectRatio, setKeepAspectRatio] = useState(true);
  const [fileName, setFileName] = useState('resized-image.png');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = document.createElement('img');
        img.onload = () => {
          setImage(img.src);
          setOriginalDimensions({ w: img.width, h: img.height });
          setWidth(Math.floor(img.width / 2));
          setHeight(Math.floor(img.height / 2));
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value) || 0;
    setWidth(newWidth);
    if (keepAspectRatio && originalDimensions) {
      const ratio = originalDimensions.h / originalDimensions.w;
      setHeight(Math.round(newWidth * ratio));
    }
  }
  
  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(e.target.value) || 0;
    setHeight(newHeight);
    if (keepAspectRatio && originalDimensions) {
      const ratio = originalDimensions.w / originalDimensions.h;
      setWidth(Math.round(newHeight * ratio));
    }
  }

  const handleDownload = () => {
    if (!image) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please upload an image first.' });
      return;
    }
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const img = document.createElement('img');
    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      const link = document.createElement('a');
      link.download = fileName;
      link.href = canvas.toDataURL();
      link.click();
      toast({ title: 'Image resized and download started!' });
    };
    img.src = image;
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
        
        {image && originalDimensions && (
          <>
            <div className="space-y-2">
              <Label>2. Set Dimensions</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input type="number" placeholder="Width" value={width} onChange={handleWidthChange} />
                <Input type="number" placeholder="Height" value={height} onChange={handleHeightChange} />
              </div>
               <div className="flex items-center space-x-2 mt-2">
                <Checkbox id="aspect-ratio" checked={keepAspectRatio} onCheckedChange={(checked) => setKeepAspectRatio(!!checked)} />
                <Label htmlFor="aspect-ratio" className="flex items-center gap-2 font-normal">
                    <Crop className="h-4 w-4" /> Keep aspect ratio
                </Label>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>3. Download</Label>
              <Button onClick={handleDownload} className="w-full">
                <Download className="mr-2 h-4 w-4" /> Resize & Download
              </Button>
            </div>
          </>
        )}
      </div>

      <div className="bg-secondary rounded-lg p-4 flex items-center justify-center min-h-[300px]">
        {image ? (
          <div className='text-center'>
            <Image src={image} alt="Preview" width={300} height={300} className="max-w-full h-auto object-contain rounded-md" />
            <p className='text-sm text-muted-foreground mt-2'>Original: {originalDimensions?.w} x {originalDimensions?.h}</p>
          </div>
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
