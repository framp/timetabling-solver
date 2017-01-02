module.exports = function () {
  const { shuffle } = this.userData.helpers
  return [
    shuffle(this.userData.slots),
    shuffle(this.userData.bookables)
  ]
}
