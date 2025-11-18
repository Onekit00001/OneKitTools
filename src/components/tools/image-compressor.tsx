"use client";

import { useState, useRef, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, ImageIcon } from 'lucide-react';
import Image from 'next/image';

export default function ImageCompressor() {
  const [image, setImage] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setCompressedSize(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (!image) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = document.createElement('img');
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          setCompressedSize(blob.size);
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `compressed-${originalFile?.name}`;
          link.click();
          toast({ title: 'Image compressed and downloaded!' });
        }
      }, 'image/jpeg', quality);
    };
    img.src = image;
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>1. Upload Image</Label>
          <Input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            <Upload className="mr-2 h-4 w-4" /> Choose File
          </Button>
          {originalFile && <p className="text-sm text-muted-foreground">Original size: {formatBytes(originalFile.size)}</p>}
        </div>

        {image && (
          <>
            <div className="space-y-2">
              <Label>2. Set Quality ({Math.round(quality * 100)}%)</Label>
              <Slider
                min={0.1}
                max={1}
                step={0.1}
                value={[quality]}
                onValueChange={(v) => setQuality(v[0])}
              />
            </div>

            <div className="space-y-2">
              <Label>3. Download</Label>
              <Button onClick={handleDownload} className="w-full">
                <Download className="mr-2 h-4 w-4" /> Compress & Download
              </Button>
              {compressedSize && <p className="text-sm text-green-600">Compressed size: {formatBytes(compressedSize)}</p>}
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
