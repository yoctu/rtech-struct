const s = require('superstruct');
const uuidv4 = require('uuid').v4();

const ADR = s.object({
  un_code: s.optional(s.string()),
  class: s.optional(s.string()),
  packing_group: s.optional(s.string())
});

const GoodValue = s.object({
  currency: s.size(s.string(), 2),
  value: s.min(s.number(), 0)
});

const Package = s.object({
  tracking_id: s.defaulted(s.size(s.string(), 8, 128), () => { return new uuidv4(); }),
  owner: s.size(s.string(), 2, 64),
  stackable: s.defaulted(s.enums(['no', '1', '2', '3', '4']), 'no'),
  quantity: s.defaulted(s.nullable(s.integer()), 1),
  references: s.optional(s.array(s.size(s.string(), 1, 128))),
  length: s.min(s.number(), 0),
  width: s.min(s.number(), 0),
  height: s.min(s.number(), 0),
  weight: s.min(s.number(), 0),
  type: s.optional(s.defaulted(s.enums(['parcel', 'pallet']), 'parcel')),
  adr: s.optional(ADR),
  comment: s.optional(s.size(s.string(), 1, 256)),
  good_value: s.optional(GoodValue)
});

module.exports = {
  package: Package
}
