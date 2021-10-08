const s = require('superstruct')
const { carrier } = require('./carrier')
const { driver } = require('./driver')

const Vehicle = s.object({
  carrier: carrier,
  drivers: s.optional(s.array(driver)),
  plate: s.size(s.string(), 4, 16),
  type: s.size(s.string(), 1, 32),
  information: s.optional(s.size(s.string(), 1, 128)),
  brand: s.optional(s.size(s.string(), 1, 128)),
  packages: s.array(s.size(s.string(), 8, 128)),
});

module.exports = {
  vehicle: Vehicle
}
