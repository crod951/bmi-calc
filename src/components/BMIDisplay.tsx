import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Activity, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { getBMICategory } from '@/utils/conversions';
import { useTheme } from '@/hooks/use-theme';

interface BMIDisplayProps {
  bmi: number | null;
}

const BMIDisplay: React.FC<BMIDisplayProps> = ({ bmi }) => {
  const { theme } = useTheme();
  if (!bmi) {
    return (
      <Card variant="bmi-empty" className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className={`h-5 w-5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`} />
          <Label className={`text-lg font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>BMI Result</Label>
        </div>
        <div className="text-center py-8">
          <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Enter your height and weight to calculate BMI</p>
        </div>
      </Card>
    );
  }

  const { category, color } = getBMICategory(bmi);
  
  const getIcon = () => {
    switch (color) {
      case 'green':
        return <Minus className="h-4 w-4" />;
      case 'yellow':
        return bmi < 18.5 ? <TrendingDown className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />;
      case 'red':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };



  return (
    <Card variant="bmi" className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity className={`h-5 w-5 ${theme === 'dark' ? 'text-sky-400' : 'text-sky-600'}`} />
        <Label className={`text-lg font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>BMI Result</Label>
      </div>
      
      <div className="text-center space-y-4">
        <div>
          <div className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-sky-400' : 'text-sky-600'}`}>
            {bmi.toFixed(1)}
          </div>
          <Badge 
            variant={color as 'green' | 'yellow' | 'red' | 'default'} 
            className="px-3 py-1 text-sm font-medium flex items-center gap-2 w-fit mx-auto"
          >
            {getIcon()}
            {category}
          </Badge>
        </div>
        
        <div className={`pt-4 border-t ${theme === 'dark' ? 'border-slate-600' : 'border-slate-200'}`}>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <div className={`font-medium ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>Normal Range</div>
              <div className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>18.5 - 24.9</div>
            </div>
            <div className="text-center">
              <div className={`font-medium ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>Your BMI</div>
              <div className={`font-semibold ${
                color === 'green' ? (theme === 'dark' ? 'text-green-400' : 'text-green-600') : 
                color === 'yellow' ? (theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600') : 
                (theme === 'dark' ? 'text-red-400' : 'text-red-600')
              }`}>
                {bmi.toFixed(1)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BMIDisplay;