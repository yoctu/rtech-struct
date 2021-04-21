const s = require('superstruct')
const GpsS = require('./lib').gpsstring(s)
const { Tz } = require('./lib')

const Address = s.object({
  street: s.size(s.string(), 1, Infinity),
  additional_street: s.optional(s.size(s.string(), 1, Infinity)),
  city: s.size(s.string(), 1, Infinity),
  zip_code: s.size(s.string(), 2, Infinity),
  province: s.optional(s.size(s.string(), 1, Infinity)),
  country: s.size(s.string(), 2, 2),
  position: GpsS,
  timezone_string: Tz
})

module.exports = {
  address: Address
}
