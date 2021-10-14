const s = require('superstruct');
const { Tz } = require('../lib');

const Position = s.object({
  lat: s.size(s.number(), -90, 90),
  lon: s.size(s.number(), -180, 180),
});

const STREET_SIZE_MIN = 1;
const STREET_SIZE_MAX = 128;

const ADDITIONAL_STREET_SIZE_MIN = 1;
const ADDITIONAL_STREET_SIZE_MAX = 128;

const CITY_SIZE_MIN = 1;
const CITY_SIZE_MAX = 64;

const ZIP_CODE_SIZE_MIN = 1;
const ZIP_CODE_SIZE_MAX = 32;

const PROVINCE_SIZE_MIN = 1;
const PROVINCE_SIZE_MAX = 128;

const COUNTRY_SIZE = 2;

const Address = s.object({
  street: s.size(s.string(), STREET_SIZE_MIN, STREET_SIZE_MAX),
  additional_street: s.optional(s.size(s.string(), ADDITIONAL_STREET_SIZE_MIN, ADDITIONAL_STREET_SIZE_MAX)),
  city: s.size(s.string(), CITY_SIZE_MIN, CITY_SIZE_MAX),
  zip_code: s.size(s.string(), ZIP_CODE_SIZE_MIN, ZIP_CODE_SIZE_MAX),
  province: s.optional(s.size(s.string(), PROVINCE_SIZE_MIN, PROVINCE_SIZE_MAX)),
  country: s.size(s.string(), COUNTRY_SIZE),
  timezone_string: Tz,
  position: Position
});

module.exports = {
  address: Address,
  position: Position,

  STREET_SIZE_MIN,
  STREET_SIZE_MAX,

  ADDITIONAL_STREET_SIZE_MIN,
  ADDITIONAL_STREET_SIZE_MAX,

  CITY_SIZE_MIN,
  CITY_SIZE_MAX,

  ZIP_CODE_SIZE_MIN,
  ZIP_CODE_SIZE_MAX,

  PROVINCE_SIZE_MIN,
  PROVINCE_SIZE_MAX,

  COUNTRY_SIZE
}
