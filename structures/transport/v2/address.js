const s = require('superstruct');
const { Tz } = require('../../lib');

const Position = s.object({
  lat: s.size(s.number(), -90, 90),
  lon: s.size(s.number(), -180, 180),
});

const Address = s.object({
  street: s.size(s.string(), 1, 128),
  additional_street: s.optional(s.size(s.string(), 1, 128)),
  city: s.size(s.string(), 1, 38),
  zip_code: s.size(s.string(), 1, 32),
  province: s.optional(s.size(s.string(), 1, 128)),
  country: s.size(s.string(), 2),
  timezone_string: Tz,
  position: Position
});

module.exports = {
  address: Address,
  position: Position
}
