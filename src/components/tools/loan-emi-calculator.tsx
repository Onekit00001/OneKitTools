"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Landmark } from "lucide-react";

export default function LoanEmiCalculator() {
  const [principal, setPrincipal] = useState(1000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [emi, setEmi] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);

  const calculateEmi = () => {
    const p = principal;
    const r = rate / 12 / 100;
    const n = tenure * 12;

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
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="principal">Loan Amount: {formatCurrency(principal)}</Label>
        <Slider id="principal" min={100000} max={20000000} step={100000} value={[principal]} onValueChange={(val) => setPrincipal(val[0])} />
      </div>
      <div>
        <Label htmlFor="rate">Interest Rate (%): {rate.toFixed(2)}</Label>
        <Slider id="rate" min={1} max={20} step={0.05} value={[rate]} onValueChange={(val) => setRate(val[0])} />
      </div>
      <div>
        <Label htmlFor="tenure">Loan Tenure (Years): {tenure}</Label>
        <Slider id="tenure" min={1} max={30} step={1} value={[tenure]} onValueChange={(val) => setTenure(val[0])} />
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
