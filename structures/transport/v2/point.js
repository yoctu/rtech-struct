const s = require('superstruct')
const { contact } = require('./contact')
const { address } = require('./address')

const toZuluDate = value => {
  return value.slice(-1) !== 'Z' ? value + 'Z' : value
};

const ZuluDate = require('../../lib').zouloudate(s)

const Point = s.object({
  key: s.size(s.string(), 8, 128),
  address: address,
  types: s.optional(s.array(s.size(s.string(), 2, 32))),
  arrival_from: s.coerce(ZuluDate, s.string(), toZuluDate),
  arrival_until: s.optional(s.coerce(ZuluDate, s.string(), toZuluDate)),
  real_arrival: s.optional(s.coerce(ZuluDate, s.string(), toZuluDate)),
  real_departure: s.optional(s.coerce(ZuluDate, s.string(), toZuluDate)),
  contact: s.optional(contact),
  packages_to_load: s.array(s.size(s.string(), 8, 128)),
  packages_to_unload: s.array(s.size(s.string(), 8, 128)),
  comment: s.optional(s.size(s.string(), 1, 256))
})

module.exports = {
  point: Point
}
