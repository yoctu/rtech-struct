const s = require('superstruct')

const Carrier = s.object({
  code: s.size(s.string(), 2, 64),
})

module.exports = {
  carrier: Carrier
}
