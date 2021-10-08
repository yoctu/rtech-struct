const s = require('superstruct')
const { vehicle } = require('./vehicle')
const { point } = require('./point')
const { transportPackage } = require('./package')
const uuidv4 = require('uuid').v4()
const isUuid = require('is-uuid')

const Uuid = s.define('Uuid', (value) => isUuid.v4(value))

const Transport = s.object({
  id: s.defaulted(Uuid, uuidv4),
  key: s.size(s.string(), 8, 128),
  status: s.optional(s.defaulted(s.enums(['planned', 'cancelled', 'running', 'completed', 'expired']), 'planned')),
  source: s.size(s.string(), 2, 64),
  packages: s.array(transportPackage),
  points: s.size(s.array(point), 2, 50),
  vehicles: s.optional(s.array(vehicle)),
  distances: s.optional(s.array(s.number())),
  waybill: s.optional(s.size(s.string(), 8, 256)),
  tracking_url: s.optional(s.string()),
  incoterm: s.optional(s.size(s.string(), 3)),
  creator: s.size(s.string(), 2, 32)
})

module.exports = {
  transport: Transport
}
