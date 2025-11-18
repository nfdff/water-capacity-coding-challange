# Water Capacity Coding Challenge

An interactive React TypeScript application for conducting coding interviews with a visual water capacity problem.

## Features

- **Random Array Generation**: Generate random arrays with values 0-10 and lengths 3-10
- **Visual Representation**: Each array value is displayed as a column with proportional height
- **Animated Water Display**: Toggle water visualization with smooth animations
- **Code Editor**: Integrated text area for candidates to write their solutions
- **Real-time Validation**: Execute and validate candidate code against the correct answer
- **Instant Feedback**: Clear success/error messages with expected vs actual results

## The Challenge

Given an array of non-negative integers representing column heights, calculate how much water can be trapped between the columns after it rains. Water is trapped between higher columns like in real physics.

### Example
```
Array: [3, 0, 2, 0, 4]
Water Capacity: 7 units

Visual:
    ██
    ██
██≈≈██
██≈≈██
██≈≈██
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. Navigate to the project directory:
```bash
cd water-capacity-interview
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to the URL shown in the terminal (typically `http://localhost:5173`)

## Usage

### For Interviewers

1. Click "Regenerate Array" to create a new random test case
2. Use "Show Water" checkbox to toggle water visualization
3. Observe the candidate as they write their solution
4. Click "Check Solution" to validate the candidate's code

### For Candidates

1. Write a function called `calcWaterCapacity` that:
   - Takes an array of numbers as input
   - Returns the total water capacity as a number
2. Click "Check Solution" to test your code
3. Review the feedback and iterate if needed

### Example Solution

```javascript
const calcWaterCapacity = (arr) => {
  let totalWater = 0;

  for (let i = 0; i < arr.length; i++) {
    let maxLeft = 0;
    let maxRight = 0;

    // Find max height to the left
    for (let j = 0; j < i; j++) {
      maxLeft = Math.max(maxLeft, arr[j]);
    }

    // Find max height to the right
    for (let j = i + 1; j < arr.length; j++) {
      maxRight = Math.max(maxRight, arr[j]);
    }

    // Calculate water at current position
    const waterLevel = Math.min(maxLeft, maxRight) - arr[i];
    if (waterLevel > 0) {
      totalWater += waterLevel;
    }
  }

  return totalWater;
};
```

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## Technologies Used

- React 18
- TypeScript
- Vite
- CSS3 with animations

## Project Structure

```
water-capacity-interview/
├── src/
│   ├── components/
│   │   ├── ArrayVisualization.tsx    # Visual column display
│   │   └── ArrayVisualization.css    # Animation styles
│   ├── utils/
│   │   └── waterCapacity.ts          # Core logic
│   ├── App.tsx                       # Main application
│   ├── App.css                       # Application styles
│   └── index.css                     # Global styles
├── package.json
└── README.md
```

## License

MIT
