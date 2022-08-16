const s = require('superstruct')
const { NoEmptyString } = require("./string")
const { PositiveNumber } = require('./number')

const Goods = s.object({
  value: PositiveNumber,
  currency: s.optional(NoEmptyString),
})

module.exports = {
    Goods: Goods
}
