"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeartPulse } from "lucide-react";

export default function BmiCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [metricHeight, setMetricHeight] = useState("");
  const [metricWeight, setMetricWeight] = useState("");
  const [imperialHeightFt, setImperialHeightFt] = useState("");
  const [imperialHeightIn, setImperialHeightIn] = useState("");
  const [imperialWeight, setImperialWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState("");

  const calculateBmi = () => {
    let height, weight;
    if (unit === "metric") {
      height = parseFloat(metricHeight) / 100; // cm to m
      weight = parseFloat(metricWeight);
    } else {
      const feet = parseFloat(imperialHeightFt) || 0;
      const inches = parseFloat(imperialHeightIn) || 0;
      height = (feet * 12 + inches) * 0.0254; // ft/in to m
      weight = parseFloat(imperialWeight) * 0.453592; // lbs to kg
    }

    if (height > 0 && weight > 0) {
      const bmiValue = weight / (height * height);
      setBmi(bmiValue);
      setCategory(bmiValue);
    } else {
      setBmi(null);
      setBmiCategory("");
    }
  };

  const setCategory = (bmiValue: number) => {
    if (bmiValue < 18.5) setBmiCategory("Underweight");
    else if (bmiValue < 25) setBmiCategory("Normal weight");
    else if (bmiValue < 30) setBmiCategory("Overweight");
    else setBmiCategory("Obese");
  };

  return (
    <div>
      <Tabs defaultValue="metric" onValueChange={(value) => setUnit(value as "metric" | "imperial")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="metric">Metric Units</TabsTrigger>
          <TabsTrigger value="imperial">Imperial Units</TabsTrigger>
        </TabsList>
        <TabsContent value="metric" className="space-y-4 pt-4">
          <div>
            <Label htmlFor="metric-height">Height (cm)</Label>
            <Input id="metric-height" type="number" placeholder="e.g., 175" value={metricHeight} onChange={(e) => setMetricHeight(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="metric-weight">Weight (kg)</Label>
            <Input id="metric-weight" type="number" placeholder="e.g., 70" value={metricWeight} onChange={(e) => setMetricWeight(e.target.value)} />
          </div>
        </TabsContent>
        <TabsContent value="imperial" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="imperial-height-ft">Height (ft)</Label>
              <Input id="imperial-height-ft" type="number" placeholder="e.g., 5" value={imperialHeightFt} onChange={(e) => setImperialHeightFt(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="imperial-height-in">Height (in)</Label>
              <Input id="imperial-height-in" type="number" placeholder="e.g., 9" value={imperialHeightIn} onChange={(e) => setImperialHeightIn(e.target.value)} />
            </div>
          </div>
          <div>
            <Label htmlFor="imperial-weight">Weight (lbs)</Label>
            <Input id="imperial-weight" type="number" placeholder="e.g., 154" value={imperialWeight} onChange={(e) => setImperialWeight(e.target.value)} />
          </div>
        </TabsContent>
      </Tabs>
      <Button onClick={calculateBmi} className="w-full mt-4">Calculate BMI</Button>

      {bmi !== null && (
        <Card className="mt-6 bg-secondary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <HeartPulse />
              Your Result
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-5xl font-bold">{bmi.toFixed(1)}</p>
            <p className="text-xl font-medium text-muted-foreground mt-2">{bmiCategory}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
