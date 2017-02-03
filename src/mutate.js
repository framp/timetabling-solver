module.exports = function (entity) {
  const { table, swap, findCollisions } = this.userData.helpers
  const result = [
    entity[0].slice(),
    entity[1].slice()
  ]
  const constraints = this.userData.constraints
  const timetable = table(...entity)
  const collisions = constraints.reduce((acc, constraint) =>
    acc.concat(findCollisions(timetable, constraint)), [])
  const randomCollision =
    collisions[Math.floor(Math.random() * collisions.length)]
      .split(',')[Math.floor(Math.random() * 2)]
  const i = result[1].findIndex((bookable) => bookable === randomCollision)
  let j = Math.floor(Math.random() * (result[1].length - 1))
  if (j >= i) j++
  swap(result[1], i, j)
  return result
}
