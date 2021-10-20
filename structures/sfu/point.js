const s = require('superstruct')
const { contact } = require('./contact')
const { address } = require('./address')
const { TRACKING_ID_SIZE_MIN, TRACKING_ID_SIZE_MAX } = require('./package')

const IsoDate = require('../lib').isodate(s)

const KEY_SIZE_MIN = 8;
const KEY_SIZE_MAX = 128;

const POINT_TYPE_SIZE_MIN = 2;
const POINT_TYPE_SIZE_MAX = 32;

const COMMENT_SIZE_MIN = 1;
const COMMENT_SIZE_MAX = 256;

const ENTITY_TYPE = 'sfu/point';

const Point = s.object({
  key: s.size(s.string(), KEY_SIZE_MIN, KEY_SIZE_MAX),
  address: address,
  point_types: s.optional(s.array(s.size(s.string(), POINT_TYPE_SIZE_MIN, POINT_TYPE_SIZE_MAX))),
  type: s.defaulted(s.optional(s.literal(ENTITY_TYPE)), ENTITY_TYPE),
  arrival_from: IsoDate,
  arrival_until: s.optional(IsoDate),
  real_arrival: s.optional(IsoDate),
  real_departure: s.optional(IsoDate),
  contact: s.optional(contact),
  packages_to_load: s.array(s.size(s.string(), TRACKING_ID_SIZE_MIN, TRACKING_ID_SIZE_MAX)),
  packages_to_unload: s.array(s.size(s.string(), TRACKING_ID_SIZE_MIN, TRACKING_ID_SIZE_MAX)),
  comment: s.optional(s.size(s.string(), COMMENT_SIZE_MIN, COMMENT_SIZE_MAX))
})

module.exports = {
  point: Point,

  KEY_SIZE_MIN,
  KEY_SIZE_MAX,

  POINT_TYPE_SIZE_MIN,
  POINT_TYPE_SIZE_MAX,

  COMMENT_SIZE_MIN,
  COMMENT_SIZE_MAX,

  ENTITY_TYPE
}
