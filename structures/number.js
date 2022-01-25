const s = require('superstruct')

const PositiveNumber = s.refine(s.number(), "PositiveNumber", (value) => {
  return value >= 0
})

const PositiveInteger = s.refine(s.integer(), "PositiveInteger", (value) => {
  return value >= 0
})

module.exports = {
  PositiveNumber: PositiveNumber,
  PositiveInteger: PositiveInteger
}
