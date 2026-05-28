const { add, sub, mul, div } = require('../calculator');

describe('calculator functions', () => {
  test('addition from image: 2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('subtraction from image: 10 - 4 = 6', () => {
    expect(sub(10, 4)).toBe(6);
  });

  test('multiplication from image: 45 * 2 = 90', () => {
    expect(mul(45, 2)).toBe(90);
  });

  test('division from image: 20 / 5 = 4', () => {
    expect(div(20, 5)).toBe(4);
  });

  // additional tests
  test('addition with negatives', () => {
    expect(add(-1, -1)).toBe(-2);
  });

  test('subtraction resulting negative', () => {
    expect(sub(3, 10)).toBe(-7);
  });

  test('multiplication by zero', () => {
    expect(mul(123, 0)).toBe(0);
  });

  test('division by non-integer result', () => {
    expect(div(7, 2)).toBeCloseTo(3.5);
  });

  test('division by zero throws', () => {
    expect(() => div(1, 0)).toThrow(/division by zero/i);
  });

  test('operates on floats', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.30000000000000004);
  });
});
