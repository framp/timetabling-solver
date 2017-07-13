const swap = (arr, i, j) => {
  const t = arr[i]
  arr[i] = arr[j]
  arr[j] = t
}

const shuffle = (arr) => {
  const result = arr.slice()
  let i = arr.length
  if (i === 0) return result
  while (--i) {
    const j = Math.floor(Math.random() * (i + 1))
    swap(result, i, j)
  }
  return result
}

const table = (slots, bookables) => {
  let slotIndex = 0
  return bookables.reduce((acc, bookable) => {
    const slot = slots[slotIndex++ % slots.length]
    return Object.assign({}, acc, { [slot]: (acc[slot] || []).concat(bookable) })
  }, {})
}

const detable = (slots, table) => {
  const bookables = []
  let total = slots.reduce((acc, key) => acc + table[key].length, 0)
  while (total) {
    slots.forEach((slot) =>
      table[slot].length &&
      bookables.push(table[slot].shift()) &&
      total--
    )
  }
  return [slots, bookables]
}

const hasDifference = (a, b) =>
  Boolean(a.filter(x => b.indexOf(x) < 0).length ||
          b.filter(x => a.indexOf(x) < 0).length)

const findCollisions = (timetable, constraint) => {
  if (typeof constraint === 'function') return constraint(timetable)
  const inSlot = (bookable) => (slot) => timetable[slot].indexOf(bookable) !== -1
  const slots = Object.keys(timetable)
  const slotLists = constraint.map((bookable) => [bookable, slots.filter(inSlot(bookable))])
  const collisions = slotLists.reduce((acc, [bookable, slotList], i, slotLists) =>
    acc.concat(slotLists.slice(i + 1).reduce((acc, [bookableTarget, slotListTarget]) =>
    acc.concat(slotList.length && slotListTarget.length && !hasDifference(slotList, slotListTarget)
      ? [bookable, bookableTarget].join()
      : []), [])), [])
  return collisions
}

module.exports = {
  swap, shuffle, table, detable, findCollisions
}
