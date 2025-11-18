"use client";

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Play, Pause, RefreshCw } from 'lucide-react';

export default function CountdownTimer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  
  const [initialTime, setInitialTime] = useState(300);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Optional: Play a sound
    }
    return () => {
      if(interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const startTimer = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    setInitialTime(totalSeconds);
    setTimeLeft(totalSeconds);
    setIsActive(true);
  };
  
  const toggle = () => setIsActive(!isActive);

  const reset = () => {
    setIsActive(false);
    setTimeLeft(initialTime);
  };
  
  const formatTime = (time: number) => {
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = time % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {!isActive && timeLeft === initialTime ? (
        <div className="flex items-center gap-2">
            <Input type="number" min="0" value={hours} onChange={e => setHours(parseInt(e.target.value) || 0)} className="w-24 text-center text-lg" placeholder="HH"/>
            <span className="text-lg">:</span>
            <Input type="number" min="0" max="59" value={minutes} onChange={e => setMinutes(parseInt(e.target.value) || 0)} className="w-24 text-center text-lg" placeholder="MM"/>
            <span className="text-lg">:</span>
            <Input type="number" min="0" max="59" value={seconds} onChange={e => setSeconds(parseInt(e.target.value) || 0)} className="w-24 text-center text-lg" placeholder="SS"/>
        </div>
      ) : (
        <p className="text-8xl font-bold font-mono tracking-tighter">
          {formatTime(timeLeft)}
        </p>
      )}

      <div className="flex space-x-4">
        {timeLeft === initialTime ? (
            <Button onClick={startTimer} size="lg" className="w-32"><Play className="mr-2" /> Start</Button>
        ) : (
            <Button onClick={toggle} size="lg" className="w-32">
                {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
                {isActive ? 'Pause' : 'Resume'}
            </Button>
        )}
        <Button onClick={reset} variant="secondary" size="lg"><RefreshCw className="mr-2" /> Reset</Button>
      </div>
    </div>
  );
}
