const s = require('superstruct')
const { position } = require('./address')

const VehiclePosition = s.object({
  data: position
})

module.exports = {
  vehiclePosition: VehiclePosition
}
