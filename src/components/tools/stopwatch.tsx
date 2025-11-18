"use client";

import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RefreshCw, Flag } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (isActive) return;
    setIsActive(true);
    const startTime = Date.now() - time;
    timerRef.current = setInterval(() => {
      setTime(Date.now() - startTime);
    }, 10);
  };

  const stopTimer = () => {
    setIsActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTime(0);
    setLaps([]);
  };

  const addLap = () => {
    if (isActive) {
      setLaps(prevLaps => [time, ...prevLaps]);
    }
  };

  const formatTime = (ms: number) => {
    const minutes = String(Math.floor(ms / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <p className="text-7xl font-bold font-mono tracking-tighter">
        {formatTime(time)}
      </p>
      <div className="flex space-x-4">
        {!isActive ? (
          <Button onClick={startTimer} size="lg" className="w-28">
            <Play className="mr-2 h-5 w-5" /> Start
          </Button>
        ) : (
          <Button onClick={stopTimer} size="lg" className="w-28 bg-red-600 hover:bg-red-700">
            <Pause className="mr-2 h-5 w-5" /> Stop
          </Button>
        )}
        <Button onClick={addLap} variant="secondary" size="lg" disabled={!isActive} className="w-28">
          <Flag className="mr-2 h-5 w-5" /> Lap
        </Button>
        <Button onClick={resetTimer} variant="secondary" size="lg" className="w-28">
          <RefreshCw className="mr-2 h-5 w-5" /> Reset
        </Button>
      </div>

      {laps.length > 0 && (
        <ScrollArea className="h-48 w-full max-w-sm rounded-md border p-4">
          <ul className="space-y-2">
            {laps.map((lap, index) => (
              <li key={index} className="flex justify-between items-center text-sm font-mono">
                <span>Lap {laps.length - index}</span>
                <span>{formatTime(lap)}</span>
              </li>
            ))}
          </ul>
        </ScrollArea>
      )}
    </div>
  );
}
