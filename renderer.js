'use strict'

const $ = require('jquery')
const Generate = require('./lib/generator')
const Item = require('./lib/item')
const items = new Map()

$(document).ready(function() {
  const form = $('#form')
  const generateButton = $('#generate')
  form.on('submit', (e) => {
    e.preventDefault()

    const odds = $('input[name=odds]').val()
    const cost = $('input[name=cost]').val()
    if (!odds || !cost) {
      // show error
      console.error('missing odds or cost')
      return false
    }

    const item = new Item({
      odds: +odds
    , cost: +cost
    })

    items.set(item.char, item)
    addRow(item.char, item.odds, item.cost)

    clear('input[name=odds]')
    clear('input[name=cost]')
    return false
  })

  $('body').on('click', 'button.btn-remove', (e) => {
    e.preventDefault()
    const btn = $(e.target).closest('button')
    const id = btn.attr('id').replace('x-', '')
    items.delete(id)
    removeRow($(`tr#${id}`))
    return false
  })

  generateButton.on('click', (e) => {
    const input = Array.from(items.values())
    const profit = +($('input[name=profit]').val())
    if (profit !== profit) {
      alert('profit must be a number')
      return
    }
    const out = new Generate(input, profit)
    renderResults(out)
  })
})

function renderResults(generator) {
  const table = $('#results tbody')
  table.empty()
  const data = []
  const trs = []
  for (const [combo, item] of generator.results) {
    data.push({
      combo: combo
    , odds: Number(item[0]).toFixed(4)
    , profit: Number(item[1]).toLocaleString('en')
    })
    trs.push(`
      <tr>
        <td>${combo}</td>
        <td>${Number(item[0] * 100).toFixed(2)}%</td>
        <td class="text-right">$${Number(item[1]).toLocaleString('en')}</td>
      </tr>
    `)
  }

  table.append(trs.join('\n'))
}

function clear(sel) {
  $(sel).val('')
}

function removeRow(ele) {
  ele.remove()
}

function addRow(name, odds, cost) {
  $('#table > tbody')
    .append(`
    <tr id="${name}">
      <td class="option-name"><strong>${name}</strong></td>
      <td class="option-odds">${odds}</td>
      <td class="option-cost">${Number(cost).toLocaleString('en')}</td>
      <td>
        <button type="button" class="btn btn-danger btn-remove" id="x-${name}">
          <i class="glyphicon glyphicon-remove"></i>
        </button>
      </td>
    </tr>`
    )
}
