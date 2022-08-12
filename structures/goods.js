const s = require('superstruct')
const { NoEmptyString } = require("./string")

const Goods = s.object({
  value: PositiveNumber,
  currency: s.optional(NoEmptyString),
})

module.exports = {
    Goods: Goods
}
