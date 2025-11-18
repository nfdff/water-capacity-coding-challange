import React from 'react';
import styles from './ControlPanel.module.scss';

interface ControlPanelProps {
  arr: number[];
  correctAnswer: number;
  showWater: boolean;
  onRegenerate: () => void;
  onToggleWater: (show: boolean) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  arr,
  correctAnswer,
  showWater,
  onRegenerate,
  onToggleWater,
}) => {
  return (
    <div className={styles.controlPanel}>
      <button onClick={onRegenerate} className={`${styles.btn} ${styles.btnPrimary}`}>
        Regenerate Array
      </button>
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={showWater}
          onChange={(e) => onToggleWater(e.target.checked)}
        />
        Show Water
      </label>
      <div className={styles.arrayDisplay}>
        <strong>Array:</strong> [{arr.join(', ')}]
      </div>
      <div className={styles.capacityDisplay}>
        <strong>Water Capacity:</strong> <span className={styles.capacityValue}>{correctAnswer} units</span>
      </div>
    </div>
  );
};

export default ControlPanel;
