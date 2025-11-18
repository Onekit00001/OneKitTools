"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { format, differenceInDays, differenceInWeeks, differenceInMonths, differenceInYears, addDays } from "date-fns";

export default function DateTimeCalculator() {
  const [fromDate, setFromDate] = useState<Date | undefined>(new Date());
  const [toDate, setToDate] = useState<Date | undefined>(addDays(new Date(), 30));
  const [diff, setDiff] = useState<{ years: number, months: number, weeks: number, days: number } | null>(null);

  const calculateDifference = () => {
    if (!fromDate || !toDate) return;
    setDiff({
      years: differenceInYears(toDate, fromDate),
      months: differenceInMonths(toDate, fromDate),
      weeks: differenceInWeeks(toDate, fromDate),
      days: differenceInDays(toDate, fromDate),
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>From Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {fromDate ? format(fromDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={fromDate} onSelect={setFromDate} initialFocus /></PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label>To Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {toDate ? format(toDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={toDate} onSelect={setToDate} initialFocus /></PopoverContent>
          </Popover>
        </div>
      </div>
      <Button onClick={calculateDifference} className="w-full">Calculate Duration</Button>
      {diff && (
        <Card className="bg-secondary">
          <CardHeader><CardTitle>Difference</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <Stat title="Years" value={diff.years} />
            <Stat title="Months" value={diff.months} />
            <Stat title="Weeks" value={diff.weeks} />
            <Stat title="Days" value={diff.days} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function Stat({ title, value }: { title: string; value: number }) {
  return (
    <div>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-muted-foreground">{title}</p>
    </div>
  );
}
