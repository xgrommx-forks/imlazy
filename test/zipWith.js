import test from 'ava'
import {zipWith} from '../'
import {
  add,
  isFrozenToArray,
  oneTwoThree,
  oneTwoThreeFour,
  positiveIntegers,
  subtract,
  takeThree,
  threeTwoOne
} from './_tools'

test('zipWith', t => {
  const processIterable = isFrozenToArray(t)
  const zipWithSubtract = zipWith(subtract)
  const twoFourSix = takeThree(zipWith(add, positiveIntegers, positiveIntegers))
  t.same(
    processIterable(zipWithSubtract(oneTwoThree)(threeTwoOne)),
    [-2, 0, 2]
  )
  t.same(
    processIterable(zipWithSubtract(oneTwoThreeFour)(threeTwoOne)),
    [-2, 0, 2]
  )
  t.same(
    processIterable(zipWithSubtract(threeTwoOne)(positiveIntegers)),
    [2, 0, -2]
  )
  t.same(
    processIterable(twoFourSix),
    [2, 4, 6]
  )
  t.same(
    processIterable(twoFourSix),
    [2, 4, 6]
  )
  t.same(
    processIterable(twoFourSix),
    [2, 4, 6]
  )
})
