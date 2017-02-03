const tape = require('tape')
const crossover = require('../src/crossover')
const helpers = require('../src/helpers')

tape('crossover works', (assert) => {
  assert.plan(4)
  const context = {
    userData: {
      helpers,
      bookables: '123456789'.split(''),
      constraints: [
        ['1', '7'],
        ['2', '4', '8'],
        ['3', '9']
      ]
    }
  }
  const data = [
    ['abcdef'.split(''), '213986754'.split('')],
    ['abcdef'.split(''), '128456739'.split('')]
  ]
  const [ son, daughter ] = crossover.apply(context, data)
  assert.deepEqual(son[0], 'abcdef'.split(''))
  assert.deepEqual(daughter[0], 'abcdef'.split(''))
  assert.deepEqual(new Set(son[1]), new Set('123456789'.split('')))
  assert.deepEqual(new Set(daughter[1]), new Set('123456789'.split('')))
})
