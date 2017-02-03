const tape = require('tape')
const fitness = require('../src/fitness')
const helpers = require('../src/helpers')

tape('fitness works', (assert) => {
  assert.plan(3)
  const context = {
    userData: {
      helpers,
      constraints: [
        ['1', '7'],
        ['2', '4', '8'],
        ['3', '9']
      ]
    }
  }
  assert.equal(fitness.call(context, ['abcdef'.split(''), '213986754'.split('')]), 0)
  assert.equal(fitness.call(context, ['abcdef'.split(''), '128456739'.split('')]), 1)
  assert.equal(fitness.call(context, ['abcdef'.split(''), '123456789'.split('')]), 3)
})
