const s = require('superstruct');

const Driver = s.object({
  phone: s.optional(s.string()),
  name: s.optional(s.string())
});

module.exports = {
  driver: Driver
}
