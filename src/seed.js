const { shuffle } = require('./helpers')

module.exports = function () {
  return [
    shuffle(this.userData.slots),
    shuffle(this.userData.bookables)
  ]
}
