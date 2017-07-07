module.exports = function (entity) {
  const { table } = this.userData.helpers
  const { findCollisions, constraints } = this.userData
  const timetable = table(...entity)
  return constraints.reduce((acc, constraint) =>
    acc + findCollisions(timetable, constraint).length, 0)
}
