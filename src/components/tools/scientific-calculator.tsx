"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');

  const handleInput = (value: string) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
  };

  const handleOperator = (op: string) => {
    setExpression(expression + display + op);
    setDisplay('0');
  };

  const handleFunction = (fn: string) => {
    try {
      let result;
      const currentVal = parseFloat(display);
      switch(fn) {
        case 'sqrt': result = Math.sqrt(currentVal); break;
        case 'sq': result = Math.pow(currentVal, 2); break;
        case 'sin': result = Math.sin(currentVal * Math.PI / 180); break;
        case 'cos': result = Math.cos(currentVal * Math.PI / 180); break;
        case 'tan': result = Math.tan(currentVal * Math.PI / 180); break;
        case 'log': result = Math.log10(currentVal); break;
        case 'ln': result = Math.log(currentVal); break;
        case 'pi': result = Math.PI; break;
        default: result = 0;
      }
      setDisplay(String(result));
    } catch {
      setDisplay('Error');
    }
  };

  const handleEquals = () => {
    try {
      // DANGER: eval is used for simplicity. For production apps, a proper math expression parser is safer.
      const result = eval(expression + display);
      setDisplay(String(result));
      setExpression('');
    } catch {
      setDisplay('Error');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
  };
  
  const handleBackspace = () => {
    setDisplay(display.slice(0, -1) || '0');
  };

  const buttons = [
    'sin', 'cos', 'tan', 'C',
    'sqrt', 'sq', 'log', 'ln',
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
  ];

  const renderButton = (btn: string) => {
    if (['+', '-', '*', '/'].includes(btn)) return <Button key={btn} variant="outline" onClick={() => handleOperator(btn)}>{btn}</Button>;
    if (btn === '=') return <Button key={btn} onClick={handleEquals} className="col-span-1">{btn}</Button>;
    if (btn === 'C') return <Button key={btn} variant="destructive" onClick={handleClear}>{btn}</Button>;
    if (['sin', 'cos', 'tan', 'sqrt', 'sq', 'log', 'ln'].includes(btn)) return <Button key={btn} variant="secondary" onClick={() => handleFunction(btn)}>{btn}</Button>;
    return <Button key={btn} variant="outline" onClick={() => handleInput(btn)}>{btn}</Button>;
  }

  return (
    <div className="max-w-xs mx-auto space-y-2">
      <div className="p-4 bg-secondary rounded-lg text-right">
        <div className="text-sm text-muted-foreground h-6 truncate">{expression}</div>
        <div className="text-4xl font-bold font-mono">{display}</div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {buttons.map(btn => renderButton(btn))}
        <Button variant="outline" onClick={handleBackspace} className="col-span-2">Backspace</Button>
        <Button variant="secondary" onClick={() => handleFunction('pi')} className="col-span-2">&pi;</Button>
      </div>
    </div>
  );
}
