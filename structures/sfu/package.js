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

const TRACKING_ID_SIZE_MIN = 8;
const TRACKING_ID_SIZE_MAX = 128;

const OWNER_SIZE_MIN = 2;
const OWNER_SIZE_MAX = 64;

const REFERENCE_SIZE_MIN = 0;
const REFERENCE_SIZE_MAX = 128;

const REFERENCES_LENGTH_MIN = 1;
const REFERENCES_LENGTH_MAX = 5;

const COMMENT_SIZE_MIN = 1;
const COMMENT_SIZE_MAX = 256;

const ENTITY_TYPE = 'sfu/package';

const Package = s.object({
  tracking_id: s.defaulted(s.size(s.string(), TRACKING_ID_SIZE_MIN, TRACKING_ID_SIZE_MAX), uuidv4),
  owner: s.size(s.string(), OWNER_SIZE_MIN, OWNER_SIZE_MAX),
  status: s.optional(s.defaulted(s.enums(['waiting_for_pickup', 'pickup_delayed', 'picked_up', 'delivery_delayed', 'delivered']), 'waiting_for_pickup')),
  stackable: s.defaulted(s.enums(['no', '1', '2', '3', '4']), 'no'),
  quantity: s.defaulted(s.integer(), 1),
  references: s.optional(s.size(s.array(s.size(s.string(), REFERENCE_SIZE_MIN, REFERENCE_SIZE_MAX)), REFERENCES_LENGTH_MIN, REFERENCES_LENGTH_MAX)),
  length: s.min(s.number(), 0),
  width: s.min(s.number(), 0),
  height: s.min(s.number(), 0),
  weight: s.min(s.number(), 0),
  package_type: s.optional(s.defaulted(s.enums(['parcel', 'pallet']), 'parcel')),
  type: s.defaulted(s.optional(s.literal(ENTITY_TYPE)), ENTITY_TYPE),
  adr: s.optional(ADR),
  comment: s.optional(s.size(s.string(), COMMENT_SIZE_MIN, COMMENT_SIZE_MAX)),
  good_value: s.optional(GoodValue)
});

module.exports = {
  transportPackage: Package,

  TRACKING_ID_SIZE_MIN,
  TRACKING_ID_SIZE_MAX,

  OWNER_SIZE_MIN,
  OWNER_SIZE_MAX,

  REFERENCE_SIZE_MIN,
  REFERENCE_SIZE_MAX,

  REFERENCES_LENGTH_MIN,
  REFERENCES_LENGTH_MAX,

  COMMENT_SIZE_MIN,
  COMMENT_SIZE_MAX,

  ENTITY_TYPE
}
