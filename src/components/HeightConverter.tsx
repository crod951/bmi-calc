import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Ruler, ToggleLeft, ToggleRight } from 'lucide-react';
import { feetInchesToCm, cmToFeetInches } from '@/utils/conversions';
import { useTheme } from '@/hooks/use-theme';

interface HeightConverterProps {
  feet: string;
  inches: string;
  centimeters: string;
  heightMode: 'imperial' | 'metric';
  onFeetChange: (value: string) => void;
  onInchesChange: (value: string) => void;
  onCentimetersChange: (value: string) => void;
  onModeToggle: () => void;
}

const HeightConverter: React.FC<HeightConverterProps> = ({
  feet,
  inches,
  centimeters,
  heightMode,
  onFeetChange,
  onInchesChange,
  onCentimetersChange,
  onModeToggle,
}) => {
  const { theme } = useTheme();
  const handleImperialChange = (feetValue: string, inchesValue: string) => {
    onFeetChange(feetValue);
    onInchesChange(inchesValue);
    
    const feetNum = parseFloat(feetValue) || 0;
    const inchesNum = parseFloat(inchesValue) || 0;
    
    if (feetNum > 0 || inchesNum > 0) {
      const cm = feetInchesToCm(feetNum, inchesNum);
      onCentimetersChange(cm.toFixed(1));
    }
  };

  const handleMetricChange = (cmValue: string) => {
    onCentimetersChange(cmValue);
    
    const cm = parseFloat(cmValue) || 0;
    if (cm > 0) {
      const { feet: feetNum, inches: inchesNum } = cmToFeetInches(cm);
      onFeetChange(feetNum.toString());
      onInchesChange(inchesNum.toString());
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Ruler className={`h-5 w-5 ${theme === 'dark' ? 'text-sky-400' : 'text-sky-600'}`} />
          <Label className={`text-lg font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>Height</Label>
        </div>
        <Button
          size="sm"
          onClick={onModeToggle}
          className="flex items-center gap-2 transition-colors"
        >
          {heightMode === 'imperial' ? (
            <>
              <ToggleLeft className="h-4 w-4" />
              <span className="text-sm">ft/in</span>
            </>
          ) : (
            <>
              <ToggleRight className="h-4 w-4" />
              <span className="text-sm">cm</span>
            </>
          )}
        </Button>
      </div>

      {heightMode === 'imperial' ? (
        <div className="flex gap-3">
          <div className="flex-1">
            <Label htmlFor="feet" className="mb-1 block">
              Feet
            </Label>
            <Input
              id="feet"
              type="number"
              value={feet}
              onChange={(e) => handleImperialChange(e.target.value, inches)}
              placeholder="5"
              min="2"
              max="9"
              className="text-center text-lg font-medium"
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="inches" className="mb-1 block">
              Inches
            </Label>
            <Input
              id="inches"
              type="number"
              value={inches}
              onChange={(e) => handleImperialChange(feet, e.target.value)}
              placeholder="10"
              min="0"
              max="11"
              step="0.1"
              className="text-center text-lg font-medium"
            />
          </div>
        </div>
      ) : (
        <div>
          <Label htmlFor="centimeters" className="mb-1 block">
            Centimeters
          </Label>
          <Input
            id="centimeters"
            type="number"
            value={centimeters}
            onChange={(e) => handleMetricChange(e.target.value)}
            placeholder="178"
            min="60"
            max="300"
            step="0.1"
            className="text-center text-lg font-medium"
          />
        </div>
      )}
    </Card>
  );
};

export default HeightConverter;