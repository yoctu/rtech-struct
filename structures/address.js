const s = require('superstruct')

const Address = s.object({
  street: s.size(s.string(), 1, Infinity),
  additional_street: s.optional(s.size(s.string(), 1, Infinity)),
  city: s.size(s.string(), 1, Infinity),
  zip_code: s.size(s.string(), 2, Infinity),
  province: s.optional(s.size(s.string(), 1, Infinity)),
  country: s.size(s.string(), 2, 2),
  position: s.pattern(s.string(), /(-)?\d+\.\d+,(-)?\d+\.\d+/),
  timezone_string: s.size(s.string(), 1, Infinity)
})

module.exports = {
  address: Address
}
