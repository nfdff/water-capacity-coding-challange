import React from 'react';
import styles from './CodeSection.module.scss';

interface TestResult {
  success: boolean;
  message: string;
  expected?: number;
  actual?: number;
}

interface CodeSectionProps {
  userCode: string;
  testResult: TestResult | null;
  onCodeChange: (code: string) => void;
  onCheck: () => void;
}

const CodeSection: React.FC<CodeSectionProps> = ({
  userCode,
  testResult,
  onCodeChange,
  onCheck,
}) => {
  return (
    <div className={styles.codeSection}>
      <h2>Your Solution</h2>
      <p className={styles.instructions}>
        Write a function called <code>calcWaterCapacity</code> that takes an array of numbers
        and returns the total water capacity.
      </p>
      <textarea
        className={styles.codeEditor}
        value={userCode}
        onChange={(e) => onCodeChange(e.target.value)}
        rows={15}
      />
      <button onClick={onCheck} className={styles.btnSuccess}>
        Check Solution
      </button>

      {testResult && (
        <div className={`${styles.testResult} ${testResult.success ? styles.success : styles.error}`}>
          <h3>{testResult.success ? '✓ Success' : '✗ Failed'}</h3>
          <p>{testResult.message}</p>
          {testResult.expected !== undefined && testResult.actual !== undefined && (
            <div className={styles.resultDetails}>
              <p>Expected: {testResult.expected}</p>
              <p>Your result: {testResult.actual}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeSection;
