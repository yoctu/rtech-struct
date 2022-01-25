const s = require('superstruct')
const { NoEmptyString } = require('./string')
const { Currency } = require('./currency')

const Invoice = s.object({
  bill_to: NoEmptyString,
  currency: Currency
})

module.exports = {
  Invoice: Invoice
}
