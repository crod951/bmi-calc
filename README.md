# BMI Calculator

A small side project built for my wife to use in her job. This application provides a simple and intuitive interface for converting between height and weight units with automatic BMI calculation and health category insights.

## Features

- **Height Conversion**: Switch between imperial (feet/inches) and metric (centimeters) units
- **Weight Conversion**: Convert between pounds and kilograms
- **Automatic BMI Calculation**: Real-time BMI computation with health category classification
- **Responsive Design**: Clean, modern interface that works on all devices
- **Unit Toggle**: Easy switching between measurement systems

## Tech Stack

### Frontend Framework
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server

### UI & Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library built on Radix UI
- **Radix UI** - Accessible component primitives (used by shadcn/ui)
- **Lucide React** - Beautiful icon library
- **Class Variance Authority** - Component variant management

### Development Tools
- **ESLint** - Code quality and consistency
- **TypeScript ESLint** - TypeScript-specific linting rules
- **pnpm** - Fast, disk space efficient package manager

## Dependencies

### Core Dependencies
```json
{
  "@radix-ui/react-label": "^2.1.7",
  "@radix-ui/react-slot": "^1.2.3",
  "@tailwindcss/vite": "^4.1.12",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "lucide-react": "^0.542.0",
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "tailwind-merge": "^3.3.1",
  "tailwindcss": "^4.1.12"
}
```

### Development Dependencies
```json
{
  "@eslint/js": "^9.33.0",
  "@types/node": "^24.3.0",
  "@types/react": "^19.1.10",
  "@types/react-dom": "^19.1.7",
  "@vitejs/plugin-react": "^5.0.0",
  "eslint": "^9.33.0",
  "eslint-plugin-react-hooks": "^5.2.0",
  "eslint-plugin-react-refresh": "^0.4.20",
  "globals": "^16.3.0",
  "tw-animate-css": "^1.3.7",
  "typescript": "~5.8.3",
  "typescript-eslint": "^8.39.1",
  "vite": "^7.1.2"
}
```

## Project Setup

### Prerequisites
- **Node.js** (version 18 or higher)
- **pnpm** (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bmi-calc
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally
- `pnpm lint` - Run ESLint to check code quality

## Project Structure

```
src/
├── components/          # React components
│   ├── BMIDisplay.tsx  # BMI calculation display
│   ├── HeightConverter.tsx  # Height conversion component
│   ├── WeightConverter.tsx  # Weight conversion component
│   └── ui/             # Reusable UI components
├── utils/               # Utility functions
│   └── conversions.ts  # Conversion and BMI calculation logic
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Usage

1. **Enter Height**: Choose between imperial (feet/inches) or metric (centimeters)
2. **Enter Weight**: Input weight in pounds or kilograms
3. **View Results**: The application automatically calculates and displays your BMI
4. **Health Insights**: See which health category your BMI falls into
