"use client";

import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const timezones = Intl.supportedValuesOf('timeZone');

export default function TimeZoneConverter() {
  const [time, setTime] = useState(new Date());
  const [fromTz, setFromTz] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [toTz, setToTz] = useState('UTC');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (date: Date, timeZone: string) => {
    try {
        return new Intl.DateTimeFormat('en-US', {
            timeZone,
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: true,
        }).format(date);
    } catch (e) {
        return "Invalid Timezone";
    }
  };

  const formatDate = (date: Date, timeZone: string) => {
    try {
        return new Intl.DateTimeFormat('en-US', {
            timeZone,
            year: 'numeric', month: 'short', day: 'numeric',
            weekday: 'short',
        }).format(date);
    } catch (e) {
        return "";
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>From</Label>
          <Select value={fromTz} onValueChange={setFromTz}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent className="max-h-60">{timezones.map(tz => <SelectItem key={tz} value={tz}>{tz.replace(/_/g, ' ')}</SelectItem>)}</SelectContent>
          </Select>
           <div className="p-4 bg-secondary rounded-md text-center">
             <p className="text-3xl font-bold">{formatTime(time, fromTz)}</p>
             <p className="text-sm text-muted-foreground">{formatDate(time, fromTz)}</p>
           </div>
        </div>
        <div className="space-y-2">
          <Label>To</Label>
          <Select value={toTz} onValueChange={setToTz}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent className="max-h-60">{timezones.map(tz => <SelectItem key={tz} value={tz}>{tz.replace(/_/g, ' ')}</SelectItem>)}</SelectContent>
          </Select>
          <div className="p-4 bg-secondary rounded-md text-center">
             <p className="text-3xl font-bold">{formatTime(time, toTz)}</p>
             <p className="text-sm text-muted-foreground">{formatDate(time, toTz)}</p>
           </div>
        </div>
      </div>
    </div>
  );
}
