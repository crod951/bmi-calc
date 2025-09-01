import { useState, useEffect } from 'react';
import { Calculator, Heart } from 'lucide-react';
import HeightConverter from '@/components/HeightConverter';
import WeightConverter from '@/components/WeightConverter';
import BMIDisplay from '@/components/BMIDisplay';
import { calculateBMI, isValidHeight, isValidWeight } from '@/utils/conversions';
import { useTheme } from '@/hooks/use-theme';
import { ModeToggle } from '@/components/mode-toggle';

interface AppState {
  feet: string;
  inches: string;
  centimeters: string;
  heightMode: 'imperial' | 'metric';
  
  kilograms: string;
  pounds: string;
  weightMode: 'metric' | 'imperial';
  
  bmi: number | null;
}

const App = () => {
  const { theme } = useTheme();
  const [state, setState] = useState<AppState>({
    feet: '',
    inches: '',
    centimeters: '',
    heightMode: 'imperial',
    kilograms: '',
    pounds: '',
    weightMode: 'metric',
    bmi: null,
  });
  
  const [calculatorClicks, setCalculatorClicks] = useState(0);
  const [showAvaImage, setShowAvaImage] = useState(false);

  useEffect(() => {
    const heightCm = parseFloat(state.centimeters);
    const weightKg = parseFloat(state.kilograms);

    if (heightCm && weightKg && 
        isValidHeight(undefined, undefined, heightCm) && 
        isValidWeight(weightKg)) {
      const bmi = calculateBMI(weightKg, heightCm);
      setState(prev => ({ ...prev, bmi }));
    } else {
      setState(prev => ({ ...prev, bmi: null }));
    }
  }, [state.centimeters, state.kilograms]);

  const handleHeightModeToggle = () => {
    setState(prev => ({
      ...prev,
      heightMode: prev.heightMode === 'imperial' ? 'metric' : 'imperial'
    }));
  };

  const handleWeightModeToggle = () => {
    setState(prev => ({
      ...prev,
      weightMode: prev.weightMode === 'metric' ? 'imperial' : 'metric'
    }));
  };

  const handleCalculatorClick = () => {
    const newClickCount = calculatorClicks + 1;
    setCalculatorClicks(newClickCount);
    
    if (newClickCount >= 3) {
      setShowAvaImage(true);
      setCalculatorClicks(0);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50/30'
    }`}>
      <header className="pt-4 pb-4 md:pt-8 md:pb-6 relative">
        <div className="container mx-auto px-4">
          <div className="absolute top-6 right-4 md:top-12 md:right-8 z-10">
            <ModeToggle />
          </div>

          <div className="text-center mb-4 md:mb-8">
            {!showAvaImage ? (
              <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-6 flex-col sm:flex-row">
                <div 
                  className="p-2 md:p-3 bg-gradient-to-br from-teal-200 to-sky-700 rounded-2xl shadow-lg ring-1 ring-blue-500/20 cursor-pointer hover:scale-105 transition-transform duration-200"
                  onClick={handleCalculatorClick}
                >
                  <Calculator className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold transition-colors duration-200 ${
                  theme === 'dark' ? 'text-sky-400' : 'text-sky-600'
                }`}>
                  Health Calculator
                </h1>
                <p className={`text-base md:text-lg transition-colors duration-200 max-w-2xl mx-auto leading-relaxed ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-500'
                }`}>
                  Convert between height and weight units with automatic BMI calculation. 
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center mb-3 md:mb-6">
                <img 
                  src="/ava.jpg" 
                  alt="Our dog Ava" 
                  className="h-32 w-32 md:h-40 md:w-40 rounded-full object-cover shadow-lg animate-wiggle"
                />
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-6 md:pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-3 md:gap-6 mb-4 md:mb-8">
            <HeightConverter
              feet={state.feet}
              inches={state.inches}
              centimeters={state.centimeters}
              heightMode={state.heightMode}
              onFeetChange={(value) => setState(prev => ({ ...prev, feet: value }))}
              onInchesChange={(value) => setState(prev => ({ ...prev, inches: value }))}
              onCentimetersChange={(value) => setState(prev => ({ ...prev, centimeters: value }))}
              onModeToggle={handleHeightModeToggle}
            />

            <WeightConverter
              kilograms={state.kilograms}
              pounds={state.pounds}
              weightMode={state.weightMode}
              onKilogramsChange={(value) => setState(prev => ({ ...prev, kilograms: value }))}
              onPoundsChange={(value) => setState(prev => ({ ...prev, pounds: value }))}
              onModeToggle={handleWeightModeToggle}
            />
          </div>

          <div className="max-w-md mx-auto">
            <BMIDisplay bmi={state.bmi} />
          </div>

          <footer className="mt-6 md:mt-12 text-center">
            <div className={`inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm border transition-colors duration-200 ${
              theme === 'dark' 
                ? 'bg-slate-800/80 text-slate-300 border-slate-600/50' 
                : 'bg-slate-100/80 text-slate-600 border-slate-200/50'
            }`}>
              <Heart className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
              <span>BMI is a general indicator. Consult healthcare professionals for medical advice.</span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default App;
