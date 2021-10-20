const s = require('superstruct');

const PHONE_SIZE_MIN = 1;
const PHONE_SIZE_MAX = 256;

const NAME_SIZE_MIN = 1;
const NAME_SIZE_MAX = 256;

const ENTITY_TYPE = 'sfu/driver';

const Driver = s.object({
  phone: s.optional(s.size(s.string(), PHONE_SIZE_MIN, PHONE_SIZE_MAX)),
  name: s.size(s.string(), NAME_SIZE_MIN, NAME_SIZE_MAX),
  type: s.defaulted(s.optional(s.literal(ENTITY_TYPE)), ENTITY_TYPE)
});

module.exports = {
  driver: Driver,

  ENTITY_TYPE
}
