# imlazy

[![npm version](https://badge.fury.io/js/imlazy.svg)](https://badge.fury.io/js/imlazy)
[![Build Status](https://travis-ci.org/benji6/imlazy.svg?branch=master)](https://travis-ci.org/benji6/imlazy)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

###### Functional, declarative, immutable and lazy as you like

## What is this?

JS library, for dealing with iterables, iterators and generators

imlazy can be used to create iterables, "transform" them (returning new iterables rather than mutating them) or query them

Iterables returned by imlazy are of the form:

```javascript

const someIterable = Object.freeze({[Symbol.Iterator]: function* () {
  // do some stuff
}});

```

Therefore they are lazy and immutable

If you want to turn them into arrays or feed them into a function etc then just spread them (don't spread anything infinite or circular!):

```javascript

const someArray = [...someIterable];
const someReturnedValue = someFunction(...someIterable);

```

All functions exposed by imlazy are curried and data-last which makes them ideal for partial application and functional programming

## Installation

```bash
npm i -S imlazy
```

***N.B. imlazy is written in the node 5 subset of ES2015. If you want to run this code in an environment that doesn't support at least this subset I'm afraid you are on your own as I haven't found a satisfactory solution to this problem***

## Getting Started

### Debugging

imlazy implements a custom `toString` method for the iterables it returns which is useful for debugging. Just invoke `String` on an iterable returned by one of imlazy's functions, for instance:

```javascript
String(range(1, 8)) // => (1 2 3 4 5 6 7 8)
String(range(1, Infinity)) // => (1 2 3 4 5 6 7 8 9 10...)
```

The custom `toString` method can handle infinite iterables (in which case it lists the first 10 elements followed by ellipsis), nested iterables and uses a LISP-like notation to differentiate iterables from arrays and other JS data structures

### Code Examples

```javascript

import {cycle, filter, range, reduce, sum, take} from 'imlazy'

// all functions are autocurried for partial application
const takeEight = take(8)
const isEven = x => x % 2 === 0

const positiveIntegers = range(1, Infinity) // => (1 2 3 4 5 6 7 8...)
const positiveEvenIntegers = filter(isEven, positiveIntegers) // => (2 4 6 8...)
const twoFourSix = take(3, positiveEvenIntegers) // => (2 4 6)
sum(twoFourSix) // => 12

// NB twoFourSix is an immutable lazy iterable
// convert to an array like this
[...twoFourSix] // => [2, 4, 6]

const oneTwoThree = range(1, 3) // => (1 2 3)
const circularOneTwoThree = cycle(oneTwoThree) // => (1 2 3 1 2 3 1 2 3...)
takeEight(circularOneTwoThree) // => (1 2 3 1 2 3 1 2)

const fibonacciGenerator = function* () {
  let [a, b] = [0, 1]
  while (true) yield ([a, b] = [b, a + b])[0]
}

takeEight(fibonacciGenerator()) // => (1 1 2 3 5 8 13 21)

```

## [Click Here for Documentation](http://benji6.github.io/imlazy/docs/)

## Interoperability

This library works with all native iterable types including the Generator, String, Array, TypedArray, Map and Set types

In fact anything that has a [Symbol.iterator] property can be processed by this library and that includes custom data structures. For instance, the functions in this library can be used to process [immutable-js](https://github.com/facebook/immutable-js) iterables

## Performance

There is a benchmark in the root of this repo comparing imlazy with Ramda and native array methods. The `infiniteIterable` benchmarks map, filter and take over an infinite iterable and the `array` benchmarks map and filter over an array

```bash
infiniteIterable - imlazy x 176 ops/sec ±2.60% (71 runs sampled)
infiniteIterable - ramdaTransducer x 1,137 ops/sec ±5.70% (72 runs sampled)
array - imlazy x 1,803 ops/sec ±3.35% (80 runs sampled)
array - ramdaTransducer x 20,539 ops/sec ±2.89% (82 runs sampled)
array - native x 4,152 ops/sec ±4.54% (81 runs sampled)
array - ramda x 28,174 ops/sec ±3.58% (83 runs sampled)
```

Ramda's transducers are significantly faster than imlazy over both infinite iterables and arrays

It will be interesting to see whether performance will improve with future iterations of the v8 engine

## Project Scope

The scope of this project is limited to manipulating iterables using the iteration protocols. It does not expose standard FP functions like curry, compose, identity, flip, tap etc. It also does not prescribe a notion of equality, so functions like [includes](https://tc39.github.io/Array.prototype.includes/), [has](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has), or [contains](http://ramdajs.com/docs/#contains) cannot exist

## Influences

- [Ramda](https://github.com/ramda/ramda)
- Haskell
- Clojure
