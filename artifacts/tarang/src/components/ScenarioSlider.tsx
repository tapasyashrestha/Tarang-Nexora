import React from 'react';

interface ScenarioSliderProps {
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit: string;
  formatValue?: (val: number) => string;
}

export function ScenarioSlider({ label, min, max, step, defaultValue, unit, formatValue }: ScenarioSliderProps) {
  const [value, setValue] = React.useState(defaultValue);

  const displayVal = formatValue ? formatValue(value) : `${value > 0 ? '+' : ''}${value}${unit}`;

  return (
    <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-md p-5 flex flex-col gap-4" data-testid={`slider-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="font-mono text-primary font-bold text-lg">{displayVal}</span>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step} 
        value={value} 
        onChange={(e) => setValue(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
      />
      <div className="flex justify-between text-xs text-muted-foreground font-mono">
        <span>{min > 0 ? '+' : ''}{min}{unit}</span>
        <span>{max > 0 ? '+' : ''}{max}{unit}</span>
      </div>
    </div>
  );
}
