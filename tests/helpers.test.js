const tape = require('tape')
const { swap, shuffle, table, detable, findCollisions } = require('../src/helpers')

tape('swap works', (assert) => {
  assert.plan(1)
  const arr = [1,2,3,4]
  swap(arr, 1, 2)
  assert.deepEqual(arr, [1,3,2,4])
})

tape('shuffle works', (assert) => {
  assert.plan(1)
  const arr = [1,2,3,4]
  const shuffled = shuffle(arr)
  assert.deepEqual(new Set(arr), new Set(shuffled))
})

tape('table/detable works', (assert) => {
  assert.plan(2)
  const slots = 'abcdef'.split('')
  const bookables = '12345678'.split('')
  const result = { a: [ '1', '7' ], b: [ '2', '8' ], c: [ '3' ], d: [ '4' ], e: [ '5' ], f: [ '6' ] }
  const timetable = table(slots, bookables)
  assert.deepEqual(timetable, result)
  assert.deepEqual(detable(slots, timetable), [slots, bookables])
})

tape('findCollisions works', (assert) => {
  assert.plan(2)
  const slots = 'abcdef'.split('')
  const bookables = '12345678'.split('')
  const timetable = table(slots, bookables)

  assert.deepEqual(findCollisions(timetable, ['1','7','6']), ['1,7'])
  assert.deepEqual(findCollisions(timetable, ['1','3']), [])
})