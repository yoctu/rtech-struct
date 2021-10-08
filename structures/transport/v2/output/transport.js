const s = require('superstruct')
const { transport } = require('../transport')
const { vehicle } = require('./vehicle')

const Transport = s.assign(
  transport,
  s.object({
    status: s.enums(['planned', 'cancelled', 'running', 'completed', 'expired']),
    vehicles: s.optional(vehicle),
  })
)

module.exports = {
  transport: Transport
};
