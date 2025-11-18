"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RefreshCw, Coffee, BrainCircuit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const modes = {
  pomodoro: { time: 25 * 60, name: 'Pomodoro', icon: BrainCircuit },
  shortBreak: { time: 5 * 60, name: 'Short Break', icon: Coffee },
  longBreak: { time: 15 * 60, name: 'Long Break', icon: Coffee },
};

type Mode = keyof typeof modes;

export default function PomodoroTimer() {
  const [mode, setMode] = useState<Mode>('pomodoro');
  const [time, setTime] = useState(modes[mode].time);
  const [isActive, setIsActive] = useState(false);
  const [pomodoros, setPomodoros] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const switchMode = useCallback((newMode: Mode, showToast = true) => {
    setIsActive(false);
    setMode(newMode);
    setTime(modes[newMode].time);
    if (showToast) {
      toast({ title: `Time for a ${modes[newMode].name}!`});
    }
  }, [toast]);

  useEffect(() => {
    if (typeof window !== 'undefined' && !audioRef.current) {
        try {
            audioRef.current = new Audio('/sounds/timer-end.mp3');
        } catch (e) {
            console.error("Failed to create audio element", e)
        }
    }
    
    let interval: NodeJS.Timeout | null = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      audioRef.current?.play().catch(e => console.error("Error playing sound:", e));
      if (mode === 'pomodoro') {
        const newPomodoroCount = pomodoros + 1;
        setPomodoros(newPomodoroCount);
        if (newPomodoroCount > 0 && newPomodoroCount % 4 === 0) {
          switchMode('longBreak');
        } else {
          switchMode('shortBreak');
        }
      } else {
        switchMode('pomodoro');
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, mode, pomodoros, switchMode]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTime(modes[mode].time);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const CurrentIcon = modes[mode].icon;

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-4">
      <div className="flex space-x-2">
        {(Object.keys(modes) as Mode[]).map((key) => (
          <Button
            key={key}
            variant={mode === key ? 'default' : 'outline'}
            onClick={() => switchMode(key, false)}
          >
            {modes[key].name}
          </Button>
        ))}
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
            <CurrentIcon className="h-8 w-8 text-primary" />
            <p className="text-2xl font-semibold">{modes[mode].name}</p>
        </div>
        <p className="text-8xl font-bold font-mono tracking-tighter">
          {formatTime(time)}
        </p>
      </div>
      <div className="flex space-x-4">
        <Button onClick={toggleTimer} size="lg" className="w-32">
          {isActive ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
          {isActive ? 'Pause' : 'Start'}
        </Button>
        <Button onClick={resetTimer} variant="secondary" size="lg">
          <RefreshCw className="mr-2 h-5 w-5" />
          Reset
        </Button>
      </div>
       <p className="text-muted-foreground">Pomodoros completed: {pomodoros}</p>
    </div>
  );
}
