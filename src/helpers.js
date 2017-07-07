exports.swap = (arr, i, j) => {
  const t = arr[i]
  arr[i] = arr[j]
  arr[j] = t
}
exports.shuffle = (arr) => {
  const swap = (arr, i, j) => {
    const t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
  }
  const result = arr.slice()
  let i = arr.length
  if (i === 0) return result
  while (--i) {
    const j = Math.floor(Math.random() * (i + 1))
    swap(result, i, j)
  }
  return result
}
exports.table = (slots, bookables) => {
  let slotIndex = 0
  return bookables.reduce((acc, bookable) => {
    const slot = slots[slotIndex++ % slots.length]
    return Object.assign({}, acc, { [slot]: (acc[slot] || []).concat(bookable) })
  }, {})
}
exports.detable = (slots, table) => {
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
