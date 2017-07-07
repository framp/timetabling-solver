const tape = require('tape')
const mutate = require('../src/mutate')
const helpers = require('../src/helpers')
const findCollisions = require('../src/findCollisions')

tape('mutate mutates a timetable targeting a collision', (assert) => {
  assert.plan(4)
  const context = {
    userData: {
      helpers,
      findCollisions,
      constraints: [['1', '7']]
    }
  }
  const data = ['abcdef'.split(''), '12345678'.split('')]
  const [slots, bookables] = mutate.call(context, data)
  assert.deepEqual(new Set(slots), new Set(data[0]))
  assert.deepEqual(new Set(bookables), new Set(data[1]))
  assert.notDeepEqual(bookables, data[1])
  assert.equal(bookables[0] !== 1 || bookables[6] !== 7, true)
})
