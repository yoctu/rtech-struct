const s = require('superstruct')
const isUuid = require('is-uuid')
const { zouloudate } = require('../lib')
const uuid = require('uuid')

const Uuid = s.define('Uuid', (value) => isUuid.v4(value))
const ZoulouDate = zouloudate(s)

const ENTITY_TYPE = 'sfu/event'

const KEY_SIZE_MIN = 8;
const KEY_SIZE_MAX = 128;

const SOURCE_SIZE_MIN = 2;
const SOURCE_SIZE_MAX = 64;

const Event = s.object({
	id: s.defaulted(s.optional(Uuid), uuid.v4),
	type: s.defaulted(s.optional(s.literal(ENTITY_TYPE)), ENTITY_TYPE),
	created_at: s.defaulted(s.optional(ZoulouDate), () => (new Date()).toISOString()),
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
