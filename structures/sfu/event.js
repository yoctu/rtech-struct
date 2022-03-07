const s = require('superstruct')
const isUuid = require('is-uuid')
const { ZuluDateTimeStruct } = require('../lib');
const uuid = require('uuid')

const Uuid = s.define('Uuid', (value) => isUuid.v4(value))

const ENTITY_TYPE = 'sfu/event'
const ENTITY_TYPE_PATTERN = /^(sfu\/event){1}(\/.*)?$/

const KEY_SIZE_MIN = 8;
const KEY_SIZE_MAX = 128;

const SOURCE_SIZE_MIN = 2;
const SOURCE_SIZE_MAX = 64;

const Event = s.object({
  id: s.defaulted(s.optional(Uuid), uuid.v4),
  type: s.defaulted(s.optional(s.pattern(s.string(), ENTITY_TYPE_PATTERN)), ENTITY_TYPE),
  created_at: s.defaulted(s.optional(ZuluDateTimeStruct), () => (new Date()).toISOString()),
  key: s.size(s.string(), KEY_SIZE_MIN, KEY_SIZE_MAX),
  content: s.object(),
  source: s.size(s.string(), SOURCE_SIZE_MIN, SOURCE_SIZE_MAX),
})

module.exports = {
  event: Event,

  KEY_SIZE_MIN,
  KEY_SIZE_MAX,

  SOURCE_SIZE_MIN,
  SOURCE_SIZE_MAX
}
