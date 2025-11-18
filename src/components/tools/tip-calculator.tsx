"use client";

import { useState, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const currencies = ['INR', 'USD', 'EUR', 'GBP', 'JPY'];

export default function TipCalculator() {
  const [bill, setBill] = useState("500");
  const [tipPercent, setTipPercent] = useState("15");
  const [people, setPeople] = useState("1");
  const [currency, setCurrency] = useState('INR');

  const { tipAmount, total, perPerson } = useMemo(() => {
    const billAmount = parseFloat(bill);
    const tip = parseFloat(tipPercent);
    const numPeople = parseInt(people);

    if (isNaN(billAmount) || billAmount <= 0 || isNaN(tip) || isNaN(numPeople) || numPeople < 1) {
      return { tipAmount: 0, total: 0, perPerson: 0 };
    }
    const tipValue = billAmount * (tip / 100);
    const totalAmount = billAmount + tipValue;
    const split = totalAmount / numPeople;
    return {
      tipAmount: tipValue,
      total: totalAmount,
      perPerson: split,
    };
  }, [bill, tipPercent, people]);
  
  const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: currency, minimumFractionDigits: 2 }).format(value);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bill">Bill Amount</Label>
            <Input id="bill" type="number" value={bill} onChange={(e) => setBill(e.target.value)} />
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="tip">Tip Percentage (%)</Label>
            <Input id="tip" type="number" value={tipPercent} onChange={(e) => setTipPercent(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="people">Number of People</Label>
            <Input id="people" type="number" value={people} onChange={(e) => setPeople(e.target.value)} />
          </div>
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
          {parseInt(people) > 1 && (
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
