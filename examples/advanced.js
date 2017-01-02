const solve = require('..').minCollisions

const multiple = (length, string) =>
  Array.apply([], { length }).map((a, i) => `${string}${i + 1}`)
const randomSet = (length, bookables) => {
  const bookablesCopy = bookables.slice()
  const result = []
  while (length--) {
    const randomIndex = Math.floor(Math.random() * bookablesCopy.length)
    result.push(bookablesCopy[randomIndex])
    bookablesCopy.splice(randomIndex, 1)
  }
  return result
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const slots = days.reduce((acc, day) => acc.concat(multiple(4, day)), [])
const bookables = [].concat(multiple(10, 'Math'))
                    .concat(multiple(8, 'Physics'))
                    .concat(multiple(8, 'Chemistry'))
                    .concat(multiple(10, 'English'))
                    .concat(multiple(5, 'History'))
                    .concat(multiple(5, 'Geography'))
                    .concat(multiple(7, 'Italian'))
                    .concat(multiple(5, 'Philosophy'))
const constraints = [
  randomSet(20, bookables),
  randomSet(20, bookables),
  randomSet(20, bookables),
  randomSet(20, bookables),
  randomSet(20, bookables)
]

solve({ slots, bookables, constraints }, { skip: 1 },
  (table, { fitness }) => console.log(table, fitness),
  (table, { generation, fitness }) => console.log(generation, fitness))

/*
0 20
1 18
2 17
3 16
4 15
5 14
6 13
7 12
8 11
9 10
10 9
11 9
12 8
13 7
14 6
15 5
16 4
17 3
18 3
19 3
20 3
21 2
22 1
{ Friday1: [ 'Chemistry2', 'Italian5', 'English1' ],
  Wednesday2: [ 'Math3', 'Chemistry1', 'English6' ],
  Wednesday4: [ 'English7', 'Physics3', 'English10' ],
  Friday3: [ 'Physics4', 'Philosophy4', 'Math9' ],
  Thursday4: [ 'Geography3', 'Chemistry6', 'Math10' ],
  Tuesday2: [ 'Chemistry8', 'Philosophy5', 'Math7' ],
  Monday2: [ 'Chemistry7', 'Physics1', 'History5' ],
  Tuesday1: [ 'Italian4', 'Physics7', 'Math4' ],
  Friday4: [ 'Geography4', 'Philosophy3', 'Chemistry5' ],
  Wednesday1: [ 'English4', 'History2', 'History1' ],
  Thursday1: [ 'Math6', 'Math8', 'English8' ],
  Thursday3: [ 'English2', 'Physics5', 'Chemistry3' ],
  Monday3: [ 'Italian6', 'Math5', 'Italian1' ],
  Wednesday3: [ 'History4', 'Philosophy1', 'Math1' ],
  Tuesday3: [ 'English5', 'Italian2', 'English9' ],
  Tuesday4: [ 'Chemistry4', 'Italian3', 'Philosophy2' ],
  Monday4: [ 'History3', 'Geography2', 'Physics6' ],
  Monday1: [ 'Geography1', 'Geography5', 'English3' ],
  Friday2: [ 'Physics2', 'Italian7' ],
  Thursday2: [ 'Math2', 'Physics8' ] } 0
*/
