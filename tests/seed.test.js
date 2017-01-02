const tape = require('tape')
const seed = require('../src/seed')
const helpers = require('../src/helpers')

tape('seed generates random timetable', (assert) => {
  assert.plan(2)
  const context = {
    userData: {
      helpers,
      slots: 'abcdef'.split(''),
      bookables: '12345'.split('')
    }
  }
  const [slots, bookables] = seed.apply(context)
  assert.deepEqual(new Set(slots), new Set(context.userData.slots))
  assert.deepEqual(new Set(bookables), new Set(context.userData.bookables))
})