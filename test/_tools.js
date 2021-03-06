'use strict'

const range = require('../').range
const repeat = require('../').repeat
const take = require('../').take

module.exports.add = (a, b) => a + b
module.exports.oneTwoThree = Object.freeze([1, 2, 3])
module.exports.oneTwoThreeFour = Object.freeze([1, 2, 3, 4])
module.exports.fibonacciNumbers = {[Symbol.iterator]: function * () {
  var a = 1
  var b = 1
  while (true) {
    yield a
    const c = a + b
    a = b
    b = c
  }
}}
module.exports.double = x => x * 2
module.exports.emptyIterable = {[Symbol.iterator]: function * () {}}
module.exports.fiveFiveFive = Object.freeze([5, 5, 5])
module.exports.halve = x => x / 2
module.exports.isEven = x => x % 2 === 0
module.exports.testAndToArray = t => iter => {
  t.throws(_ => { iter.a = 1 })
  t.is(iter.toString.name, 'imlazyToStringThunk')
  t.deepEqual([...iter], [...iter])
  return [...iter]
}
module.exports.negativeIntegers = range(-1)(-Infinity)
module.exports.positiveIntegers = range(1)(Infinity)
module.exports.infiniteIterableOfPositiveIntegers = repeat(module.exports.positiveIntegers)
module.exports.subtract = (a, b) => a - b
module.exports.takeEight = take(8)
module.exports.takeThree = take(3)
module.exports.threeTwoOne = Object.freeze([3, 2, 1])
module.exports.fourThreeTwoOne = Object.freeze([4, 3, 2, 1])
