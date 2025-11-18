"use client";

import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const API_URL = "https://api.exchangerate-api.com/v4/latest/";

export default function CurrencyConverter() {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [amount, setAmount] = useState('1');
  const [rates, setRates] = useState<any>({});
  const [convertedAmount, setConvertedAmount] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    fetch(API_URL + 'USD')
      .then(res => res.json())
      .then(data => {
        setCurrencies(Object.keys(data.rates));
        setRates(data.rates);
      })
      .catch(() => toast({ variant: 'destructive', title: 'Error', description: 'Could not fetch currency data.' }));
  }, [toast]);
  
  useEffect(() => {
    if(rates[fromCurrency] && rates[toCurrency]){
        const rate = rates[toCurrency] / rates[fromCurrency];
        const result = parseFloat(amount) * rate;
        if(!isNaN(result)) {
            setConvertedAmount(result.toFixed(2));
        }
    }
  }, [amount, fromCurrency, toCurrency, rates]);
  
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_auto_2fr] gap-4 items-end">
        <div className='space-y-2'>
          <Label htmlFor='from-amount'>Amount</Label>
          <Input id='from-amount' type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_auto_2fr] gap-4 items-end">
        <div className='space-y-2'>
          <Label htmlFor='from-currency'>From</Label>
           <Select value={fromCurrency} onValueChange={setFromCurrency}>
            <SelectTrigger id="from-currency"><SelectValue /></SelectTrigger>
            <SelectContent>{currencies.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <Button variant="ghost" size="icon" onClick={handleSwap}>
            <ArrowRightLeft className="h-6 w-6 text-muted-foreground" />
        </Button>
        <div className='space-y-2'>
          <Label htmlFor='to-currency'>To</Label>
           <Select value={toCurrency} onValueChange={setToCurrency}>
            <SelectTrigger id="to-currency"><SelectValue /></SelectTrigger>
            <SelectContent>{currencies.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </div>
      <div className="text-center p-6 bg-secondary rounded-md">
        <p className="text-muted-foreground">Converted Amount</p>
        <p className="text-4xl font-bold">{convertedAmount}</p>
      </div>
    </div>
  );
}
