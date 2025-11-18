"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Coins } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const currencies = ['INR', 'USD', 'EUR', 'GBP', 'JPY'];

export default function SipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [rate, setRate] = useState(12);
  const [tenure, setTenure] = useState(10);
  const [currency, setCurrency] = useState('INR');
  const [investedAmount, setInvestedAmount] = useState<number | null>(null);
  const [estimatedReturns, setEstimatedReturns] = useState<number | null>(null);
  const [totalValue, setTotalValue] = useState<number | null>(null);

  const calculateSip = () => {
    const i = rate / 12 / 100;
    const n = tenure * 12;
    const M = monthlyInvestment;
    
    if (M > 0 && i > 0 && n > 0) {
      const futureValue = M * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
      const totalInvested = M * n;
      const returns = futureValue - totalInvested;

      setTotalValue(futureValue);
      setInvestedAmount(totalInvested);
      setEstimatedReturns(returns);
    }
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-2">
            <Label htmlFor="monthly-investment">Monthly Investment: {formatCurrency(monthlyInvestment)}</Label>
             <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-28">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
        </div>
        <Slider id="monthly-investment" min={500} max={100000} step={500} value={[monthlyInvestment]} onValueChange={(val) => setMonthlyInvestment(val[0])} />
      </div>
      <div>
        <Label htmlFor="rate">Expected Return Rate (% p.a.): {rate.toFixed(1)}</Label>
        <Slider id="rate" min={1} max={30} step={0.1} value={[rate]} onValueChange={(val) => setRate(val[0])} />
      </div>
      <div>
        <Label htmlFor="tenure">Time Period (Years): {tenure}</Label>
        <Slider id="tenure" min={1} max={40} step={1} value={[tenure]} onValueChange={(val) => setTenure(val[0])} />
      </div>

      <Button onClick={calculateSip} className="w-full">Calculate</Button>

      {totalValue !== null && (
        <Card className="bg-secondary">
          <CardHeader>
             <CardTitle className="flex items-center gap-2 text-primary">
                <Coins />
                Investment Summary
             </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Invested Amount</p>
              <p className="text-2xl font-bold">{formatCurrency(investedAmount!)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Est. Returns</p>
              <p className="text-2xl font-bold">{formatCurrency(estimatedReturns!)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
