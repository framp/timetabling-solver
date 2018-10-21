# timetabling-solver

A library which exposes a genetic algorithm to solve (one of) the [timetabling problem](http://web.csulb.edu/~obenli/DSS/node2.html).

TL;DR: I want to assign things to time slots and minimize by the number of collisions between things

## Problem
Given:
 - a list of time slots
 - a list of bookables that can be assigned to a specific time slot
 - a list of constraints in the form of:
    - a list of bookables which shouldn't overlap

Find the optimal assignment for bookables in time slots in order to minimize the number of collisions between bookables

## Description

The genetic algorithm presented: 
 - Generates a population of random timetables
 - Evaluates the fitness of the population
 - Applies mutation or crossover to the population to obtain another population


Crossover generates two timetables starting from two timetables.
The parents are selected using `genetic-js` fittest and tournament2 algorithms.
The crossover is a classic 2 points crossover:
  - A randomly sorted list of bookables get divided in 2 points
  - The bookables in the first and last segments will use the time slot selected in the first parent
  - The bookables in the middle semgent will use the time slot selected in the second parent

Mutation is specifically tuned to mutate a random collisions with a random element.
The idea behind targeting a random collision and not a random element is that we want to target the problematic areas.
Following this approaches increased performances greatly and reduced the number of cases in which the algorithm was getting stuck repeatedly on populations with very low number of collisions.

## Basic Example

```
const solve = require('timetabling-solver').minCollisions

const slots = ['8:00', '10:00', '12:00']
const bookables = ['Tennis', 'Climbing', 'Gymnastic', 'Trapeze', 'Handstands']
const constraints = [ //list of non overlapping constraints
  ['Tennis', 'Climbing'],
  ['Handstands', 'Climbing'],
  ['Trapeze', 'Tennis'],
  ['Tennis', 'Handstands', 'Trapeze']
]

solve({ slots, bookables, constraints }, {}, (table, fitness) => console.log(table, fitness))
```
-------
```
{ '10:00': [ 'Trapeze', 'Climbing' ],
  '12:00': [ 'Handstands', 'Gymnastic' ],
  '8:00': [ 'Tennis' ] } 0
```

## Custom Constraints

From version 0.3.2 you can add custom constraints to your problems.

Instead of adding a list of colliding entries, you need to provide a function.

A custom constraint is a function which accept a timetable and returns a list of collisions:
 - Returning an empty array means there are no collisions according to your constraint.
 - Returning an array with values from your bookables means they're colliding

```
const solve = require('timetabling-solver').minCollisions

const slots = ['8:00', '10:00']
const bookables = ['Tennis', 'Climbing']
const constraints = [ //list of non overlapping constraints
  ['Tennis', 'Climbing'],
  (timetable) => timetable['8:00'].indexOf('Climbing') !== -1 ? ['Climbing'] : []
  //Climbing can't be at 8:00
]

solve({ slots, bookables, constraints }, {}, (table, fitness) => console.log(table, fitness))
```

## API
```
require('timetabling-solver').minCollisions(data, config, callback, partialCallback)
  data = {              // Object which represents the specification of the problem
    slots               // List of time slots 
    bookables           // List of bookables that can be assigned to a specific time slot
    constraints: [      // List of constraints
      constraint        // List of bookables which shouldn't overlap
    ]  
  }
  config = {            // Object which contains extra configuration    
    iterations: 1000,   // Maximum number of generations before stopping the algorithm
    size: 250,          // Size of the population
    crossover: 0.3,     // Probability of crossover happening
    mutation: 0.8,      // Probability of a mutation happening
    skip: 20            // Numnber of generations to skip before calling partialCallback
    ...more: check out genetic-js documentation
  }
  callback = (timetable, meta) //Function called at the end of the computation
  partialCallback = (timetable, meta) //Function called after the number of generations set in skip
    timetable =         //Fittest timetable 
    meta = { 
      fitness,          //Fitness number which represent the number of collisions
      generation,       //Number of generation of elapsed
      stats,            //Stats as per genetic-js
      pop,              //Current population
      popTables,        //Same as pop, but each entity is converted into proper timetable - useful for debugging.
      collisions        //Collisions in the fittest timetable
    }
```

## Examples
Check out the examples (the advanced one in particular).

## Contributions
I love small and big contributions.
Whether you want to solve another entire timetabling problem or whether you found a default configuration which yields better results in a demonstrable way - I'm always happy to review PRs and discuss about the project.

Unfortunately I benefited from this code a long time ago - aka I'm not using it actively and don't have too much time to work on it.

## Contributors
 - [@framp](http://framp.me)
 - [@sithmel](https://github.com/sithmel)
 - [@lud77](https://github.com/lud77)

## Credits

- This awesome paper which was the original inspiration: [A_Genetic_Algorithm_To_Solve_The_Timetable_Problem](https://www.researchgate.net/publication/2253354_A_Genetic_Algorithm_To_Solve_The_Timetable_Problem)
- [Genetic.js](https://github.com/subprotocol/genetic-js)
