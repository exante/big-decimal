import * as test from 'tape';
import { getFractionalLength } from '../src/getFractionalLength';

test('getFractionalLength', assert => {
  assert.equals(getFractionalLength(1.1), 1, '1.1 has 1 decimal digit');
  assert.equals(
    getFractionalLength(1.123),
    3,
    '1.123 has three decimal digits',
  );
  assert.equals(getFractionalLength(1), 0, '1 has no decimal digits');
  assert.equals(getFractionalLength('1.0'), 0, '1.0 has no decimal digits');
  assert.equals(getFractionalLength(5e-7), 7, '5e-7 has 7 decimal digits');
  assert.equals(
    getFractionalLength(5.12e-7),
    9,
    '5.12e-7 has 9 decimal digits',
  );
  assert.equals(
    getFractionalLength(5.12345e4),
    1,
    '5.12345e+4 has 1 decimal digits',
  );
  assert.equals(
    getFractionalLength(5.12345e9),
    0,
    '5.12345e+9 has no decimal digits',
  );
  assert.equals(getFractionalLength(5e-49), 49, '5e-49 has 49 decimal digits');
  assert.equals(
    getFractionalLength('103.350'),
    2,
    '103.350, traling zero is ignored',
  );
  assert.equals(
    getFractionalLength('-00001.1000'),
    1,
    "'-00001.1000' 1 decimal digit",
  );

  assert.end();
});
