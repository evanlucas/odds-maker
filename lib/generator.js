'use strict'

const Item = require('./item')

module.exports = class Items {
  constructor(items, profit) {
    if (!Array.isArray(items)) {
      throw new TypeError('items must be an array')
    }

    this.charsets = new Map()
    var chars = ''

    for (var i = 0; i < items.length; i++) {
      const item = items[i]
      if (!item instanceof Item) {
        throw new TypeError('item must be an item')
      }

      this.charsets.set(item.char, item)
      chars += item.char
    }

    this.items = items

    this.profit = profit
    this.combos = this.createCombinations(chars)
    this.results = new Map()
    this.report()
  }

  report() {
    for (const charset of this.combos) {
      var res = 1
      var cost = 0
      const chars = charset.split('')
      for (const item of this.items) {
        if (chars.includes(item.char)) {
          res *= item.odds
          cost += item.cost
        } else {
          res *= (1 - item.odds)
        }
      }

      const output = res * (this.profit - cost)
      this.results.set(charset, [res, output])
    }
  }

  createCombinations(chars) {
    function fn(active, rest, a) {
      if (!active && !rest) return
      if (!rest) a.push(active)
      else {
        fn(active + rest[0], rest.slice(1), a)
        fn(active, rest.slice(1), a)
      }
      return a
    }
    return fn('', chars, [])
  }
}
