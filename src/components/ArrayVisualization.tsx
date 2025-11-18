import React, { useEffect, useState, useRef } from 'react';
import styles from './ArrayVisualization.module.scss';

interface ArrayVisualizationProps {
  arr: number[];
  showWater: boolean;
}

const ArrayVisualization: React.FC<ArrayVisualizationProps> = ({ arr, showWater }) => {
  const [waterLevels, setWaterLevels] = useState<number[]>([]);
  const [unitSize, setUnitSize] = useState(40);
  const containerRef = useRef<HTMLDivElement>(null);
  const maxHeight = 7;

  useEffect(() => {
    const calculateUnitSize = () => {
      if (arr.length > 0) {
        // Calculate based on viewport width since max-width is calc(100vw - 24px)
        const viewportWidth = window.innerWidth;
        const maxContainerWidth = Math.min(viewportWidth - 24, viewportWidth);

        const padding = 40; // Account for container padding (12px * 2 + 8px * 2)
        const availableWidth = maxContainerWidth - padding;
        const calculatedSize = Math.floor(availableWidth / arr.length);

        console.log({ viewportWidth, maxContainerWidth, availableWidth, calculatedSize, arrLength: arr.length });

        // Set min size to 20px for readability, max size to 40px
        const size = Math.max(20, Math.min(calculatedSize, 40));
        setUnitSize(size);
      }
    };

    // Use setTimeout to ensure DOM is ready
    setTimeout(calculateUnitSize, 0);
    window.addEventListener('resize', calculateUnitSize);
    return () => window.removeEventListener('resize', calculateUnitSize);
  }, [arr.length]);

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
    <div className={styles.visualizationContainer} ref={containerRef}>
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
