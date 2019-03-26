import * as test from 'tape';
import { toBigDec, fromBigDec } from '../src/bigDecimal';

test('toBigDec', assert => {
  assert.deepEquals(toBigDec(1.1), { value: 11, scale: 1 }, '1.1');
  assert.deepEquals(toBigDec(1), { value: 1, scale: 0 }, '1');
  assert.deepEquals(toBigDec(300), { value: 300, scale: 0 }, '300');
  assert.deepEquals(toBigDec(-300), { value: -300, scale: 0 }, '-300');
  assert.deepEquals(toBigDec(4e3), { value: 4000, scale: 0 }, '4e3');
  assert.deepEquals(toBigDec(4e-3), { value: 4, scale: 3 }, '4e-3');
  assert.deepEquals(toBigDec(4e-8), { value: 4, scale: 8 }, '4e-8');
  assert.deepEquals(toBigDec(4.3e-8), { value: 43, scale: 9 }, '4.3e-8');
  assert.deepEquals(toBigDec(4.3e29), { value: 4.3e29, scale: 0 }, '4.3e29');

  assert.deepEquals(toBigDec(-355.66), { scale: 2, value: -35566 }, '-355.66');
  assert.deepEquals(toBigDec(4856.2), { scale: 1, value: 48562 }, '4856.20');
  assert.deepEquals(toBigDec(9.876), { scale: 3, value: 9876 }, '9.876');
  assert.deepEquals(toBigDec(0.1111), { scale: 4, value: 1111 }, '0.1111');
  assert.deepEquals(toBigDec('103.350'), { scale: 2, value: 10335 }, '103.350');
  assert.deepEquals(
    toBigDec('-00001.1000'),
    { scale: 1, value: -11 },
    '-00001.1000'
  );

  // failing tests
  assert.throws(
    () => toBigDec({} as any),
    /Bad value passed to toBigDec: \[object Object\]/,
    'Throws if an object is passsed'
  );
  assert.throws(
    () => toBigDec([] as any),
    /Bad value passed to toBigDec:/,
    'Throws if an array is passed'
  );
  assert.throws(
    () => toBigDec('123qweasd'),
    /Bad value passed to toBigDec:/,
    'Throws if an arbitrary string is passed'
  );
  assert.throws(
    () => toBigDec(NaN),
    /Bad value passed to toBigDec:/,
    'Throws if NaN is passed'
  );

  assert.end();
});

test('fromBigDec', assert => {
  assert.equals(
    fromBigDec({ scale: 2, value: -35566 }),
    -355.66,
    '{ scale: 2, value: -35566 }'
  );
  assert.equals(
    fromBigDec({ scale: '2', value: '-35566' } as any),
    -355.66,
    "{ scale: '2', value: '-35566' }"
  );
  assert.equals(
    fromBigDec({ scale: 2, value: 485620 }),
    4856.2,
    '{ scale: 2, value: 485620 }'
  );
  assert.equals(
    fromBigDec({ scale: 3, value: 9876 }),
    9.876,
    '{ scale: 3, value: 9876 }'
  );
  assert.equals(
    fromBigDec({ scale: 4, value: 1111 }),
    0.1111,
    '{ scale: 4, value: 1111 }'
  );

  assert.equals(
    fromBigDec({ scale: 0, value: 132435 }),
    132435,
    '{ scale: 0, value: 132435 }'
  );

  assert.equals(
    fromBigDec({ scale: -10, value: 132435 }),
    1324350000000000,
    '{ scale: -10, value: 132435 }'
  );

  assert.equals(
    fromBigDec({ scale: 100, value: 132435 }),
    1.32435e-95,
    '{ scale: 100, value: 132435 }'
  );

  assert.equals(
    fromBigDec({ scale: 101, value: 132435 }),
    1.32435e-95,
    '{ scale: 101, value: 132435 }'
  );

  assert.equals(
    fromBigDec({ scale: -1, value: 2 }),
    20,
    '{ scale: -1, value: 2 }'
  );

  // failing tests
  assert.throws(
    () => fromBigDec({ scale: 2, value: '-35.56.6' } as any),
    /fromBigDec: both scale and value must be numeric/,
    'Should throw for non-numeric values'
  );

  assert.end();
});
