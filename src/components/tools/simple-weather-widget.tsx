"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, MapPin, Wind, Droplet, Sun, Cloud, CloudRain, CloudSnow, CloudSun } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type WeatherData = {
  name: string;
  country: string;
  temp: number;
  description: string;
  humidity: number;
  wind: number;
  icon: string;
};

// A mapping from WMO weather codes to a simpler icon representation and description
const weatherCodes: { [key: number]: { description: string; icon: string } } = {
  0: { description: 'Clear sky', icon: 'sun' },
  1: { description: 'Mainly clear', icon: 'sun' },
  2: { description: 'Partly cloudy', icon: 'sun-cloud' },
  3: { description: 'Overcast', icon: 'cloud' },
  45: { description: 'Fog', icon: 'cloud' },
  48: { description: 'Depositing rime fog', icon: 'cloud' },
  51: { description: 'Light drizzle', icon: 'drizzle' },
  53: { description: 'Moderate drizzle', icon: 'drizzle' },
  55: { description: 'Dense drizzle', icon: 'drizzle' },
  56: { description: 'Light freezing drizzle', icon: 'drizzle' },
  57: { description: 'Dense freezing drizzle', icon: 'drizzle' },
  61: { description: 'Slight rain', icon: 'rain' },
  63: { description: 'Moderate rain', icon: 'rain' },
  65: { description: 'Heavy rain', icon: 'rain' },
  66: { description: 'Light freezing rain', icon: 'rain-snow' },
  67: { description: 'Heavy freezing rain', icon: 'rain-snow' },
  71: { description: 'Slight snow fall', icon: 'snow' },
  73: { description: 'Moderate snow fall', icon: 'snow' },
  75: { description: 'Heavy snow fall', icon: 'snow' },
  77: { description: 'Snow grains', icon: 'snow' },
  80: { description: 'Slight rain showers', icon: 'rain' },
  81: { description: 'Moderate rain showers', icon: 'rain' },
  82: { description: 'Violent rain showers', icon: 'rain' },
  85: { description: 'Slight snow showers', icon: 'snow' },
  86: { description: 'Heavy snow showers', icon: 'snow' },
  95: { description: 'Thunderstorm', icon: 'thunderstorm' },
  96: { description: 'Thunderstorm with slight hail', icon: 'thunderstorm' },
  99: { description: 'Thunderstorm with heavy hail', icon: 'thunderstorm' },
};


export default function SimpleWeatherWidget() {
  const [city, setCity] = useState('London');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setWeather(null);
    try {
      // 1. Geocode city to get latitude and longitude
      const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
      const geoData = await geoResponse.json();
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found');
      }
      const { latitude, longitude, name, country } = geoData.results[0];

      // 2. Fetch weather using coordinates
      const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&hourly=temperature_2m&timezone=auto`);
      const weatherData = await weatherResponse.json();
      
      const { temperature_2m, relative_humidity_2m, weather_code, wind_speed_10m } = weatherData.current;
      const weatherInfo = weatherCodes[weather_code] || { description: 'Unknown', icon: 'cloud' };

      setWeather({
        name,
        country: country || '',
        temp: temperature_2m,
        description: weatherInfo.description,
        humidity: relative_humidity_2m,
        wind: wind_speed_10m,
        icon: weatherInfo.icon,
      });

    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: (error as Error).message });
    } finally {
      setLoading(false);
    }
  };
  
  const getWeatherIcon = (iconCode: string) => {
    switch(iconCode) {
      case 'sun': return <Sun className="h-16 w-16 text-yellow-400" />;
      case 'sun-cloud': return <CloudSun className="h-16 w-16" />;
      case 'cloud': return <Cloud className="h-16 w-16" />;
      case 'drizzle':
      case 'rain': return <CloudRain className="h-16 w-16 text-blue-400" />;
      case 'snow':
      case 'rain-snow': return <CloudSnow className="h-16 w-16 text-blue-200" />;
      case 'thunderstorm': return <CloudRain className="h-16 w-16 text-yellow-500" />; // Simplified
      default: return <Cloud className="h-16 w-16" />;
    }
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
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2">
                <Droplet className="text-blue-500" />
                <span>Humidity: {weather.humidity}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="text-gray-500" />
                <span>Wind: {weather.wind} km/h</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      <p className="text-xs text-muted-foreground">Weather data provided by <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="underline">Open-Meteo</a>.</p>
    </div>
  );
}
