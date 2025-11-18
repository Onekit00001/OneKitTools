"use client";

import { useState, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRightLeft } from 'lucide-react';

const units = {
  length: { name: 'Length', base: 'meter', list: { meter: 1, kilometer: 1000, centimeter: 0.01, millimeter: 0.001, mile: 1609.34, yard: 0.9144, foot: 0.3048, inch: 0.0254 } },
  weight: { name: 'Weight', base: 'gram', list: { gram: 1, kilogram: 1000, milligram: 0.001, pound: 453.592, ounce: 28.3495 } },
  temperature: { name: 'Temperature', base: 'celsius', list: { celsius: 1, fahrenheit: 1, kelvin: 1 } },
  speed: { name: 'Speed', base: 'm/s', list: { 'm/s': 1, 'km/h': 0.277778, 'mph': 0.44704, 'knot': 0.514444 } },
  volume: { name: 'Volume', base: 'liter', list: { liter: 1, milliliter: 0.001, 'cubic meter': 1000, 'gallon (US)': 3.78541, 'pint (US)': 0.473176 } },
  area: { name: 'Area', base: 'sq meter', list: { 'sq meter': 1, 'sq kilometer': 1000000, 'sq mile': 2589990, 'acre': 4046.86, 'hectare': 10000 } },
};

type UnitCategory = keyof typeof units;

export default function UnitConverter() {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('foot');
  const [fromValue, setFromValue] = useState('1');
  
  const currentUnits = units[category];

  const toValue = useMemo(() => {
    const value = parseFloat(fromValue);
    if (isNaN(value)) return '';

    if (category === 'temperature') {
      if (fromUnit === 'celsius' && toUnit === 'fahrenheit') return (value * 9/5 + 32).toFixed(2);
      if (fromUnit === 'fahrenheit' && toUnit === 'celsius') return ((value - 32) * 5/9).toFixed(2);
      if (fromUnit === 'celsius' && toUnit === 'kelvin') return (value + 273.15).toFixed(2);
      if (fromUnit === 'kelvin' && toUnit === 'celsius') return (value - 273.15).toFixed(2);
      if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') return ((value - 32) * 5/9 + 273.15).toFixed(2);
      if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') return ((value - 273.15) * 9/5 + 32).toFixed(2);
      return value.toFixed(2);
    }
    
    const fromFactor = currentUnits.list[fromUnit as keyof typeof currentUnits.list];
    const toFactor = currentUnits.list[toUnit as keyof typeof currentUnits.list];
    const result = value * fromFactor / toFactor;
    return result.toPrecision(6);
  }, [fromValue, fromUnit, toUnit, category, currentUnits]);

  const handleCategoryChange = (newCategory: UnitCategory) => {
    setCategory(newCategory);
    const newUnitList = Object.keys(units[newCategory].list);
    setFromUnit(newUnitList[0]);
    setToUnit(newUnitList[1] || newUnitList[0]);
    setFromValue('1');
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="category-select">Category</Label>
        <Select value={category} onValueChange={(val) => handleCategoryChange(val as UnitCategory)}>
          <SelectTrigger id="category-select">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(units).map(([key, value]) => (
              <SelectItem key={key} value={key}>{value.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_auto_2fr] gap-4 items-end">
        <div className='space-y-2'>
          <Label htmlFor='from-unit'>From</Label>
           <Select value={fromUnit} onValueChange={setFromUnit}>
            <SelectTrigger id="from-unit">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(currentUnits.list).map(unit => (
                <SelectItem key={unit} value={unit}>{unit}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input type="number" value={fromValue} onChange={(e) => setFromValue(e.target.value)} />
        </div>
        <div className="flex justify-center">
            <ArrowRightLeft className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='to-unit'>To</Label>
           <Select value={toUnit} onValueChange={setToUnit}>
            <SelectTrigger id="to-unit">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(currentUnits.list).map(unit => (
                <SelectItem key={unit} value={unit}>{unit}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input type="text" value={toValue} readOnly className="bg-secondary font-semibold" />
        </div>
      </div>
    </div>
  );
}
