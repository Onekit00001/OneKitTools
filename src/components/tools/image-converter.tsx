"use client";

import { useState, useRef, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, ImageIcon } from 'lucide-react';
import Image from 'next/image';

type ImageFormat = 'image/png' | 'image/jpeg' | 'image/webp';

export default function ImageConverter() {
  const [image, setImage] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<ImageFormat>('image/png');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (!image || !originalFile) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please upload an image first.' });
      return;
    }
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const img = document.createElement('img');
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const link = document.createElement('a');
      const extension = targetFormat.split('/')[1];
      link.download = `${originalFile.name.split('.')[0]}.${extension}`;
      link.href = canvas.toDataURL(targetFormat, 0.9);
      link.click();
      toast({ title: 'Image converted and download started!' });
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
          {originalFile && <p className="text-sm text-muted-foreground">Selected: {originalFile.name}</p>}
        </div>
        
        {image && (
          <>
            <div className="space-y-2">
              <Label>2. Select Format</Label>
              <Select value={targetFormat} onValueChange={(value) => setTargetFormat(value as ImageFormat)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image/png">PNG</SelectItem>
                  <SelectItem value="image/jpeg">JPEG</SelectItem>
                  <SelectItem value="image/webp">WEBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>3. Download</Label>
              <Button onClick={handleDownload} className="w-full">
                <Download className="mr-2 h-4 w-4" /> Convert & Download
              </Button>
            </div>
          </>
        )}
      </div>

      <div className="bg-secondary rounded-lg p-4 flex items-center justify-center min-h-[300px]">
        {image ? (
          <Image src={image} alt="Preview" width={300} height={300} className="max-w-full h-auto object-contain rounded-md" />
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
