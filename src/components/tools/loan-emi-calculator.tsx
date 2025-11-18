"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Landmark } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const currencies = ['INR', 'USD', 'EUR', 'GBP', 'JPY'];

export default function LoanEmiCalculator() {
  const [principal, setPrincipal] = useState("1000000");
  const [rate, setRate] = useState("8.5");
  const [tenure, setTenure] = useState("20");
  const [currency, setCurrency] = useState('INR');
  const [emi, setEmi] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);

  const calculateEmi = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100;
    const n = parseFloat(tenure) * 12;

    if (p > 0 && r > 0 && n > 0) {
      const emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPaymentValue = emiValue * n;
      const totalInterestValue = totalPaymentValue - p;
      
      setEmi(emiValue);
      setTotalInterest(totalInterestValue);
      setTotalPayment(totalPaymentValue);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };
  
  return (
    <div className="space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="principal">Loan Amount</Label>
           <Input id="principal" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="currency">Currency</Label>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger id="currency">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="rate">Interest Rate (% p.a.)</Label>
          <Input id="rate" type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="tenure">Loan Tenure (Years)</Label>
          <Input id="tenure" type="number" value={tenure} onChange={(e) => setTenure(e.target.value)} />
        </div>
      </div>

      <Button onClick={calculateEmi} className="w-full">Calculate EMI</Button>

      {emi !== null && (
        <Card className="bg-secondary">
          <CardHeader>
             <CardTitle className="flex items-center gap-2 text-primary">
                <Landmark />
                Loan Summary
             </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Monthly EMI</p>
              <p className="text-2xl font-bold">{formatCurrency(emi)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Interest</p>
              <p className="text-2xl font-bold">{formatCurrency(totalInterest!)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Payment</p>
              <p className="text-2xl font-bold">{formatCurrency(totalPayment!)}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
