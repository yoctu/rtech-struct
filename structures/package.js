const s = require('superstruct')
const { Adr } = require('./adr')
const { PositiveNumber, PositiveInteger } = require('./number')
const { NoEmptyString } = require('./string')

const Package = s.object({
  tracking_id: NoEmptyString,
  owner: NoEmptyString,
  height: PositiveNumber,
  length: PositiveNumber,
  width: PositiveNumber,
  weight: PositiveNumber,
  stackable: s.defaulted(s.optional(s.enums(['no', '1', '2', '3', '4'])), 'no'),
  quantity: s.defaulted(s.optional(PositiveInteger), 1),
  package_type: s.defaulted(s.optional(s.enums(['parcel', 'pallet'])), 'parcel'),
  references: s.defaulted(s.optional(s.array(NoEmptyString)), []),
  adr: s.optional(Adr),
  status: s.defaulted(
    s.optional(s.enums(['waiting_for_pickup', 'pickup_delayed', 'picked_up', 'delivery_delayed', 'delivered'])),
    'waiting_for_pickup'
  ),
  comment: s.optional(s.string())
})

module.exports = {
  Package: Package
}
