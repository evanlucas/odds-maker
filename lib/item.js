'use strict'

var MIN_LETTER = 'a'.charCodeAt(0)

module.exports = class Item {
  constructor(options) {
    const opts = Object.assign({
      char: String.fromCharCode(MIN_LETTER++)
    }, options)

    this.odds = opts.odds
    this.cost = opts.cost
    this.char = opts.char
  }
}
