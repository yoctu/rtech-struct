const s = require('superstruct')
const { NoEmptyString } = require('./string')

const Reference = s.object({
  label: NoEmptyString,
  value: s.optional(s.string())
})

module.exports = {
  Reference: Reference
}
