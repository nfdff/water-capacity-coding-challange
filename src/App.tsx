import { useState } from 'react';
import styles from './App.module.scss';
import ArrayVisualization from './components/ArrayVisualization';
import ControlPanel from './components/ControlPanel';
import CodeSection from './components/CodeSection';
import { calcWaterCapacity, generateRandomArray } from './utils/waterCapacity';

interface TestResult {
  success: boolean;
  message: string;
  expected?: number;
  actual?: number;
}

function App() {
  const [arr, setArr] = useState<number[]>(generateRandomArray());
  const [userCode, setUserCode] = useState<string>(`const calcWaterCapacity = (arr) => {
  // Your code here
  return 0;
}`);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [showWater, setShowWater] = useState<boolean>(true);

  const correctAnswer = calcWaterCapacity(arr);

  const handleRegenerate = () => {
    setArr(generateRandomArray());
    setTestResult(null);
  };

  const handleCheck = () => {
    try {
      // Create a safe function from user code
      // eslint-disable-next-line no-new-func
      const userFunction = new Function('arr', `
        ${userCode}

        // Try to find and call the function
        if (typeof calcWaterCapacity !== 'undefined') {
          return calcWaterCapacity(arr);
        }

        // If no function is defined, try to evaluate the code directly
        return eval(userCode);
      `);

      const userResult = userFunction(arr);

      if (typeof userResult !== 'number') {
        setTestResult({
          success: false,
          message: 'Your code must return a number',
        });
        return;
      }

      if (userResult === correctAnswer) {
        setTestResult({
          success: true,
          message: 'Correct! Your solution works perfectly!',
          expected: correctAnswer,
          actual: userResult,
        });
      } else {
        setTestResult({
          success: false,
          message: 'Incorrect result. Try again!',
          expected: correctAnswer,
          actual: userResult,
        });
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  };

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <h1>Water Capacity Coding Challenge</h1>
        <p className={styles.subtitle}>Calculate how much water can be trapped between the columns</p>
      </header>

      <div className={styles.mainContent}>
        <div className={styles.leftSection}>
          <ControlPanel
            arr={arr}
            correctAnswer={correctAnswer}
            showWater={showWater}
            onRegenerate={handleRegenerate}
            onToggleWater={setShowWater}
          />
          <ArrayVisualization arr={arr} showWater={showWater} />
        </div>

        <div className={styles.rightSection}>
          <CodeSection
            userCode={userCode}
            testResult={testResult}
            onCodeChange={setUserCode}
            onCheck={handleCheck}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
