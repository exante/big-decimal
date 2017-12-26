export function getFractionalLength(number: number | string) {
  /**
   * Match numbers like 1.123 and and 1e-7 and 1.5e-3 and 1.25e+10
   */
  const match = String(Number(number)).match(
    /(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/,
  );
  if (!match) {
    return 0;
  }

  const digitsAfterDot = match[1] ? match[1].length : 0;
  const powerOfTen = match[2] ? Number(match[2]) : 0;
  return Math.max(0, digitsAfterDot - powerOfTen);
}
