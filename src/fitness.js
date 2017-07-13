const { table, findCollisions } = require('./helpers')

module.exports = function (entity) {
  const constraints = this.userData.constraints
  const timetable = table(...entity)
  return constraints.reduce((acc, constraint) =>
    acc + findCollisions(timetable, constraint).length, 0)
}
