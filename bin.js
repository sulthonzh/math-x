#!/usr/bin/env node
import {
  clamp, clamp01, lerp, inverseLerp, map, wrap, roundTo, floorTo, ceilTo, fract,
  mod, degToRad, radToDeg, approxEqual, gcd, lcm, factorial, isPrime,
  primesUpTo, primeFactors, nextPrime, isPowerOfTwo, nextPowerOfTwo, fib,
  toRoman, fromRoman, toBase, fromBase, sum, average, median, variance, stdDev,
  range, percentage, GOLDEN_RATIO,
} from './src/index.js';

const [cmd, ...args] = process.argv.slice(2);

function showHelp() {
  console.log(`
  math-x — Zero-dependency math utilities

  Usage:
    math-x demo              Show examples of all functions
    math-x prime <n>         Check if n is prime
    math-x primes <n>        List all primes up to n
    math-x factors <n>       Prime factorization of n
    math-x fib <n>           Nth Fibonacci number
    math-x factorial <n>     N factorial (BigInt)
    math-x gcd <a> <b>       Greatest common divisor
    math-x lcm <a> <b>       Least common multiple
    math-x roman <n>         Integer to Roman numeral
    math-x unroman <str>     Roman numeral to integer
    math-x base <n> <base>   Convert n to base (2-62)
    math-x unbase <str> <b>  Parse str from base
    math-x lerp <a> <b> <t>  Linear interpolation
    math-x clamp <n> <min> <max>
    math-x stats <nums...>   Sum, avg, median, variance, stdDev
    math-x pow2 <n>          Next power of two >= n
  `);
}

function demo() {
  console.log('math-x demo\n' + '='.repeat(40));
  console.log('clamp(15, 0, 10):', clamp(15, 0, 10));
  console.log('lerp(0, 100, 0.3):', lerp(0, 100, 0.3));
  console.log('map(0.5, 0, 1, 0, 255):', map(0.5, 0, 1, 0, 255));
  console.log('wrap(14, 0, 12):', wrap(14, 0, 12));
  console.log('roundTo(Math.PI, 4):', roundTo(Math.PI, 4));
  console.log('mod(-3, 7):', mod(-3, 7));
  console.log('degToRad(180):', degToRad(180).toFixed(6));
  console.log('gcd(48, 36):', gcd(48, 36));
  console.log('factorial(10):', factorial(10).toString());
  console.log('isPrime(97):', isPrime(97));
  console.log('primesUpTo(30):', primesUpTo(30));
  console.log('primeFactors(360):', primeFactors(360));
  console.log('fib(15):', fib(15).toString());
  console.log('toRoman(2024):', toRoman(2024));
  console.log('toBase(255, 16):', toBase(255, 16));
  console.log('stats:', { sum: sum(1,2,3,4,5), avg: average(1,2,3,4,5), median: median(1,2,3,4,5) });
  console.log('nextPowerOfTwo(1000):', nextPowerOfTwo(1000));
  console.log('GOLDEN_RATIO:', GOLDEN_RATIO.toFixed(10));
}

const n = (s) => Number(s);
switch (cmd) {
  case 'demo': demo(); break;
  case 'prime': console.log(isPrime(n(args[0])) ? 'prime' : 'not prime'); break;
  case 'primes': console.log(primesUpTo(n(args[0]))); break;
  case 'factors': console.log(primeFactors(n(args[0]))); break;
  case 'fib': console.log(fib(n(args[0])).toString()); break;
  case 'factorial': console.log(factorial(n(args[0])).toString()); break;
  case 'gcd': console.log(gcd(n(args[0]), n(args[1]))); break;
  case 'lcm': console.log(lcm(n(args[0]), n(args[1]))); break;
  case 'roman': console.log(toRoman(n(args[0]))); break;
  case 'unroman': console.log(fromRoman(args[0])); break;
  case 'base': console.log(toBase(n(args[0]), n(args[1]))); break;
  case 'unbase': console.log(fromBase(args[0], n(args[1]))); break;
  case 'lerp': console.log(lerp(n(args[0]), n(args[1]), n(args[2]))); break;
  case 'clamp': console.log(clamp(n(args[0]), n(args[1]), n(args[2]))); break;
  case 'pow2': console.log(nextPowerOfTwo(n(args[0]))); break;
  case 'stats': {
    const nums = args.map(n);
    console.log({ count: nums.length, sum: sum(...nums), avg: average(...nums), median: median(...nums), variance: variance(...nums), stdDev: stdDev(...nums) });
    break;
  }
  default: showHelp();
}
