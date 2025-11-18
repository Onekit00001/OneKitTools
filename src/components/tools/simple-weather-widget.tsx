"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, MapPin, Wind, Droplet, Sun, Cloud, CloudRain, CloudSnow } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // IMPORTANT: Replace with your actual OpenWeatherMap API key

type WeatherData = {
  name: string;
  country: string;
  temp: number;
  description: string;
  icon: string;
  humidity: number;
  wind: number;
};

export default function SimpleWeatherWidget() {
  const [city, setCity] = useState('London');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchWeather = async () => {
    if (!city) return;
    if (API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY') {
        toast({
            variant: "destructive",
            title: "API Key Missing",
            description: "Please add your OpenWeatherMap API key in the component file.",
        });
        return;
    }
    setLoading(true);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeather({
        name: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        wind: data.wind.speed,
      });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: (error as Error).message });
    } finally {
      setLoading(false);
    }
  };
  
  const getWeatherIcon = (iconCode: string) => {
    if (iconCode.includes("01")) return <Sun className="h-16 w-16 text-yellow-400" />;
    if (iconCode.includes("02") || iconCode.includes("03") || iconCode.includes("04")) return <Cloud className="h-16 w-16" />;
    if (iconCode.includes("09") || iconCode.includes("10")) return <CloudRain className="h-16 w-16 text-blue-400" />;
    if (iconCode.includes("13")) return <CloudSnow className="h-16 w-16 text-blue-200" />;
    return <Cloud className="h-16 w-16" />;
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
        />
        <Button onClick={fetchWeather} disabled={loading}>
          <Search className="h-4 w-4" />
        </Button>
      </div>
      {loading && <p>Loading...</p>}
      {weather && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin /> {weather.name}, {weather.country}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-center text-center">
              {getWeatherIcon(weather.icon)}
              <p className="text-5xl font-bold">{Math.round(weather.temp)}°C</p>
              <p className="text-muted-foreground capitalize">{weather.description}</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Droplet className="text-blue-500" />
                <span>Humidity: {weather.humidity}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="text-gray-500" />
                <span>Wind: {weather.wind} m/s</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      <p className="text-xs text-muted-foreground">Please replace 'YOUR_OPENWEATHERMAP_API_KEY' with your own key in <code className="font-mono bg-muted p-1 rounded">src/components/tools/simple-weather-widget.tsx</code>. You can get a free key from <a href="https://openweathermap.org/appid" target="_blank" rel="noopener noreferrer" className="underline">OpenWeatherMap</a>.</p>
    </div>
  );
}
