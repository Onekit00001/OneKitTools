"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const gstRates = ["3", "5", "12", "18", "28"];
const currencies = ['INR', 'USD', 'EUR', 'GBP', 'JPY'];

export default function GstTaxCalculator() {
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState("18");
  const [type, setType] = useState<"inclusive" | "exclusive">("exclusive");
  const [currency, setCurrency] = useState('INR');
  const [result, setResult] = useState<{ original: number; gst: number; total: number } | null>(null);

  const calculateGst = () => {
    const baseAmount = parseFloat(amount);
    const gstRate = parseFloat(rate) / 100;
    if (isNaN(baseAmount) || isNaN(gstRate)) return;

    if (type === "exclusive") {
      const gstAmount = baseAmount * gstRate;
      setResult({
        original: baseAmount,
        gst: gstAmount,
        total: baseAmount + gstAmount,
      });
    } else { // inclusive
      const originalAmount = baseAmount / (1 + gstRate);
      const gstAmount = baseAmount - originalAmount;
      setResult({
        original: originalAmount,
        gst: gstAmount,
        total: baseAmount,
      });
    }
  };
  
  const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: currency }).format(value);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="amount">Amount</Label>
          <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div className="space-y-2">
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
      <div className="space-y-2">
          <Label>GST Rate</Label>
           <Select value={rate} onValueChange={setRate}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{gstRates.map(r => <SelectItem key={r} value={r}>{r}%</SelectItem>)}</SelectContent>
          </Select>
        </div>
      <div className="space-y-2">
        <Label>Type</Label>
        <RadioGroup value={type} onValueChange={(v) => setType(v as any)} className="flex gap-4">
          <div className="flex items-center space-x-2"><RadioGroupItem value="exclusive" id="exclusive" /><Label htmlFor="exclusive">GST Exclusive</Label></div>
          <div className="flex items-center space-x-2"><RadioGroupItem value="inclusive" id="inclusive" /><Label htmlFor="inclusive">GST Inclusive</Label></div>
        </RadioGroup>
      </div>
      <Button onClick={calculateGst} className="w-full">Calculate GST</Button>

      {result && (
        <Card className="bg-secondary">
          <CardHeader><CardTitle>Calculation Result</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Original Amount</p>
              <p className="text-2xl font-bold">{formatCurrency(result.original)}</p>
            </div>
             <div>
              <p className="text-sm text-muted-foreground">GST ({rate}%)</p>
              <p className="text-2xl font-bold">{formatCurrency(result.gst)}</p>
            </div>
             <div>
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-2xl font-bold">{formatCurrency(result.total)}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
