const s = require('superstruct')
const { vehicle } = require('./vehicle')
const { point } = require('./point')
const { package } = require('./package')
const uuidv4 = require('uuid').v4()
const isUuid = require('is-uuid')

const Uuid = s.define('Uuid', (value) => isUuid.v4(value))

const Transport = s.object({
  id: s.defaulted(Uuid, uuidv4),
  key: s.size(s.string(), 8, 128),
  source: s.size(s.string(), 2, 64),
  packages: s.array(package),
  points: s.array(point),
  vehicles: s.optional(vehicle),
  distances: s.optional(s.array(s.number())),
  waybill: s.optional(s.size(s.string(), 8, 256)),
  tracking_url: s.optional(s.string()),
  incoterm: s.optional(s.size(s.string(), 3)),
})

module.exports = {
  transport: Transport
}
