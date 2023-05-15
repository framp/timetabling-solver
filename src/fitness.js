const { table, findCollisions } = require('./helpers')

module.exports = function (entity) {
  const constraints = this.userData.constraints
  const softFitness = this.userData.softFitness || (timetable => 0);
  const timetable = table(...entity)

  return constraints.reduce((acc, constraint) =>
    acc + findCollisions(timetable, constraint).length, 0) + softFitness(timetable)
}
