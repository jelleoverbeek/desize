export function modulate(
  value: number,
  rangeA: number[],
  rangeB: number[],
  limit: boolean
): number {
  const numberValue = Number(value);
  const fromLow: number = rangeA[0];
  const fromHigh: number = rangeA[1];
  const toLow: number = rangeB[0];
  const toHigh: number = rangeB[1];
  const result: number =
    toLow + ((numberValue - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow);

  if (limit === true) {
    if (toLow < toHigh) {
      if (result < toLow) {
        return toLow;
      }
      if (result > toHigh) {
        return toHigh;
      }
    } else {
      if (result > toLow) {
        return toLow;
      }
      if (result < toHigh) {
        return toHigh;
      }
    }
  }
  return result;
}

export default modulate;
