"use client";

import { useState, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "lucide-react";

export default function DiscountCalculator() {
  const [price, setPrice] = useState("1000");
  const [discount, setDiscount] = useState("20");

  const { finalPrice, youSave } = useMemo(() => {
    const originalPrice = parseFloat(price);
    const discountPercent = parseFloat(discount);
    if (isNaN(originalPrice) || isNaN(discountPercent)) {
      return { finalPrice: 0, youSave: 0 };
    }
    const saved = originalPrice * (discountPercent / 100);
    const final = originalPrice - saved;
    return { finalPrice: final, youSave: saved };
  }, [price, discount]);
  
  const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <Label htmlFor="price">Original Price (₹)</Label>
          <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="discount">Discount (%)</Label>
          <Input id="discount" type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} />
        </div>
      </div>
      
      <Card className="bg-secondary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Tag />
            Final Price
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-5xl font-bold">{formatCurrency(finalPrice)}</p>
          </div>
          <div className="text-center p-4 bg-green-100 dark:bg-green-900/50 rounded-md">
            <p className="font-medium text-green-700 dark:text-green-300">You save {formatCurrency(youSave)}!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
