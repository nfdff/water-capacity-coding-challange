import React, { useEffect, useState } from 'react';
import styles from './ArrayVisualization.module.scss';

interface ArrayVisualizationProps {
  arr: number[];
  showWater: boolean;
}

const ArrayVisualization: React.FC<ArrayVisualizationProps> = ({ arr, showWater }) => {
  const [waterLevels, setWaterLevels] = useState<number[]>([]);
  const maxHeight = 7;
  const unitSize = 40; // pixels per unit

  useEffect(() => {
    if (showWater) {
      // Calculate water level for each position
      const levels = arr.map((height, index) => {
        let maxLeft = 0;
        let maxRight = 0;

        // Find max height to the left
        for (let i = 0; i < index; i++) {
          maxLeft = Math.max(maxLeft, arr[i]);
        }

        // Find max height to the right
        for (let i = index + 1; i < arr.length; i++) {
          maxRight = Math.max(maxRight, arr[i]);
        }

        // Water level is the minimum of max left and right, minus current height
        const waterLevel = Math.min(maxLeft, maxRight) - height;
        return waterLevel > 0 ? waterLevel : 0;
      });

      setWaterLevels(levels);
    } else {
      setWaterLevels([]);
    }
  }, [arr, showWater]);

  return (
    <div className={styles.visualizationContainer}>
      <div className={styles.columnsContainer} style={{ height: `${(maxHeight + 2) * unitSize}px` }}>
        {arr.map((height, index) => (
          <div key={index} className={styles.columnWrapper} style={{ width: `${unitSize}px` }}>
            {/* Water */}
            {showWater && waterLevels[index] > 0 && (
              <div
                className={styles.water}
                style={{
                  height: `${waterLevels[index] * unitSize}px`,
                  bottom: `${height * unitSize}px`,
                }}
              />
            )}
            {/* Column */}
            <div
              className={styles.column}
              style={{
                height: `${height * unitSize}px`,
              }}
            >
              <span className={styles.columnValue}>{height}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArrayVisualization;
