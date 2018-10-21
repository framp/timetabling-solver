const tape = require('tape')
const fitness = require('../src/fitness')
const helpers = require('../src/helpers')
const solve = require('../src').minCollisions

tape('softFitness works', (assert) => {
  assert.plan(3)
  const context = {
    userData: {
      helpers,
      constraints: [
        ['1', '7'],
        ['2', '4', '8'],
        ['3', '9']
      ],
      softFitness: (timetable) => timetable.a.reduce(
        (acc, c) =>
          acc + parseInt(c), 0
      )
    }
  }
  assert.equal(fitness.call(context, ['abcdef'.split(''), '213986754'.split('')]), 0 + 9)
  assert.equal(fitness.call(context, ['abcdef'.split(''), '128456739'.split('')]), 1 + 8)
  assert.equal(fitness.call(context, ['abcdef'.split(''), '123456789'.split('')]), 3 + 8)
})

tape('softFitness influences results', (assert) => {
  assert.plan(2)
  const slots = ['8:00', '10:00']
  const bookables = ['Climbing', 'Tennis']
  const constraints = [
    ['Tennis', 'Climbing'],
  ]
  const softFitness = (timetable) => timetable['8:00'] == 'Tennis' ? 1 : 10;
  solve({ slots, bookables, constraints, softFitness }, {
    iterations: 10,
    size: 3
  }, (table, fitness) => {
    assert.deepEqual(table, { '8:00': ['Tennis'], '10:00': ['Climbing'] })
    assert.true(fitness.pop.filter((individual) => individual.fitness === 1).length >= 1)
  })
})
