"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format, differenceInYears, differenceInMonths, differenceInDays, addYears, addMonths } from "date-fns";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<Date | undefined>(new Date(2000, 0, 1));
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;
    const today = new Date();
    const years = differenceInYears(today, birthDate);
    const pastYearDate = addYears(birthDate, years);
    const months = differenceInMonths(today, pastYearDate);
    const pastMonthDate = addMonths(pastYearDate, months);
    const days = differenceInDays(today, pastMonthDate);
    setAge({ years, months, days });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Your Date of Birth</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"outline"} className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {birthDate ? format(birthDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={birthDate}
              onSelect={setBirthDate}
              captionLayout="dropdown-buttons"
              fromYear={1900}
              toYear={new Date().getFullYear()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <Button onClick={calculateAge} className="w-full">Calculate Age</Button>
      {age && (
        <Card className="bg-secondary">
          <CardHeader>
            <CardTitle>Your Age</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-4xl font-bold">{age.years}</p>
              <p className="text-muted-foreground">Years</p>
            </div>
            <div>
              <p className="text-4xl font-bold">{age.months}</p>
              <p className="text-muted-foreground">Months</p>
            </div>
            <div>
              <p className="text-4xl font-bold">{age.days}</p>
              <p className="text-muted-foreground">Days</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
