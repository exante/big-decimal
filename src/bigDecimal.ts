import { getFractionalLength } from './getFractionalLength';

export type BigDecimal = {
  value: number;
  scale: number;
};

function isNumericValue(n: any): n is number {
  return !isNaN(Number(n) - parseFloat(n));
}

export function fromBigDec(bigDec: BigDecimal) {
  const { scale, value } = bigDec;
  if (!isNumericValue(scale) || !isNumericValue(value)) {
    throw new Error(
      'fromBigDec: both scale and value must be numeric. ' +
      `Instead, ${scale} and ${value} were passed`,
    );
  }
  const floatVal = value * 10 ** (-1 * scale);
  return Number(floatVal.toFixed(Math.abs(scale)));
}

export function toBigDec(numberRaw: number | string): BigDecimal {
  if (!isNumericValue(numberRaw)) {
    throw new Error(`Bad value passed to toBigDec: ${numberRaw}`);
  }

  const number = Number(numberRaw);

  const scale = getFractionalLength(numberRaw);
  let value;
  if (scale > 0) {
    const withoutSymbols = String(number)
      .split(/[eE]/)[0]
      .replace('.', '');
    value = parseInt(withoutSymbols, 10);
  } else {
    value = number;
  }
  return {
    value,
    scale,
  };
}
