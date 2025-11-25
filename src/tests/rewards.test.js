import { pointsForAmount } from '../utils/rewards';
describe('pointsForAmount', () => {
  test('100 -> 50 points', () => { expect(pointsForAmount(100)).toBe(50); });
  test('120 -> 90 points', () => { expect(pointsForAmount(120)).toBe(90); });
  test('150.75 -> 150 points', () => { expect(pointsForAmount(150.75)).toBe(150); });
  test('49.99 -> 0 points', () => { expect(pointsForAmount(49.99)).toBe(0); });
  test('50 -> 0 points', () => { expect(pointsForAmount(50)).toBe(0); });
  test('invalid inputs -> 0', () => {
    expect(pointsForAmount(-10)).toBe(0);
    expect(pointsForAmount(NaN)).toBe(0);
    expect(pointsForAmount('abc')).toBe(0);
  });
});
