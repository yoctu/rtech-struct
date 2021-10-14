const s = require('superstruct')

const CODE_SIZE_MIN = 2;
const CODE_SIZE_MAX = 64;

const Carrier = s.object({
  code: s.size(s.string(), CODE_SIZE_MIN, CODE_SIZE_MAX),
})

module.exports = {
  carrier: Carrier,

  CODE_SIZE_MIN,
  CODE_SIZE_MAX
}
