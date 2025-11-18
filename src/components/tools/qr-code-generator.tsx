"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function QrCodeGenerator() {
  const [value, setValue] = useState("https://onekit.dev");
  const { toast } = useToast();

  const qrCodeUrl = useMemo(() => {
    if (!value) return null;
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(value)}&qzone=1`;
  }, [value]);

  const downloadQrCode = () => {
    if (!qrCodeUrl) return;
    // We can't directly download from a cross-origin URL.
    // We fetch it, create a blob, and then create a downloadable link.
    fetch(qrCodeUrl)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast({ title: "QR Code downloaded!" });
      })
      .catch(() => toast({ variant: "destructive", title: "Download failed", description: "Could not download the QR code." }));
  };
  
  const shareQrCode = async () => {
    if(navigator.share && qrCodeUrl) {
      try {
        await navigator.share({
          title: 'QR Code',
          text: `QR Code for: ${value}`,
          url: qrCodeUrl,
        });
        toast({ title: "Shared successfully!" });
      } catch (error) {
        toast({ variant: 'destructive', title: "Sharing failed", description: "Could not share the QR code." });
      }
    } else {
      toast({ variant: 'destructive', title: 'Not supported', description: 'Web Share API is not supported in your browser.' });
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div className="space-y-4">
        <div>
          <Label htmlFor="qr-value">Text or URL</Label>
          <Input
            id="qr-value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter text or URL to encode"
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={downloadQrCode} disabled={!qrCodeUrl}>
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
          {navigator.share && 
            <Button variant="outline" onClick={shareQrCode} disabled={!qrCodeUrl}>
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
          }
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Card className="p-4 inline-block bg-white">
          {qrCodeUrl ? (
            <Image
              src={qrCodeUrl}
              alt="Generated QR Code"
              width={256}
              height={256}
              className="rounded-md"
              priority
            />
          ) : (
            <div className="h-[256px] w-[256px] bg-secondary rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Enter text to generate QR code</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
