const solve = require('..').minCollisions

const slots = ['8:00', '10:00', '12:00']
const bookables = ['Tennis', 'Climbing', 'Gymnastic', 'Trapeze', 'Handstands']
const constraints = [
  ['Tennis', 'Climbing'],
  ['Handstands', 'Climbing'],
  ['Trapeze', 'Tennis'],
  ['Tennis', 'Handstands', 'Trapeze']
]

solve({ slots, bookables, constraints }, {},
  (table, { fitness }) => console.log(table, fitness))

/*
{ '12:00': [ 'Handstands', 'Gymnastic' ],
  '10:00': [ 'Climbing', 'Trapeze' ],
  '8:00': [ 'Tennis' ] } 0
*/
