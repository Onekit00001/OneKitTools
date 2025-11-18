"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Percent } from "lucide-react";

export default function PercentageCalculator() {
  const [val1, setVal1] = useState("10");
  const [val2, setVal2] = useState("50");
  const [result1, setResult1] = useState("");

  const [val3, setVal3] = useState("10");
  const [val4, setVal4] = useState("200");
  const [result2, setResult2] = useState("");
  
  const [val5, setVal5] = useState("50");
  const [val6, setVal6] = useState("150");
  const [result3, setResult3] = useState("");

  const calc1 = () => {
    const p = parseFloat(val1);
    const v = parseFloat(val2);
    if (!isNaN(p) && !isNaN(v)) setResult1(((p / 100) * v).toString());
  };

  const calc2 = () => {
    const v1 = parseFloat(val3);
    const v2 = parseFloat(val4);
    if (!isNaN(v1) && !isNaN(v2) && v2 !== 0) setResult2(((v1 / v2) * 100).toFixed(2) + "%");
  };
  
  const calc3 = () => {
    const v1 = parseFloat(val5);
    const v2 = parseFloat(val6);
     if (!isNaN(v1) && !isNaN(v2) && v1 !== 0) {
        const change = ((v2 - v1) / v1) * 100;
        setResult3(`${change.toFixed(2)}% ${change > 0 ? 'increase' : 'decrease'}`);
     }
  };

  return (
    <Tabs defaultValue="p-of-v">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="p-of-v">What is % of ?</TabsTrigger>
        <TabsTrigger value="v-is-p-of">is what % of ?</TabsTrigger>
        <TabsTrigger value="p-change">% Change</TabsTrigger>
      </TabsList>
      
      <TabsContent value="p-of-v" className="pt-4">
        <Card>
          <CardHeader><CardTitle>Percentage of a Value</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Input type="number" value={val1} onChange={(e) => { setVal1(e.target.value); calc1() }} />
              <Label>% of</Label>
              <Input type="number" value={val2} onChange={(e) => { setVal2(e.target.value); calc1() }} />
            </div>
            <div className="text-center p-4 bg-secondary rounded-md">
                <p className="text-muted-foreground">Result</p>
                <p className="text-2xl font-bold">{result1}</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="v-is-p-of" className="pt-4">
        <Card>
          <CardHeader><CardTitle>Value as a Percentage of Another</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Input type="number" value={val3} onChange={(e) => { setVal3(e.target.value); calc2() }} />
              <Label>is what % of</Label>
              <Input type="number" value={val4} onChange={(e) => { setVal4(e.target.value); calc2() }} />
            </div>
            <div className="text-center p-4 bg-secondary rounded-md">
                <p className="text-muted-foreground">Result</p>
                <p className="text-2xl font-bold">{result2}</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="p-change" className="pt-4">
        <Card>
          <CardHeader><CardTitle>Percentage Increase/Decrease</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Label>From</Label>
              <Input type="number" value={val5} onChange={(e) => { setVal5(e.target.value); calc3() }} />
              <Label>to</Label>
              <Input type="number" value={val6} onChange={(e) => { setVal6(e.target.value); calc3() }} />
            </div>
             <div className="text-center p-4 bg-secondary rounded-md">
                <p className="text-muted-foreground">Result</p>
                <p className="text-2xl font-bold">{result3}</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
