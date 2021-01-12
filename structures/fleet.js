const s = require('superstruct')

const Vehicle = s.defaulted(s.masked(
  s.type({
    id: s.size(s.string(), 1, 64),
    name: s.optional(s.size(s.string(), 2, 64)),
    driver: s.size(s.string(), 2, 64),
    provider: s.enums(['ftk', 'shippeo']),
    plate: s.size(s.string(), 2, 32)
  })
), {
  id: Math.random().toString(36).substring(7),
  driver: Math.random().toString(36).substring(7),
  provider: 'ftk',
  plate: Math.random().toString(36).substring(7)
})

const Fleet = s.array(Vehicle)

module.exports = {
  vehicle: Vehicle,
  fleet: Fleet
}
