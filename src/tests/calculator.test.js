const { add, sub, mul, div, mod, power, squareRoot } = require('../calculator');

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

  // New tests for extended operations
  test('modulo: 5 % 2 = 1', () => {
    expect(mod(5, 2)).toBe(1);
  });

  test('modulo with negative dividend: -5 % 2', () => {
    expect(mod(-5, 2)).toBe(-1);
  });

  test('modulo by zero throws', () => {
    expect(() => mod(1, 0)).toThrow(/zero/i);
  });

  test('power: 2 ^ 3 = 8', () => {
    expect(power(2, 3)).toBe(8);
  });

  test('power with zero exponent: 5 ^ 0 = 1', () => {
    expect(power(5, 0)).toBe(1);
  });

  test('square root: sqrt(16) = 4', () => {
    expect(squareRoot(16)).toBe(4);
  });

  test('square root of non-perfect square', () => {
    expect(squareRoot(2)).toBeCloseTo(Math.sqrt(2));
  });

  test('square root negative throws', () => {
    expect(() => squareRoot(-9)).toThrow(/negative/i);
  });
});
