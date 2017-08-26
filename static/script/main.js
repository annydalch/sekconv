'use strict'

/* global $, fx */

let sek = 8.0923
let usd = 1
const ratesFromDate = '2017-08-21'

let base = 'USD'

fx.base = base
fx.rates = { 'USD': usd, 'SEK': sek }

let url = 'https://api.fixer.io/latest?base=USD&symbols=USD,SEK'

let sekIn = null
let usdOut = null
let dateUpdatedH = null

const updateRatesCallback = (data) => {
  console.log(`updateRatesCallback: ${data}`)
  sek = data.rates.SEK
  dateUpdatedH.innerHTML = data.date
  fx.rates['SEK'] = sek
  formInput()
}

const updateRates = () => {
  console.log('Updating exchange rates')
  $.getJSON(url, null, updateRatesCallback)
}

const formInput = () => {
  if (!sekIn || !usdOut) {
    console.log('Either sekIn or usdOut is undefined')
    return false
  }
  if (sekIn.value === '') {
    usdOut.value = ''
    return
  }
  let sekValue = parseFloat(sekIn.value)
  usdOut.value = fx.convert(sekValue, {from: 'SEK', to: 'USD'})
}

window.onload = () => {
  sekIn = document.getElementById('sek')
  usdOut = document.getElementById('usd')
  dateUpdatedH = document.getElementById('dateUpdated')
  dateUpdatedH.innerHTML = ratesFromDate
  updateRates()

  // Update the exchange rates every hour
  window.setInterval(updateRates, 3600000)

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => { console.log('Service worker registered') })
  }
}
