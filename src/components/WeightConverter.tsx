import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Weight, ToggleLeft, ToggleRight } from 'lucide-react';
import { kgToLbs, lbsToKg } from '@/utils/conversions';
import { useTheme } from '@/hooks/use-theme';

interface WeightConverterProps {
  kilograms: string;
  pounds: string;
  weightMode: 'metric' | 'imperial';
  onKilogramsChange: (value: string) => void;
  onPoundsChange: (value: string) => void;
  onModeToggle: () => void;
}

const WeightConverter: React.FC<WeightConverterProps> = ({
  kilograms,
  pounds,
  weightMode,
  onKilogramsChange,
  onPoundsChange,
  onModeToggle,
}) => {
  const { theme } = useTheme();
  const handleMetricChange = (kgValue: string) => {
    onKilogramsChange(kgValue);
    
    const kg = parseFloat(kgValue) || 0;
    if (kg > 0) {
      const lbs = kgToLbs(kg);
      onPoundsChange(lbs.toFixed(1));
    }
  };

  const handleImperialChange = (lbsValue: string) => {
    onPoundsChange(lbsValue);
    
    const lbs = parseFloat(lbsValue) || 0;
    if (lbs > 0) {
      const kg = lbsToKg(lbs);
      onKilogramsChange(kg.toFixed(1));
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Weight className={`h-5 w-5 ${theme === 'dark' ? 'text-sky-400' : 'text-sky-600'}`} />
          <Label className={`text-lg font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>Weight</Label>
        </div>
        <Button
          size="sm"
          onClick={onModeToggle}
          className="flex items-center gap-2 transition-colors"
        >
          {weightMode === 'metric' ? (
            <>
              <ToggleLeft className="h-4 w-4" />
              <span className="text-sm">kg</span>
            </>
          ) : (
            <>
              <ToggleRight className="h-4 w-4" />
              <span className="text-sm">lbs</span>
            </>
          )}
        </Button>
      </div>

      {weightMode === 'metric' ? (
        <div>
          <Label htmlFor="kilograms" className="mb-1 block">
            Kilograms
          </Label>
          <Input
            id="kilograms"
            type="number"
            value={kilograms}
            onChange={(e) => handleMetricChange(e.target.value)}
            placeholder="70"
            min="30"
            max="300"
            step="0.1"
            className="text-center text-lg font-medium"
          />
        </div>
      ) : (
        <div>
          <Label htmlFor="pounds" className="mb-1 block">
            Pounds
          </Label>
          <Input
            id="pounds"
            type="number"
            value={pounds}
            onChange={(e) => handleImperialChange(e.target.value)}
            placeholder="154"
            min="66"
            max="660"
            step="0.1"
            className="text-center text-lg font-medium"
          />
        </div>
      )}
    </Card>
  );
};

export default WeightConverter;