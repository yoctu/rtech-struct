const s = require('superstruct')

const CODE_SIZE_MIN = 2;
const CODE_SIZE_MAX = 64;

const ENTITY_TYPE = 'sfu/carrier';

const Carrier = s.object({
  code: s.size(s.string(), CODE_SIZE_MIN, CODE_SIZE_MAX),
  type: s.defaulted(s.optional(s.literal(ENTITY_TYPE)), ENTITY_TYPE)
})

module.exports = {
  carrier: Carrier,

  CODE_SIZE_MIN,
  CODE_SIZE_MAX,

  ENTITY_TYPE
}
