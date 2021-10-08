const s = require('superstruct')
const { vehicle } = require('../vehicle')
const { position } = require('../address')

const Vehicle = s.assign(
  vehicle,
  s.object({
    last_position: position,
  })
)

module.exports = {
  vehicle: Vehicle
}
