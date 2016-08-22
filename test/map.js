import test from 'ava'
import {map} from '../'
import {halve, testAndToArray, oneTwoThree} from './_tools'

test('map', t => {
  const processIterable = testAndToArray(t)
  const anotherOneTwoThree = map(halve)([2, 4, 6])
  t.deepEqual(processIterable(anotherOneTwoThree), oneTwoThree)
  t.deepEqual(processIterable(anotherOneTwoThree), oneTwoThree)
  t.deepEqual(processIterable(anotherOneTwoThree), oneTwoThree)
  t.deepEqual(processIterable(map(halve, [2, 4, 6])), oneTwoThree)
  t.deepEqual(processIterable(map(halve, new Set([2, 4, 6]))), oneTwoThree)
})
