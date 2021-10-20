const s = require('superstruct')
const { vehicle } = require('./vehicle')
const { point } = require('./point')
const { transportPackage } = require('./package')
const uuidv4 = require('uuid').v4()
const isUuid = require('is-uuid')

const Uuid = s.define('Uuid', (value) => isUuid.v4(value))

const KEY_SIZE_MIN = 8;
const KEY_SIZE_MAX = 128;

const SOURCE_SIZE_MIN = 2;
const SOURCE_SIZE_MAX = 64;

const POINTS_LENGTH_MIN = 2;
const POINTS_LENGTH_MAX = 50;

const WAYBILL_SIZE_MIN = 8;
const WAYBILL_SIZE_MAX = 256;

const INCOTERM_SIZE = 3;

const CREATOR_SIZE_MIN = 2;
const CREATOR_SIZE_MAX = 32;

const ENTITY_TYPE = 'sfu/transport';

const Transport = s.object({
  id: s.defaulted(Uuid, uuidv4),
  key: s.size(s.string(), KEY_SIZE_MIN, KEY_SIZE_MAX),
  type: s.defaulted(s.optional(s.literal(ENTITY_TYPE)), ENTITY_TYPE),
  status: s.optional(s.defaulted(s.enums(['planned', 'cancelled', 'running', 'completed', 'expired']), 'planned')),
  source: s.size(s.string(), SOURCE_SIZE_MIN, SOURCE_SIZE_MAX),
  packages: s.array(transportPackage),
  points: s.size(s.array(point), POINTS_LENGTH_MIN, POINTS_LENGTH_MAX),
  vehicles: s.optional(s.array(vehicle)),
  distances: s.optional(s.array(s.number())),
  waybill: s.optional(s.size(s.string(), WAYBILL_SIZE_MIN, WAYBILL_SIZE_MAX)),
  tracking_url: s.optional(s.string()),
  incoterm: s.optional(s.size(s.string(), INCOTERM_SIZE)),
  creator: s.size(s.string(), CREATOR_SIZE_MIN, CREATOR_SIZE_MAX)
})

module.exports = {
  transport: Transport,

  KEY_SIZE_MIN,
  KEY_SIZE_MAX,

  SOURCE_SIZE_MIN,
  SOURCE_SIZE_MAX,

  POINTS_LENGTH_MIN,
  POINTS_LENGTH_MAX,

  WAYBILL_SIZE_MIN,
  WAYBILL_SIZE_MAX,

  INCOTERM_SIZE,

  CREATOR_SIZE_MIN,
  CREATOR_SIZE_MAX,

  ENTITY_TYPE
}
