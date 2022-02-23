const s = require('superstruct')
const Contact = require('./contact').contact
const Address = require('./address').address
const Url = s.define('Url', require('is-url'))

const Integer = s.define('Integer', (value) => {
  return typeof value === 'number' && value.toString().match(/^\d+$/) !== null
})

const toZoulouDate = value => {
  return value.slice(-1) !== 'Z' ? value + 'Z' : value
}

const { ZuluDateTimeStruct } = require('./lib');

const Point = s.object({
  arrival_at: s.coerce(ZuluDateTimeStruct, s.string(), toZoulouDate),
  departure_at: s.coerce(ZuluDateTimeStruct, s.string(), toZoulouDate),
  arrival_at_range: s.optional(s.string()),
  departure_at_range: s.optional(s.string()),
  address: Address,
  contact: s.optional(Contact)
})

const Package = s.object({
  shipper: s.size(s.string(), 2, Infinity),
  width: s.union([s.number(), s.pattern(s.string(), /^\d+(\.\d+)?$/)]),
  length: s.union([s.number(), s.pattern(s.string(), /^\d+(\.\d+)?$/)]),
  height: s.union([s.number(), s.pattern(s.string(), /^\d+(\.\d+)?$/)]),
  weight: s.union([s.number(), s.pattern(s.string(), /^\d+(\.\d+)?$/)]),
  quantity: s.defaulted(s.union([Integer, s.pattern(s.string(), /^\d+$/)]), 1),
  status: s.defaulted(s.enums(['waiting_for_pickup', 'pickup_delayed', 'picked_up', 'delivery_delayed', 'delivered']), 'waiting_for_pickup'),
  reference: s.optional(s.size(s.string(), 1, Infinity)),
  track_id: s.defaulted(s.string(), value => {
    return require('uuid').v4()
  }),
  stackable: s.defaulted(s.boolean(), false)
})

const Transport = s.object({
  id: s.defaulted(s.string(), value => {
    return require('uuid').v4()
  }),
  type: s.defaulted(s.pattern(s.string(), /transport/), value => {
    return 'transport'
  }),
  key: s.size(s.string(), 8, Infinity),
  shippers: s.size(s.array(s.size(s.string(), 2, Infinity)), 1, Infinity),
  shippers_name: s.optional(s.size(s.array(s.size(s.string(), 2, Infinity)), 1, Infinity)),
  status: s.defaulted(s.enums(['planned', 'cancelled', 'running', 'completed', 'expired']), 'planned'),
  timestamp: s.defaulted(ZuluDateTimeStruct, () => (new Date()).toISOString()),
  archived_at: s.optional(ZuluDateTimeStruct),
  tracking_url: s.optional(Url),
  waybills: s.optional(s.size(s.string(), 8, Infinity)),
  creator: s.size(s.string(), 2, Infinity),
  starting_point: Point,
  destination_point: Point,
  packages_loaded: s.size(s.array(Package), 1, Infinity),
  vehicle: s.size(s.string(), 2, Infinity),
  vehicle_type: s.size(s.string(), 2, Infinity),
  vehicle_owner: s.optional(s.size(s.string(), 2, Infinity)),
  vehicle_owner_name: s.optional(s.size(s.string(), 2, Infinity)),
  vehicle_tracking_provider: s.optional(s.size(s.string(), 3, Infinity))
})

module.exports = {
  address: Address,
  contact: Contact,
  point: Point,
  package: Package,
  transport: Transport
}
