interface WaterItem {
  left?: number;
  right?: number;
  value?: number;
}

export const calcWaterCapacity = (arr: number[]): number =>
  arr
    .reduce<WaterItem[]>((acc, currLeft, i) => {
      const prevLeftBorder = acc[i - 1]?.left || currLeft;

      const j = arr.length - 1 - i;
      const currRight = arr[j];
      const nextRightBorder = acc[j + 1]?.right || currRight;

      acc[i] = {
        ...acc[i],
        left: Math.max(currLeft, prevLeftBorder),
        value: currLeft,
      };

      acc[j] = {
        ...acc[j],
        right: Math.max(currRight, nextRightBorder),
      };
      return acc;
    }, [])
    .reduce(
      (capacity, item) =>
        (capacity += Math.min(item.left!, item.right!) - item.value!),
      0
    );

export const generateRandomArray = (): number[] => {
  const length = Math.floor(Math.random() * 8) + 3; // 3 to 10
  return Array.from({ length }, () => Math.floor(Math.random() * 8)); // 0 to 7
};