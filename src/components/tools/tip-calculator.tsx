"use client";

import { useState, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

export default function TipCalculator() {
  const [bill, setBill] = useState("500");
  const [tipPercent, setTipPercent] = useState(15);
  const [people, setPeople] = useState(1);

  const { tipAmount, total, perPerson } = useMemo(() => {
    const billAmount = parseFloat(bill);
    if (isNaN(billAmount) || billAmount <= 0) {
      return { tipAmount: 0, total: 0, perPerson: 0 };
    }
    const tip = billAmount * (tipPercent / 100);
    const totalAmount = billAmount + tip;
    const split = totalAmount / people;
    return {
      tipAmount: tip,
      total: totalAmount,
      perPerson: split,
    };
  }, [bill, tipPercent, people]);
  
  const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <Label htmlFor="bill">Bill Amount (₹)</Label>
          <Input id="bill" type="number" value={bill} onChange={(e) => setBill(e.target.value)} />
        </div>
        <div>
          <Label>Tip Percentage: {tipPercent}%</Label>
          <Slider min={5} max={50} step={1} value={[tipPercent]} onValueChange={(val) => setTipPercent(val[0])} />
        </div>
        <div>
          <Label>Number of People: {people}</Label>
          <Slider min={1} max={20} step={1} value={[people]} onValueChange={(val) => setPeople(val[0])} />
        </div>
      </div>
      
      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle className="text-primary-foreground">Your Bill Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <p>Tip Amount</p>
            <p className="text-2xl font-bold">{formatCurrency(tipAmount)}</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Total Bill</p>
            <p className="text-2xl font-bold">{formatCurrency(total)}</p>
          </div>
          {people > 1 && (
            <div className="flex justify-between items-center border-t border-primary-foreground/50 pt-4">
              <p className="flex items-center gap-2"><User /> Per Person</p>
              <p className="text-3xl font-bold">{formatCurrency(perPerson)}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
