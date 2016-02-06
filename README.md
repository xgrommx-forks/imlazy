# imlazy

[![npm version](https://badge.fury.io/js/imlazy.svg)](https://badge.fury.io/js/imlazy)
[![Build Status](https://travis-ci.org/benji6/imlazy.svg?branch=master)](https://travis-ci.org/benji6/imlazy)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

###### Functional, declarative, immutable and lazy as you like

## What is this?

JS library, for dealing with iterables, iterators and generators.

imlazy can be used to create iterables, "transform" them (returning new iterables rather than mutating them) or query them.

Iterables returned by imlazy are simpy of the form:

```javascript

const someIterable = Object.freeze({[Symbol.Iterator]: function* () {
  // do some stuff
}});

```

Therefore they are lazy and immutable.

If you want to turn them into arrays or feed them into a function etc then just spread them (don't spread anything infinite or circular!):

```javascript

const someArray = [...someIterable];
const someReturnedValue = someFunction(...someIterable);

```

All functions exposed by imlazy are curried and data-last which makes them ideal for partial application and functional programming.

## Why?

Because lazy and immutable! (And also very small!)

- Want to operate on infinite or cicrular data strutures? No problem!

- Want to compose multiple transformations without having to worry about traversing data structures multiple times? No problem!

- Scared of your data structures being mutated and having to deal with painful bugs caused by this? No problem!

- Want to be totally awesome? No problem!

## Installation

```bash
npm i -S imlazy
```

***N.B. imlazy is written in the node 5 subset of ES2015. If you want to run this code in an environment that doesn't support at least this subset I'm afraid you are on your own as I haven't found a satisfactory solution to this problem. If you have any ideas on how to solve this that would be massively appreciated.***

## Examples

```javascript

import {cycle, filter, range, reduce, sum, take} from 'imlazy'

// all functions are autocurried for partial application
const takeEight = take(8)
const isEven = x => x % 2 === 0

const positiveIntegers = range(1, Infinity) // => iterableOf(1, 2, 3, 4, 5, 6, 7, 8, ...)
const positiveEvenIntegers = filter(isEven, positiveIntegers) // => iterableOf(2, 4, 6, 8, ...)
const twoFourSix = take(3, positiveEvenIntegers) // => iterableOf(2, 4, 6)
sum(twoFourSix) // => 12

// NB twoFourSix is an immutable lazy iterable
// convert to an array like this
[...twoFourSix] // => [2, 4, 6]

const oneTwoThree = range(1, 3) // => iterableOf(1, 2, 3)
const circularOneTwoThree = cycle(oneTwoThree) // => iterableOf(1, 2, 3, 1, 2, 3, 1, 2, 3, ...)
takeEight(circularOneTwoThree) // => iterableOf(1, 2, 3, 1, 2, 3, 1, 2)

const fibonacciGenerator = function* () {
  let [a, b] = [0, 1]
  while (true) yield ([a, b] = [b, a + b])[0]
}

takeEight(fibonacciGenerator()) // => iterableOf(1, 1, 2, 3, 5, 8, 13, 21)

```

## [Click Here for Documentation](http://benji6.github.io/imlazy/docs/)

## Interoperability

This library works with all native iterable types including the Generator, String, Array, TypedArray, Map and Set types.

In fact anything that has a [Symbol.iterator] property can be processed by this library and that includes custom data structures. For instance, the functions in this library can be used to process [immutable-js](https://github.com/facebook/immutable-js) iterables.


## Performance

There is a benchmark in the root of this repo comparing imlazy with Ramda and native array methods. When mapping twice then filtering twice over 1024 values on node 5 here are the results I get:

```bash
imlazy x 2,276 ops/sec ±8.35% (68 runs sampled)
native x 2,911 ops/sec ±9.79% (66 runs sampled)
ramda x 13,054 ops/sec ±8.30% (60 runs sampled)
ramdaTransducer x 4,262 ops/sec ±8.77% (56 runs sampled)
Fastest is ramda
```

Ramda blows the other two out the water and imlazy has the worst performance :(

It is possible to contrive situations where the relative performance of imlazy would be better, for instance if only a small portion of the test data were actually ever used. It's also possible that imlazy's performance will improve with future iterations of the v8 engine

## Project Scope

At the moment the scope of this project is limited to manipulating iterables using the iteration protocols. It does not expose standard FP functions like curry, compose, identity, flip, tap etc. It also does not prescribe a notion of equality, so functions like [includes](https://tc39.github.io/Array.prototype.includes/), [has](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has), or [contains](http://ramdajs.com/docs/#contains) cannot exist.

## Influences

- [Ramda](https://github.com/ramda/ramda)
- Haskell
- Clojure
