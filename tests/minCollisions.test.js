const tape = require('tape')
const solve = require('../src').minCollisions

tape('minCollisions', (assert) => {
  assert.plan(2)

  const slots = ['8:00', '10:00']
  const bookables = ['Tennis', 'Climbing']
  const constraints = [ // list of non overlapping constraints
    ['Tennis', 'Climbing']
  ]

  solve({ slots, bookables, constraints }, {
    iterations: 10,
    size: 3
  }, (table, fitness) => {
    const res = JSON.stringify(table)
    assert.true(
      res === '{"10:00":["Climbing"],"8:00":["Tennis"]}' ||
      res === '{"10:00":["Tennis"],"8:00":["Climbing"]}' ||
      res === '{"8:00":["Climbing"],"10:00":["Tennis"]}' ||
      res === '{"8:00":["Tennis"],"10:00":["Climbing"]}'
    )
    assert.true(fitness.pop.filter((individual) => individual.fitness === 0).length >= 1)
  })
})

tape('minCollisions, custom constraint', (assert) => {
  assert.plan(2)

  const slots = ['8:00', '10:00']
  const bookables = ['Tennis', 'Climbing']
  const constraints = [ // list of non overlapping constraints
    ['Tennis', 'Climbing'],
    (timetable) => timetable['8:00'].indexOf('Climbing') !== -1 ? ['Climbing'] : []
  ]

  solve({ slots, bookables, constraints }, {
    iterations: 10,
    size: 3
  }, (table, fitness) => {
    const res = JSON.stringify(table)
    assert.true(
      res === '{"10:00":["Climbing"],"8:00":["Tennis"]}' ||
      res === '{"8:00":["Tennis"],"10:00":["Climbing"]}'
    )
    assert.true(fitness.pop.filter((individual) => individual.fitness === 0).length >= 1)
  })
})
