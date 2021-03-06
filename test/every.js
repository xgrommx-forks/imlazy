import test from 'ava'
import {every} from '../'
import {fiveFiveFive} from './_tools'

test('every', t => {
  t.deepEqual(every(x => x === 5)(fiveFiveFive), true)
  t.deepEqual(every(x => x === 30, fiveFiveFive), false)
})
