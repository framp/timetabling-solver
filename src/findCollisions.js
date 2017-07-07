
module.exports = function findCollisions (timetable, constraint) {
  function getFindCollisionsInGroup (constraint) {
    return function findCollisionsInGroup (timetable) {
      const hasDifference = (a, b) =>
        Boolean(a.filter(x => b.indexOf(x) < 0).length ||
          b.filter(x => a.indexOf(x) < 0).length)

      const computeCollisions = (slotLists) =>
        slotLists.reduce((acc, [bookable, slotList], i, slotLists) =>
          acc.concat(slotLists.slice(i + 1).reduce((acc, [bookableTarget, slotListTarget]) =>
            acc.concat(slotList.length && slotListTarget.length && !hasDifference(slotList, slotListTarget)
              ? [bookable, bookableTarget].join()
              : []
          ), [])
        ), [])

      const inSlot = (bookable) => (slot) => timetable[slot].indexOf(bookable) !== -1
      const slots = Object.keys(timetable)
      const slotLists = constraint.map((bookable) => [bookable, slots.filter(inSlot(bookable))])
      return computeCollisions(slotLists)
    }
  }

  const findCollisionsFunction = Array.isArray(constraint) ? getFindCollisionsInGroup(constraint) : constraint
  return findCollisionsFunction(timetable)
}
