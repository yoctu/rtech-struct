const s = require('superstruct');
const uuidv4 = require('uuid').v4();
const isUuid = require('is-uuid');
const isEmail = require('is-email');
const { Tz } = require('./lib');

const Uuid = s.define('Uuid', (value) => isUuid.v4(value));
const Email = s.define('Email', isEmail);

const Driver = s.object({
  phone: s.optional(s.string()),
  name: s.optional(s.string())
});

const Position = s.object({
  lat: s.size(s.number(), -90, 90),
  lon: s.size(s.number(), -180, 180),
});

const Vehicle = s.object({
  last_position: s.optional(Position),
  tracking_provider: s.size(s.string(), 1, 16),
  plate: s.size(s.string(), 4, 16),
  information: s.optional(s.size(s.string(), 1, 128),),
  type: s.size(s.string(), 1, 32),
  brand: s.optional(s.size(s.string(), 1, 128)),
});

const Carrier = s.object({
  id: s.size(s.string(), 2, 64),
  drivers: s.optional(s.array(Driver)),
  vehicle: Vehicle
});

const ADR = s.object({
  un_code: s.optional(s.string()),
  class: s.optional(s.string()),
  packing_group: s.optional(s.string())
});

const GoodValue = s.object({
  currency: s.optional(s.string()),
  value: s.nullable(s.number())
});

const Package = s.object({
  owner: s.size(s.string(), 2, 64),
  stackable: s.defaulted(s.enums(['no', '1', '2', '3', '4']), 'no'),
  quantity: s.defaulted(s.nullable(s.integer()), 1),
  references: s.optional(s.array(s.size(s.string(), 1, 128))),
  length: s.number(),
  weight: s.number(),
  type: s.optional(s.defaulted(s.enums(['parcel', 'pallet']), 'parcel')),
  adr: s.optional(ADR),
  width: s.number(),
  comment: s.optional(s.size(s.string(), 1, 256)),
  good_value: s.optional(GoodValue),
  tracking_id: Uuid,
  height: s.number(),
  status: s.defaulted(s.enums(['waiting_for_pickup', 'pickup_delayed', 'picked_up', 'delivery_delayed', 'delivered']), 'waiting_for_pickup')
});

const Address = s.object({
  street: s.size(s.string(), 1, 128),
  additional_street: s.optional(s.size(s.string(), 1, 128)),
  city: s.size(s.string(), 1, 38),
  zip_code: s.size(s.string(), 1, 32),
  country: s.size(s.string(), 2),
  timezone: Tz,
  position: Position
});

const Contact = s.object({
  phone: s.optional(s.size(s.string(), 1, 32)),
  company_name: s.size(s.string(), 1, 64),
  name: s.optional(s.size(s.string(), 1, 64)),
  email: s.optional(Email)
});

const toZuluDate = value => {
  return value.slice(-1) !== 'Z' ? value + 'Z' : value;
};

const ZuluDate = require('./lib').zouloudate(s);

const Point = s.object({
  id: s.defaulted(Uuid, () => { return uuidv4(); }),
  address: Address,
  real_departure: s.optional(s.coerce(ZuluDate, s.string(), toZuluDate)),
  contact: s.optional(Contact),
  packages_to_load: s.array(Uuid),
  arrival_from: s.coerce(ZuluDate, s.string(), toZuluDate),
  comment: s.optional(s.size(s.string(), 1, 256)),
  real_arrival: s.optional(s.coerce(ZuluDate, s.string(), toZuluDate)),
  packages_to_unload: s.array(Uuid),
  arrival_until: s.optional(s.coerce(ZuluDate, s.string(), toZuluDate))
});

const Transport = s.object({
  id: s.defaulted(Uuid, () => { return new uuidv4(); }),
  key: s.size(s.string(), 8, 128),
  carrier: s.optional(Carrier),
  distances: s.optional(s.array(s.number())),
  waybill: s.optional(s.size(s.string(), 8, 256)),
  incoterm: s.optional(s.size(s.string(), 3)),
  source: s.size(s.string(), 2, 64),
  packages: s.array(Package),
  tracking_url: s.optional(s.string()),
  status: s.defaulted(s.enums(['planned', 'cancelled', 'running', 'completed', 'expired']), 'planned'),
  points: s.array(Point)
});

module.exports = {
  driver: Driver,
  position: Position,
  vehicle: Vehicle,
  carrier: Carrier,
  adr: ADR,
  goodvalue: GoodValue,
  package: Package,
  address: Address,
  contact: Contact,
  point: Point,
  transport: Transport
};
