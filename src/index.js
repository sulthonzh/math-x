/**
 * math-x — Zero-dependency math utilities for JavaScript
 *
 * Clamping, interpolation, rounding, number theory, trigonometry,
 * Roman numerals, base conversion, statistics, and sequences.
 *
 * @module math-x
 * @license MIT
 */

// ═══════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════

export const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;
export const EULER_NUMBER = Math.E;
export const PI = Math.PI;
export const TWO_PI = Math.PI * 2;
export const HALF_PI = Math.PI / 2;
export const QUARTER_PI = Math.PI / 4;
export const SQRT2 = Math.SQRT2;
export const LN2 = Math.LN2;
export const LN10 = Math.LN10;

// ═══════════════════════════════════════════════════════════
// CLAMPING & INTERPOLATION
// ═══════════════════════════════════════════════════════════

/** Clamp n to [min, max] range. Swaps min/max if reversed. */
export function clamp(n, min, max) {
  if (min > max) [min, max] = [max, min];
  return Math.min(Math.max(n, min), max);
}

/** Clamp n to [0, 1] range. */
export function clamp01(n) {
  return Math.min(Math.max(n, 0), 1);
}

/** Linear interpolation: a + (b - a) * t. t may exceed [0,1]. */
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

/** Linear interpolation with t clamped to [0, 1]. */
export function lerpClamped(a, b, t) {
  return a + (b - a) * clamp01(t);
}

/** Inverse lerp: find t such that lerp(a, b, t) = value. */
export function inverseLerp(a, b, value) {
  if (a === b) return 0;
  return (value - a) / (b - a);
}

/** Re-map a value from one range to another (unclamped). */
export function map(value, inMin, inMax, outMin, outMax) {
  return lerp(outMin, outMax, inverseLerp(inMin, inMax, value));
}

/** Re-map with output clamped to [outMin, outMax]. */
export function mapClamped(value, inMin, inMax, outMin, outMax) {
  return lerpClamped(outMin, outMax, inverseLerp(inMin, inMax, value));
}

/** Wrap n into [min, max) range. */
export function wrap(n, min, max) {
  if (min === max) return min;
  const range = max - min;
  return min + ((n - min) % range + range) % range;
}

/** Normalize value from [min, max] to [0, 1]. */
export function normalize(value, min, max) {
  if (min === max) return 0;
  return (value - min) / (max - min);
}

// ═══════════════════════════════════════════════════════════
// ROUNDING
// ═══════════════════════════════════════════════════════════

/** Round to n decimal places. Handles floating-point edge cases. */
export function roundTo(n, decimals = 0) {
  const f = 10 ** decimals;
  return Math.round((n + Number.EPSILON) * f) / f;
}

/** Floor to nearest multiple of step. */
export function floorTo(n, step = 1) {
  return Math.floor(n / step) * step;
}

/** Ceil to nearest multiple of step. */
export function ceilTo(n, step = 1) {
  return Math.ceil(n / step) * step;
}

/** Truncate to n decimal places (toward zero). */
export function truncTo(n, decimals = 0) {
  const f = 10 ** decimals;
  return Math.trunc(n * f) / f;
}

/** Fractional part of n (always positive). fract(-1.5) = 0.5 */
export function fract(n) {
  return n - Math.floor(n);
}

// ═══════════════════════════════════════════════════════════
// MODULAR ARITHMETIC
// ═══════════════════════════════════════════════════════════

/** True modulo (always non-negative, unlike JS % operator). */
export function mod(n, m) {
  return ((n % m) + m) % m;
}

// ═══════════════════════════════════════════════════════════
// TRIGONOMETRY
// ═══════════════════════════════════════════════════════════

/** Degrees → radians. */
export function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

/** Radians → degrees. */
export function radToDeg(radians) {
  return radians * (180 / Math.PI);
}

/** Normalize angle to [-PI, PI). */
export function normalizeAngle(radians) {
  return mod(radians + Math.PI, TWO_PI) - Math.PI;
}

// ═══════════════════════════════════════════════════════════
// COMPARISON
// ═══════════════════════════════════════════════════════════

/** Check if two numbers are approximately equal within epsilon. */
export function approxEqual(a, b, epsilon = 1e-9) {
  return Math.abs(a - b) <= epsilon * Math.max(1, Math.abs(a), Math.abs(b));
}

/** Sign function: returns -1, 0, or 1. */
export function sign(n) {
  return n > 0 ? 1 : n < 0 ? -1 : 0;
}

/** Check if n is between min and max (inclusive by default). */
export function between(n, min, max, inclusive = true) {
  return inclusive ? n >= min && n <= max : n > min && n < max;
}

// ═══════════════════════════════════════════════════════════
// NUMBER THEORY
// ═══════════════════════════════════════════════════════════

/** Greatest common divisor (Euclidean algorithm). Always non-negative. */
export function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

/** Least common multiple. Returns 0 if either argument is 0. */
export function lcm(a, b) {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

/** Factorial of n (n!). Returns BigInt for exact results. */
export function factorial(n) {
  if (n < 0 || !Number.isInteger(n))
    throw new RangeError(`factorial requires non-negative integer, got ${n}`);
  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i++) result *= i;
  return result;
}

/** Primality test using trial division with 6k±1 optimization. */
export function isPrime(n) {
  if (n < 2) return false;
  if (n < 4) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

/** Sieve of Eratosthenes: all primes up to n (inclusive). */
export function primesUpTo(n) {
  if (n < 2) return [];
  const sieve = new Uint8Array(n + 1);
  const primes = [];
  for (let i = 2; i <= n; i++) {
    if (!sieve[i]) {
      primes.push(i);
      for (let j = i * i; j <= n; j += i) sieve[j] = 1;
    }
  }
  return primes;
}

/** Prime factorization. Returns array of [prime, exponent] pairs. */
export function primeFactors(n) {
  if (n < 2) return [];
  const factors = [];
  let d = 2;
  while (d * d <= n) {
    let exp = 0;
    while (n % d === 0) { n /= d; exp++; }
    if (exp > 0) factors.push([d, exp]);
    d++;
  }
  if (n > 1) factors.push([n, 1]);
  return factors;
}

/** Next prime strictly greater than n. */
export function nextPrime(n) {
  if (n < 2) return 2;
  let c = n + 1;
  while (!isPrime(c)) c++;
  return c;
}

/** Check if n is an exact power of two. */
export function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}

/** Smallest power of two >= n. */
export function nextPowerOfTwo(n) {
  if (n <= 1) return 1;
  return 2 ** Math.ceil(Math.log2(n));
}

/** Largest power of two <= n. Returns 0 for n < 1. */
export function previousPowerOfTwo(n) {
  if (n < 1) return 0;
  return 2 ** Math.floor(Math.log2(n));
}

/** nth Fibonacci number (0-indexed). Returns BigInt. fib(0)=0, fib(1)=1. */
export function fib(n) {
  if (n < 0 || !Number.isInteger(n))
    throw new RangeError(`fib requires non-negative integer, got ${n}`);
  let a = 0n, b = 1n;
  for (let i = 0; i < n; i++) [a, b] = [b, a + b];
  return a;
}

// ═══════════════════════════════════════════════════════════
// ROMAN NUMERALS
// ═══════════════════════════════════════════════════════════

const _ROMAN = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

/** Convert integer to Roman numeral string (1–3999). */
export function toRoman(num) {
  if (!Number.isInteger(num) || num < 1 || num > 3999)
    throw new RangeError(`toRoman requires integer 1–3999, got ${num}`);
  let result = '';
  for (const [v, s] of _ROMAN) {
    while (num >= v) { result += s; num -= v; }
  }
  return result;
}

/** Parse Roman numeral string to integer. */
export function fromRoman(str) {
  const v = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let result = 0;
  const s = String(str).toUpperCase();
  for (let i = 0; i < s.length; i++) {
    const cur = v[s[i]];
    if (!cur) throw new Error(`Invalid Roman numeral character: ${s[i]}`);
    const next = v[s[i + 1]];
    result += next && cur < next ? -cur : cur;
  }
  return result;
}

// ═══════════════════════════════════════════════════════════
// BASE CONVERSION
// ═══════════════════════════════════════════════════════════

const _DIGITS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

/** Convert integer to string representation in base 2–62. */
export function toBase(n, base) {
  if (!Number.isInteger(n) || !Number.isInteger(base) || base < 2 || base > 62)
    throw new RangeError(`toBase requires integer n and base 2–62`);
  if (n === 0) return '0';
  const neg = n < 0;
  n = Math.abs(n);
  let out = '';
  while (n > 0) { out = _DIGITS[n % base] + out; n = Math.floor(n / base); }
  return neg ? '-' + out : out;
}

/** Parse string in base 2–62 to integer. */
export function fromBase(str, base) {
  if (!Number.isInteger(base) || base < 2 || base > 62)
    throw new RangeError(`fromBase requires base 2–62`);
  const map = {};
  for (let i = 0; i < base; i++) map[_DIGITS[i]] = i;
  if (base <= 36) {
    for (let i = 0; i < base; i++) map[_DIGITS[i].toUpperCase()] = i;
  }
  str = String(str);
  const neg = str[0] === '-';
  if (neg) str = str.slice(1);
  let result = 0;
  for (const ch of str) {
    if (map[ch] === undefined)
      throw new Error(`Invalid character '${ch}' for base ${base}`);
    result = result * base + map[ch];
  }
  return neg ? -result : result;
}

// ═══════════════════════════════════════════════════════════
// STATISTICS (variadic)
// ═══════════════════════════════════════════════════════════

/** Sum of all arguments. */
export function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}

/** Arithmetic mean. */
export function average(...nums) {
  return nums.length ? sum(...nums) / nums.length : NaN;
}

/** Median value. */
export function median(...nums) {
  if (!nums.length) return NaN;
  const s = [...nums].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

/** Population variance. */
export function variance(...nums) {
  if (!nums.length) return NaN;
  const avg = average(...nums);
  return average(...nums.map(n => (n - avg) ** 2));
}

/** Population standard deviation. */
export function stdDev(...nums) {
  return Math.sqrt(variance(...nums));
}

// ═══════════════════════════════════════════════════════════
// RANGES & SEQUENCES
// ═══════════════════════════════════════════════════════════

/** Generate array [start, start+step, ...] up to (but not including) end. */
export function range(start, end, step = 1) {
  if (step === 0) throw new RangeError('step must not be 0');
  const result = [];
  if (step > 0) {
    for (let i = start; i < end; i += step) result.push(i);
  } else {
    for (let i = start; i > end; i += step) result.push(i);
  }
  return result;
}

/** First `count` terms of an arithmetic sequence. */
export function arithmeticSequence(start, d, count) {
  return Array.from({ length: count }, (_, i) => start + i * d);
}

/** First `count` terms of a geometric sequence. */
export function geometricSequence(start, r, count) {
  return Array.from({ length: count }, (_, i) => start * r ** i);
}

// ═══════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════

/** (part / total) * 100, rounded to `decimals` places. */
export function percentage(part, total, decimals = 0) {
  if (total === 0) return NaN;
  return roundTo((part / total) * 100, decimals);
}

/** Simplify ratio a:b to lowest terms. Returns [a, b]. */
export function ratio(a, b) {
  const g = gcd(a, b) || 1;
  return [a / g, b / g];
}

/** Check if n is even. */
export function isEven(n) { return n % 2 === 0; }

/** Check if n is odd. */
export function isOdd(n) { return n % 2 !== 0; }

// ═══════════════════════════════════════════════════════════
// DEFAULT EXPORT
// ═══════════════════════════════════════════════════════════

export default {
  GOLDEN_RATIO, EULER_NUMBER, PI, TWO_PI, HALF_PI, QUARTER_PI, SQRT2, LN2, LN10,
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
};
