"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TimeDurationCalculator() {
  const [h1, setH1] = useState("10"); const [m1, setM1] = useState("30"); const [s1, setS1] = useState("0");
  const [h2, setH2] = useState("2"); const [m2, setM2] = useState("15"); const [s2, setS2] = useState("0");
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [result, setResult] = useState("");

  const calculate = () => {
    const time1 = parseInt(h1)*3600 + parseInt(m1)*60 + parseInt(s1);
    const time2 = parseInt(h2)*3600 + parseInt(m2)*60 + parseInt(s2);
    let totalSeconds = operation === "add" ? time1 + time2 : time1 - time2;
    if(totalSeconds < 0) totalSeconds = 0;
    
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    setResult(`${hours}h ${minutes}m ${seconds}s`);
  };

  return (
    <div className="space-y-6">
        <div className="space-y-2">
            <Label>Time 1</Label>
            <div className="grid grid-cols-3 gap-2">
                <Input type="number" value={h1} onChange={e => setH1(e.target.value)} placeholder="Hours" />
                <Input type="number" value={m1} onChange={e => setM1(e.target.value)} placeholder="Minutes" />
                <Input type="number" value={s1} onChange={e => setS1(e.target.value)} placeholder="Seconds" />
            </div>
        </div>
        <div className="flex justify-center">
            <Select value={operation} onValueChange={v => setOperation(v as any)}>
                <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="add">Add (+)</SelectItem>
                    <SelectItem value="subtract">Subtract (-)</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="space-y-2">
            <Label>Time 2</Label>
            <div className="grid grid-cols-3 gap-2">
                <Input type="number" value={h2} onChange={e => setH2(e.target.value)} placeholder="Hours" />
                <Input type="number" value={m2} onChange={e => setM2(e.target.value)} placeholder="Minutes" />
                <Input type="number" value={s2} onChange={e => setS2(e.target.value)} placeholder="Seconds" />
            </div>
        </div>
        <Button onClick={calculate} className="w-full">Calculate</Button>
        {result && (
            <div className="text-center p-6 bg-secondary rounded-md">
                <p className="text-muted-foreground">Result</p>
                <p className="text-4xl font-bold">{result}</p>
            </div>
        )}
    </div>
  );
}
