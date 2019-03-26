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
        `Instead, ${scale} and ${value} were passed`
    );
  }

  /*
    if scale is less than 0 or greater than 100, we get an exception at toFixed method call.
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed#Exceptions
  */
  let allowedScale = scale;

  if (allowedScale < -100) {
    allowedScale = -100;
  } else if (allowedScale > 100) {
    allowedScale = 100;
  }

  const floatVal = value * 10 ** (-1 * allowedScale);
  return Number(floatVal.toFixed(Math.abs(allowedScale)));
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
    scale
  };
}
