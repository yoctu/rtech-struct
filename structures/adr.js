const s = require('superstruct')
const { NoEmptyString } = require('./string')

const Adr = s.object({
  class: NoEmptyString,
  un_code: s.size(s.string(), 4, 4),
  packing_group: s.optional(NoEmptyString)
})

module.exports = {
  Adr: Adr
}
