import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Activity, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { getBMICategory } from '@/utils/conversions';

interface BMIDisplayProps {
  bmi: number | null;
}

const BMIDisplay: React.FC<BMIDisplayProps> = ({ bmi }) => {
  if (!bmi) {
    return (
      <Card variant="bmi-empty" className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-slate-500" />
          <Label className="text-lg font-semibold text-slate-500">BMI Result</Label>
        </div>
        <div className="text-center py-8">
          <p className="text-slate-500">Enter your height and weight to calculate BMI</p>
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

  const getBadgeVariant = () => {
    switch (color) {
      case 'green':
        return 'default';
      case 'yellow':
        return 'secondary';
      case 'red':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getBadgeClassName = () => {
    switch (color) {
      case 'green':
        return 'bg-green-100 text-green-800 hover:bg-green-200 border border-green-200';
      case 'yellow':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border border-yellow-200';
      case 'red':
        return 'bg-red-100 text-red-800 hover:bg-red-200 border border-red-200';
      default:
        return '';
    }
  };

  return (
    <Card variant="bmi" className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="h-5 w-5 text-blue-600" />
        <Label className="text-lg font-semibold text-slate-700">BMI Result</Label>
      </div>
      
      <div className="text-center space-y-4">
        <div>
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {bmi.toFixed(1)}
          </div>
          <Badge 
            variant={getBadgeVariant()} 
            className={`${getBadgeClassName()} px-3 py-1 text-sm font-medium flex items-center gap-2 w-fit mx-auto`}
          >
            {getIcon()}
            {category}
          </Badge>
        </div>
        
        <div className="pt-4 border-t border-border/50">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <div className="font-medium text-slate-700">Normal Range</div>
              <div className="text-slate-500">18.5 - 24.9</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-slate-700">Your BMI</div>
              <div className={`font-semibold ${
                color === 'green' ? 'text-green-600' : 
                color === 'yellow' ? 'text-yellow-600' : 
                'text-red-600'
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