module.exports = function (entity) {
  const { table, findCollisions } = this.userData.helpers
  const constraints = this.userData.constraints
  const timetable = table(...entity)
  return constraints.reduce((acc, constraint) =>
    acc + findCollisions(timetable, constraint).length, 0)
}
