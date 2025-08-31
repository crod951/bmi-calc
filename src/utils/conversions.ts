// Height conversions
export const feetInchesToCm = (feet: number, inches: number): number => {
  return (feet * 12 + inches) * 2.54;
};

export const cmToFeetInches = (cm: number): { feet: number; inches: number } => {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round((totalInches % 12) * 10) / 10;
  return { feet, inches };
};

// Weight conversions
export const kgToLbs = (kg: number): number => {
  return kg * 2.20462;
};

export const lbsToKg = (lbs: number): number => {
  return lbs / 2.20462;
};

// BMI calculation
export const calculateBMI = (weightKg: number, heightCm: number): number => {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
};

export const getBMICategory = (bmi: number): { category: string; color: string } => {
  if (bmi < 18.5) {
    return { category: "Underweight", color: "yellow" };
  } else if (bmi >= 18.5 && bmi < 25) {
    return { category: "Normal weight", color: "green" };
  } else if (bmi >= 25 && bmi < 30) {
    return { category: "Overweight", color: "yellow" };
  } else {
    return { category: "Obese", color: "red" };
  }
};

// Input validation
export const isValidHeight = (feet?: number, inches?: number, cm?: number): boolean => {
  if (cm !== undefined) {
    return cm >= 60 && cm <= 300;
  }
  if (feet !== undefined && inches !== undefined) {
    return feet >= 2 && feet <= 9 && inches >= 0 && inches < 12;
  }
  return false;
};

export const isValidWeight = (weight: number): boolean => {
  return weight >= 30 && weight <= 300;
};