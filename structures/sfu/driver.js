const s = require('superstruct');

const PHONE_SIZE_MIN = 1;
const PHONE_SIZE_MAX = 256;

const NAME_SIZE_MIN = 1;
const NAME_SIZE_MAX = 256;

const Driver = s.object({
  phone: s.optional(s.size(s.string(), PHONE_SIZE_MIN, PHONE_SIZE_MAX)),
  name: s.size(s.string(), NAME_SIZE_MIN, NAME_SIZE_MAX)
});

module.exports = {
  driver: Driver
}
