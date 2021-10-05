const s = require('superstruct');
const v4 = require('uuid').v4();
const isUuid = require('is-uuid');
const isEmail = require('is-email');
const { Tz } = require('./lib');

const Uuid = s.define('Uuid', (value) => isUuid.v4(value));
const Email = s.define('Email', isEmail());

const zdReg = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

const Driver = s.object({
  phone: s.optional(s.string()),
  name: s.optional(s.string())
});

const Position = s.object({
  latitude: s.nullable(s.number()),
  longitude: s.nullable(s.number())
});

const Vehicle = s.object({
  last_position: s.optional(Position),
  tracking_provider: s.string(),
  plate: s.size(s.string(), 4, 10),
  information: s.optional(s.string()),
  type: s.string(),
  brand: s.optional(s.string())
});

const Carrier = s.object({
  id: s.string(),
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
  owner: s.string(),
  stackable: s.optional(s.defaulted(s.enums(['no', '1', '2', '3', '4']), 'no')),
  quantity: s.defaulted(s.nullable(s.integer()), 1),
  references: s.optional(s.array(s.string())),
  length: s.nullable(s.number()),
  weight: s.nullable(s.number()),
  type: s.optional(s.defaulted(s.enums(['parcel', 'pallet']), 'parcel')),
  adr: s.optional(ADR),
  width: s.nullable(s.number()),
  comment: s.optional(s.string()),
  good_value: s.optional(GoodValue),
  tracking_id: Uuid,
  height: s.nullable(s.number()),
  status: s.defaulted(s.enums(['waiting_for_pickup', 'pickup_delayed', 'picked_up', 'delivery_delayed', 'delivered']), 'waiting_for_pickup')
});

const Address = s.object({
  additional_street: s.optional(s.string()),
  country: s.string(),
  city: s.string(),
  street: s.string(),
  timezone: Tz,
  position: Position,
  zip_code: s.string()
});

const Contact = s.object({
  phone: s.optional(s.string()),
  company_name: s.string(),
  name: s.optional(s.string()),
  email: s.optional(Email)
});

const toDateTime = value => {
  return value.slice(-1) !== 'Z' ? value + 'Z' : value;
};

const Point = s.object({
  address: Address,
  real_departure: s.optional(s.coerce(s.pattern(s.date(), zdReg), s.string(), toDateTime)),
  contact: Contact,
  packages_to_load: s.array(Uuid),
  arrival_from: s.coerce(s.pattern(s.date(), zdReg), s.string(), toDateTime),
  comment: s.optional(s.string()),
  id: s.defaulted(Uuid, () => { new v4(); }),
  real_arrival: s.optional(s.coerce(s.pattern(s.date(), zdReg), s.string(), toDateTime)),
  packages_to_unload: s.array(Uuid),
  arrival_until: s.optional(s.coerce(s.pattern(s.date(), zdReg), s.string(), toDateTime))
});

const Transport = s.object({
  id: s.defaulted(Uuid, () => { new v4(); }),
  key: s.string(),
  carrier: Carrier,
  distances: s.optional(s.array(s.nullable(s.number()))),
  waybill: s.optional(s.string()),
  incoterm: s.optional(s.string()),
  source: s.string(),
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
