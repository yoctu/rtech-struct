const s = require('superstruct');

const Driver = s.object({
  phone: s.optional(s.size(s.string(), 1, 32)),
  name: s.size(s.string(), 1, 64)
});

module.exports = {
  driver: Driver
}
