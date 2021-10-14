const s = require('superstruct');
const uuidv4 = require('uuid').v4();

const ADR = s.object({
  un_code: s.string(),
  class: s.string(),
  packing_group: s.string()
});

const GoodValue = s.object({
  currency: s.size(s.string(), 3),
  value: s.min(s.number(), 0)
});

const Package = s.object({
  tracking_id: s.defaulted(s.size(s.string(), 8, 128), uuidv4),
  owner: s.size(s.string(), 2, 64),
  status: s.optional(s.defaulted(s.enums(['waiting_for_pickup', 'pickup_delayed', 'picked_up', 'delivery_delayed', 'delivered']), 'waiting_for_pickup')),
  stackable: s.defaulted(s.enums(['no', '1', '2', '3', '4']), 'no'),
  quantity: s.defaulted(s.integer(), 1),
  references: s.optional(s.size(s.array(s.size(s.string(), 0, 128)), 1, 5)),
  length: s.min(s.number(), 0),
  width: s.min(s.number(), 0),
  height: s.min(s.number(), 0),
  weight: s.min(s.number(), 0),
  package_type: s.optional(s.defaulted(s.enums(['parcel', 'pallet']), 'parcel')),
  type: s.defaulted(s.optional(s.literal('package')), 'package'),
  adr: s.optional(ADR),
  comment: s.optional(s.size(s.string(), 1, 256)),
  good_value: s.optional(GoodValue)
});

module.exports = {
  transportPackage: Package
}
