const s = require('superstruct')
const { carrier } = require('./carrier')
const { driver } = require('./driver')
const { TRACKING_ID_SIZE_MIN, TRACKING_ID_SIZE_MAX } = require('./package')

const TRACKING_PROVIDER_SIZE_MIN = 2;
const TRACKING_PROVIDER_SIZE_MAX = 32;

const PLATE_SIZE_MIN = 1;
const PLATE_SIZE_MAX = 64;

const VEHICLE_TYPE_SIZE_MIN = 1;
const VEHICLE_TYPE_SIZE_MAX = 32;

const INFORMATION_SIZE_MIN = 1;
const INFORMATION_SIZE_MAX = 128;

const BRAND_SIZE_MIN = 1;
const BRAND_SIZE_MAX = 128;

const Vehicle = s.object({
  carrier: carrier,
  drivers: s.optional(s.array(driver)),
  tracking_provider: s.size(s.string(), TRACKING_PROVIDER_SIZE_MIN, TRACKING_PROVIDER_SIZE_MAX),
  plate: s.size(s.string(), PLATE_SIZE_MIN, PLATE_SIZE_MAX),
  vehicle_type: s.size(s.string(), VEHICLE_TYPE_SIZE_MIN, VEHICLE_TYPE_SIZE_MAX),
  type: s.defaulted(s.optional(s.literal('vehicle')), 'vehicle'),
  information: s.optional(s.size(s.string(), INFORMATION_SIZE_MIN, INFORMATION_SIZE_MAX)),
  brand: s.optional(s.size(s.string(), BRAND_SIZE_MIN, BRAND_SIZE_MAX)),
  packages: s.array(s.size(s.string(), TRACKING_ID_SIZE_MIN, TRACKING_ID_SIZE_MAX)),
});

module.exports = {
  vehicle: Vehicle,

  TRACKING_PROVIDER_SIZE_MIN,
  TRACKING_PROVIDER_SIZE_MAX,

  PLATE_SIZE_MIN,
  PLATE_SIZE_MAX,

  VEHICLE_TYPE_SIZE_MIN,
  VEHICLE_TYPE_SIZE_MAX,

  INFORMATION_SIZE_MIN,
  INFORMATION_SIZE_MAX,

  BRAND_SIZE_MIN,
  BRAND_SIZE_MAX
}
