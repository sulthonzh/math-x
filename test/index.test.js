import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  clamp, clamp01, lerp, lerpClamped, inverseLerp, map, mapClamped, wrap, normalize,
  roundTo, floorTo, ceilTo, truncTo, fract, mod,
  degToRad, radToDeg, normalizeAngle,
  approxEqual, sign, between,
  gcd, lcm, factorial, isPrime, primesUpTo, primeFactors, nextPrime,
  isPowerOfTwo, nextPowerOfTwo, previousPowerOfTwo, fib,
  toRoman, fromRoman, toBase, fromBase,
  sum, average, median, variance, stdDev,
  range, arithmeticSequence, geometricSequence,
  percentage, ratio, isEven, isOdd,
  GOLDEN_RATIO,
} from '../src/index.js';

const approx = (a, b, eps = 1e-6) => assert.ok(Math.abs(a - b) < eps, `${a} !≈ ${b}`);

test('clamp restricts to range', () => {
  assert.equal(clamp(5, 0, 10), 5);
  assert.equal(clamp(-1, 0, 10), 0);
  assert.equal(clamp(15, 0, 10), 10);
  assert.equal(clamp(5, 10, 0), 5);
});
test('clamp01', () => {
  assert.equal(clamp01(0.5), 0.5);
  assert.equal(clamp01(-1), 0);
  assert.equal(clamp01(2), 1);
});
test('lerp', () => {
  assert.equal(lerp(0, 10, 0.5), 5);
  assert.equal(lerp(0, 10, 0), 0);
  assert.equal(lerp(0, 10, 1), 10);
  assert.equal(lerp(0, 10, 2), 20);
});
test('lerpClamped', () => {
  assert.equal(lerpClamped(0, 10, 2), 10);
  assert.equal(lerpClamped(0, 10, -1), 0);
});
test('inverseLerp', () => {
  assert.equal(inverseLerp(0, 10, 5), 0.5);
  assert.equal(inverseLerp(0, 10, 0), 0);
  assert.equal(inverseLerp(0, 10, 10), 1);
  assert.equal(inverseLerp(5, 5, 3), 0);
});
test('map', () => {
  assert.equal(map(0.5, 0, 1, 0, 100), 50);
  assert.equal(map(25, 0, 100, 0, 10), 2.5);
});
test('mapClamped', () => {
  assert.equal(mapClamped(2, 0, 1, 0, 100), 100);
  assert.equal(mapClamped(-1, 0, 1, 0, 100), 0);
});
test('wrap', () => {
  assert.equal(wrap(5, 0, 3), 2);
  assert.equal(wrap(-1, 0, 3), 2);
  assert.equal(wrap(3, 0, 3), 0);
});
test('normalize', () => {
  assert.equal(normalize(50, 0, 100), 0.5);
  assert.equal(normalize(0, 0, 100), 0);
  assert.equal(normalize(100, 0, 100), 1);
});
test('roundTo', () => {
  assert.equal(roundTo(3.14159, 2), 3.14);
  assert.equal(roundTo(3.14159, 0), 3);
  assert.equal(roundTo(1.005, 2), 1.01);
  assert.equal(roundTo(2.5, 0), 3);
});
test('floorTo', () => {
  assert.equal(floorTo(7.3, 2), 6);
  assert.equal(floorTo(7.3, 1), 7);
});
test('ceilTo', () => {
  assert.equal(ceilTo(7.3, 2), 8);
  assert.equal(ceilTo(7.3, 5), 10);
});
test('truncTo', () => {
  assert.equal(truncTo(3.99, 1), 3.9);
  assert.equal(truncTo(-3.99, 1), -3.9);
});
test('fract', () => {
  assert.equal(fract(1.5), 0.5);
  assert.equal(fract(-1.5), 0.5);
  assert.equal(fract(3), 0);
});
test('mod is always non-negative', () => {
  assert.equal(mod(-1, 5), 4);
  assert.equal(mod(7, 5), 2);
  assert.equal(mod(5, 5), 0);
});
test('degToRad', () => {
  approx(degToRad(180), Math.PI);
  approx(degToRad(90), Math.PI / 2);
});
test('radToDeg', () => {
  approx(radToDeg(Math.PI), 180);
  approx(radToDeg(Math.PI / 2), 90);
});
test('normalizeAngle', () => {
  approx(normalizeAngle(0), 0);
  assert.ok(normalizeAngle(Math.PI * 1.5) < 0);
});
test('approxEqual', () => {
  assert.ok(approxEqual(0.1 + 0.2, 0.3));
  assert.ok(!approxEqual(1, 2));
  assert.ok(approxEqual(1e10, 1e10 + 1));
});
test('sign', () => {
  assert.equal(sign(5), 1);
  assert.equal(sign(-5), -1);
  assert.equal(sign(0), 0);
});
test('between', () => {
  assert.ok(between(5, 1, 10));
  assert.ok(between(1, 1, 10));
  assert.ok(!between(1, 1, 10, false));
  assert.ok(!between(0, 1, 10));
});
test('gcd', () => {
  assert.equal(gcd(12, 8), 4);
  assert.equal(gcd(17, 5), 1);
  assert.equal(gcd(0, 5), 5);
  assert.equal(gcd(-12, 8), 4);
});
test('lcm', () => {
  assert.equal(lcm(4, 6), 12);
  assert.equal(lcm(3, 7), 21);
  assert.equal(lcm(0, 5), 0);
});
test('factorial', () => {
  assert.equal(factorial(0), 1n);
  assert.equal(factorial(5), 120n);
  assert.equal(factorial(20), 2432902008176640000n);
  assert.throws(() => factorial(-1), RangeError);
});
test('isPrime', () => {
  assert.ok(!isPrime(0));
  assert.ok(!isPrime(1));
  assert.ok(isPrime(2));
  assert.ok(isPrime(97));
  assert.ok(!isPrime(100));
  assert.ok(isPrime(7919));
});
test('primesUpTo', () => {
  assert.deepEqual(primesUpTo(1), []);
  assert.deepEqual(primesUpTo(10), [2, 3, 5, 7]);
  assert.deepEqual(primesUpTo(20), [2, 3, 5, 7, 11, 13, 17, 19]);
  assert.equal(primesUpTo(100).length, 25);
});
test('primeFactors', () => {
  assert.deepEqual(primeFactors(1), []);
  assert.deepEqual(primeFactors(12), [[2, 2], [3, 1]]);
  assert.deepEqual(primeFactors(17), [[17, 1]]);
  assert.deepEqual(primeFactors(360), [[2, 3], [3, 2], [5, 1]]);
});
test('nextPrime', () => {
  assert.equal(nextPrime(0), 2);
  assert.equal(nextPrime(2), 3);
  assert.equal(nextPrime(7), 11);
  assert.equal(nextPrime(100), 101);
});
test('isPowerOfTwo', () => {
  assert.ok(isPowerOfTwo(1));
  assert.ok(isPowerOfTwo(256));
  assert.ok(!isPowerOfTwo(3));
  assert.ok(!isPowerOfTwo(0));
});
test('nextPowerOfTwo', () => {
  assert.equal(nextPowerOfTwo(1), 1);
  assert.equal(nextPowerOfTwo(3), 4);
  assert.equal(nextPowerOfTwo(257), 512);
});
test('previousPowerOfTwo', () => {
  assert.equal(previousPowerOfTwo(1), 1);
  assert.equal(previousPowerOfTwo(7), 4);
  assert.equal(previousPowerOfTwo(256), 256);
});
test('fib', () => {
  assert.equal(fib(0), 0n);
  assert.equal(fib(1), 1n);
  assert.equal(fib(10), 55n);
  assert.equal(fib(50), 12586269025n);
  assert.throws(() => fib(-1), RangeError);
});
test('toRoman', () => {
  assert.equal(toRoman(1), 'I');
  assert.equal(toRoman(4), 'IV');
  assert.equal(toRoman(1994), 'MCMXCIV');
  assert.equal(toRoman(3999), 'MMMCMXCIX');
  assert.throws(() => toRoman(0), RangeError);
});
test('fromRoman', () => {
  assert.equal(fromRoman('I'), 1);
  assert.equal(fromRoman('MCMXCIV'), 1994);
  assert.equal(fromRoman('mmmcmxcix'), 3999);
});
test('toRoman/fromRoman round-trip', () => {
  for (const n of [1, 4, 9, 40, 49, 90, 400, 900, 1994, 2024, 3999])
    assert.equal(fromRoman(toRoman(n)), n);
});
test('toBase', () => {
  assert.equal(toBase(255, 16), 'ff');
  assert.equal(toBase(255, 2), '11111111');
  assert.equal(toBase(61, 62), 'Z');
  assert.equal(toBase(0, 16), '0');
});
test('fromBase', () => {
  assert.equal(fromBase('ff', 16), 255);
  assert.equal(fromBase('11111111', 2), 255);
  assert.equal(fromBase('z', 36), 35);
  assert.equal(fromBase('Z', 62), 61);
});
test('toBase/fromBase round-trip', () => {
  for (const n of [0, 1, 7, 15, 255, 1000, 999999])
    for (const b of [2, 8, 10, 16, 36, 62])
      assert.equal(fromBase(toBase(n, b), b), n, `n=${n} base=${b}`);
});
test('sum', () => { assert.equal(sum(1, 2, 3), 6); assert.equal(sum(), 0); });
test('average', () => { assert.equal(average(1, 2, 3, 4, 5), 3); });
test('median', () => { assert.equal(median(1, 2, 3), 2); assert.equal(median(1, 2, 3, 4), 2.5); });
test('variance', () => { approx(variance(2, 4, 4, 4, 5, 5, 7, 9), 4); });
test('stdDev', () => { approx(stdDev(2, 4, 4, 4, 5, 5, 7, 9), 2); });
test('range', () => {
  assert.deepEqual(range(0, 5), [0, 1, 2, 3, 4]);
  assert.deepEqual(range(0, 10, 2), [0, 2, 4, 6, 8]);
  assert.deepEqual(range(5, 0, -1), [5, 4, 3, 2, 1]);
  assert.throws(() => range(0, 5, 0), RangeError);
});
test('arithmeticSequence', () => {
  assert.deepEqual(arithmeticSequence(1, 2, 5), [1, 3, 5, 7, 9]);
});
test('geometricSequence', () => {
  assert.deepEqual(geometricSequence(1, 2, 5), [1, 2, 4, 8, 16]);
});
test('percentage', () => {
  assert.equal(percentage(25, 100), 25);
  assert.equal(percentage(1, 3, 2), 33.33);
});
test('ratio', () => {
  assert.deepEqual(ratio(6, 4), [3, 2]);
  assert.deepEqual(ratio(7, 3), [7, 3]);
});
test('isEven/isOdd', () => {
  assert.ok(isEven(4)); assert.ok(!isEven(3));
  assert.ok(isOdd(3)); assert.ok(!isOdd(4));
});
test('GOLDEN_RATIO', () => { approx(GOLDEN_RATIO, 1.618033988749895); });
