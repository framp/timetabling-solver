module.exports = function (mother, father) {
  const { swap, shuffle, table, detable } = this.userData.helpers
  const bookables = shuffle(this.userData.bookables)
  const tables = [ table(...mother), table(...father) ]
  const slots = [ father[0], mother[0] ]
  const [a, b] = [
    Math.floor(Math.random() * bookables.length),
    Math.floor(Math.random() * bookables.length)
  ].sort()
  const findSlot = (bookable, table) =>
    Object.keys(table).find((slot) => table[slot].indexOf(bookable) > -1)
  const swapBookable = (bookable, slot, table) => {
    if (!table[slot]) table[slot] = []
    const length = table[slot].push(bookable)
    if (length > 1) {
      swap(table[slot], length - 1, Math.floor(Math.random() * (length - 1)))
      const targetSlot = findSlot(bookable, table)
      table[targetSlot].push(table[slot].pop())
      const oldIndex = table[targetSlot].findIndex((item) => item === bookable)
      table[targetSlot].splice(oldIndex, 1)
    }
  }
  bookables.forEach((bookable, i, arr, index = Number(i < a || i > b)) =>
    swapBookable(bookable, findSlot(bookable, tables[Number(!index)]), tables[index]))
  return tables.map((table, i) => detable(slots[i], table))
}
