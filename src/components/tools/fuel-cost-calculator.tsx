"use client";

import { useState, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Fuel } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const currencies = ['INR', 'USD', 'EUR', 'GBP', 'JPY'];

export default function FuelCostCalculator() {
  const [distance, setDistance] = useState("100");
  const [mileage, setMileage] = useState("15");
  const [fuelPrice, setFuelPrice] = useState("100");
  const [currency, setCurrency] = useState('INR');

  const totalCost = useMemo(() => {
    const d = parseFloat(distance);
    const m = parseFloat(mileage);
    const p = parseFloat(fuelPrice);
    if (isNaN(d) || d <= 0 || isNaN(m) || m <= 0 || isNaN(p) || p <= 0) return 0;
    return (d / m) * p;
  }, [distance, mileage, fuelPrice]);
  
  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, minimumFractionDigits: 2 }).format(value);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="distance">Distance (km)</Label>
          <Input id="distance" type="number" value={distance} onChange={(e) => setDistance(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="mileage">Vehicle Mileage (km/l)</Label>
          <Input id="mileage" type="number" value={mileage} onChange={(e) => setMileage(e.target.value)} />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
         <div>
          <Label htmlFor="fuel-price">Fuel Price (per liter)</Label>
          <Input id="fuel-price" type="number" value={fuelPrice} onChange={(e) => setFuelPrice(e.target.value)} />
        </div>
        <div>
            <Label htmlFor="currency">Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger id="currency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
      </div>
      <Card className="bg-secondary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Fuel className="text-primary" />
            Estimated Fuel Cost
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-5xl font-bold">{formatCurrency(totalCost)}</p>
        </CardContent>
      </Card>
    </div>
  );
}
