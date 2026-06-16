# math-x

> Zero-dependency math utilities for JavaScript — **55+ functions** across clamping, interpolation, number theory, Roman numerals, base conversion, statistics, and more.

## Why?

JavaScript's `Math` object covers the basics (`floor`, `ceil`, `round`, `abs`, `max`, `min`). But real applications need more: clamping values to ranges, smoothly interpolating between numbers, checking if a number is prime, converting to Roman numerals, or computing statistics. That's what `math-x` provides — all with **zero dependencies** and a clean, tree-shakeable API.

## Install

```bash
npm install math-x
```

## Quick Start

```javascript
import { clamp, lerp, map, isPrime, toRoman, fib } from 'math-x';

clamp(15, 0, 10);   // 10
lerp(0, 100, 0.5);   // 50
map(0.5, 0, 1, 0, 255); // 127.5
isPrime(97);         // true
toRoman(2024);       // 'MMXXIV'
fib(20);             // 6765n (BigInt)
```

## API

### Clamping & Interpolation

| Function | Description |
|----------|-------------|
| `clamp(n, min, max)` | Restrict `n` to `[min, max]` |
| `clamp01(n)` | Restrict `n` to `[0, 1]` |
| `lerp(a, b, t)` | Linear interpolation (t can exceed [0,1]) |
| `lerpClamped(a, b, t)` | Linear interpolation with t clamped to [0,1] |
| `inverseLerp(a, b, value)` | Find t such that `lerp(a,b,t) = value` |
| `map(value, inMin, inMax, outMin, outMax)` | Remap from one range to another |
| `mapClamped(value, inMin, inMax, outMin, outMax)` | Remap with clamped output |
| `wrap(n, min, max)` | Wrap `n` into `[min, max)` range |
| `normalize(value, min, max)` | Map `[min, max]` → `[0, 1]` |

### Rounding

| Function | Description |
|----------|-------------|
| `roundTo(n, decimals)` | Round to N decimal places (floating-point safe) |
| `floorTo(n, step)` | Floor to nearest multiple of `step` |
| `ceilTo(n, step)` | Ceil to nearest multiple of `step` |
| `truncTo(n, decimals)` | Truncate to N decimal places |
| `fract(n)` | Fractional part (always positive) |

### Modular Arithmetic

| Function | Description |
|----------|-------------|
| `mod(n, m)` | True modulo (always non-negative, unlike JS `%`) |

### Trigonometry

| Function | Description |
|----------|-------------|
| `degToRad(deg)` | Degrees → radians |
| `radToDeg(rad)` | Radians → degrees |
| `normalizeAngle(rad)` | Normalize to `[-PI, PI)` |

### Comparison

| Function | Description |
|----------|-------------|
| `approxEqual(a, b, epsilon?)` | Check near-equality (default ε=1e-9) |
| `sign(n)` | Returns `-1`, `0`, or `1` |
| `between(n, min, max, inclusive?)` | Range check |

### Number Theory

| Function | Description |
|----------|-------------|
| `gcd(a, b)` | Greatest common divisor |
| `lcm(a, b)` | Least common multiple |
| `factorial(n)` | n! as BigInt (exact for all n) |
| `isPrime(n)` | Primality test (6k±1 optimization) |
| `primesUpTo(n)` | Sieve of Eratosthenes |
| `primeFactors(n)` | Returns `[[prime, exponent], ...]` |
| `nextPrime(n)` | First prime > n |
| `isPowerOfTwo(n)` | Power-of-two check |
| `nextPowerOfTwo(n)` | Smallest power of 2 ≥ n |
| `previousPowerOfTwo(n)` | Largest power of 2 ≤ n |
| `fib(n)` | nth Fibonacci (BigInt, 0-indexed) |

### Roman Numerals

| Function | Description |
|----------|-------------|
| `toRoman(num)` | Integer → Roman numeral (1–3999) |
| `fromRoman(str)` | Roman numeral → integer |

### Base Conversion

| Function | Description |
|----------|-------------|
| `toBase(n, base)` | Integer → base 2–62 string |
| `fromBase(str, base)` | Base 2–62 string → integer |

### Statistics (variadic)

| Function | Description |
|----------|-------------|
| `sum(...nums)` | Sum |
| `average(...nums)` | Arithmetic mean |
| `median(...nums)` | Middle value |
| `variance(...nums)` | Population variance |
| `stdDev(...nums)` | Population standard deviation |

### Sequences

| Function | Description |
|----------|-------------|
| `range(start, end, step?)` | Generate `[start, end)` array |
| `arithmeticSequence(start, d, count)` | First `count` terms |
| `geometricSequence(start, r, count)` | First `count` terms |

### Utilities

| Function | Description |
|----------|-------------|
| `percentage(part, total, decimals?)` | `(part/total) × 100` |
| `ratio(a, b)` | Simplified `[a, b]` ratio |
| `isEven(n)` / `isOdd(n)` | Parity checks |

## CLI

```bash
npx math-x prime 97          # prime
npx math-x primes 30         # [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
npx math-x fib 20            # 6765
npx math-x factorial 10      # 3628800
npx math-x roman 2024        # MMXXIV
npx math-x base 255 16       # ff
npx math-x stats 1 2 3 4 5   # {count:5, sum:15, avg:3, ...}
npx math-x demo              # Show all features
```

## Constants

`GOLDEN_RATIO`, `EULER_NUMBER`, `PI`, `TWO_PI`, `HALF_PI`, `QUARTER_PI`, `SQRT2`, `LN2`, `LN10`

## License

MIT © [sulthonzh](https://github.com/sulthonzh)
