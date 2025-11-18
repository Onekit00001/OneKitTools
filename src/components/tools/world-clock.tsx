"use client";

import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const allTimezones = Intl.supportedValuesOf('timeZone');

const defaultCities = [
  'America/New_York',
  'Europe/London',
  'Asia/Tokyo',
  'Australia/Sydney',
  'Asia/Kolkata'
];

function Clock({ timezone, onRemove }: { timezone: string, onRemove?: (tz: string) => void }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = new Intl.DateTimeFormat('en-US', { timeZone: timezone, hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }).format(time);
  const formattedDate = new Intl.DateTimeFormat('en-US', { timeZone: timezone, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(time);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium truncate">{timezone.replace(/_/g, ' ').split('/').pop()}</CardTitle>
        {onRemove && <Button variant="ghost" size="icon" onClick={() => onRemove(timezone)}><X className="h-4 w-4" /></Button>}
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{formattedTime}</p>
        <p className="text-sm text-muted-foreground">{formattedDate}</p>
      </CardContent>
    </Card>
  );
}

export default function WorldClock() {
  const [selectedTimezones, setSelectedTimezones] = useState<string[]>(defaultCities);

  const addTimezone = (tz: string) => {
    if (tz && !selectedTimezones.includes(tz)) {
      setSelectedTimezones([...selectedTimezones, tz]);
    }
  };

  const removeTimezone = (tz: string) => {
    setSelectedTimezones(selectedTimezones.filter(t => t !== tz));
  };

  return (
    <div className="space-y-6">
      <div>
        <Select onValueChange={addTimezone}>
          <SelectTrigger><SelectValue placeholder="Add a city..." /></SelectTrigger>
          <SelectContent className="max-h-60">
            {allTimezones.map(tz => (
              <SelectItem key={tz} value={tz} disabled={selectedTimezones.includes(tz)}>
                {tz.replace(/_/g, ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedTimezones.map(tz => (
          <Clock key={tz} timezone={tz} onRemove={removeTimezone} />
        ))}
      </div>
    </div>
  );
}
