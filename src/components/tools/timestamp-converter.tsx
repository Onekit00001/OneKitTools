"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000).toString());
  const [date, setDate] = useState(new Date().toLocaleString());
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleTimestampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ts = e.target.value;
    setTimestamp(ts);
    const numTs = parseInt(ts, 10);
    if (!isNaN(numTs)) {
      setDate(new Date(numTs * 1000).toLocaleString());
    }
  };
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const d = e.target.value;
      setDate(d);
      const parsedDate = Date.parse(d);
      if(!isNaN(parsedDate)) {
          setTimestamp(Math.floor(parsedDate/1000).toString());
      }
  }

  const useCurrentTimestamp = () => {
    const ts = Math.floor(Date.now() / 1000);
    setTimestamp(ts.toString());
    setDate(new Date(ts * 1000).toLocaleString());
  };

  return (
    <div className="space-y-6">
        <Card className="text-center p-4 bg-secondary">
            <CardContent className="p-0">
                <p className="text-muted-foreground">Current Unix Timestamp</p>
                <p className="text-3xl font-mono font-bold">{Math.floor(now.getTime() / 1000)}</p>
                <p className="text-sm text-muted-foreground">{now.toUTCString()}</p>
            </CardContent>
        </Card>
      <div className="grid md:grid-cols-[2fr_auto_2fr] gap-4 items-center">
        <div className="space-y-2">
          <Label htmlFor="timestamp">Unix Timestamp</Label>
          <Input id="timestamp" value={timestamp} onChange={handleTimestampChange} />
        </div>
        <ArrowRightLeft className="h-6 w-6 text-muted-foreground hidden md:block" />
        <div className="space-y-2">
          <Label htmlFor="date">Human Readable Date</Label>
          <Input id="date" value={date} onChange={handleDateChange} />
        </div>
      </div>
      <Button onClick={useCurrentTimestamp} variant="outline">
        <Clock className="mr-2 h-4 w-4" /> Use Current Time
      </Button>
    </div>
  );
}
