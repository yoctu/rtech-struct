const s = require('superstruct');
const struct = require('../structures/transport');

const transport = {
  id: '17504abf-40ea-4b20-86dd-eb6ff00af325',
  key: 'abeautifullkey',
  carrier: {
    id: 'anID',
    drivers:
      [{
        phone: '+352 42 42 42',
        name: 'Driver name'
      }],
    vehicle: {
      last_position: {
        lat: '49.221935',
        lon: '6.217841'
      },
      tracking_provider: 'tracking',
      plate: 'AB 123 CD',
      information: 'blabla',
      type: 'transport',
      brand: 'Volvo'
    }
  },
  distances: [1.5, 2, 3.4],
  waybill: 'https://traking.com/waybill',
  incoterm: 'ABC',
  source: 'Evian',
  packages: [{
    owner: 'owner',
    stackable: 'no',
    quantity: 1,
    references: ['ref1', 'ref2'],
    width: 50,
    length: 50,
    height: 50,
    weight: 3.3,
    type: 'parcel',
    adr: {
      un_code: 'un_code',
      class: '1',
      packing_group: '2'
    },
    comment: 'commentary',
    good_value: {
      currency: 'USD',
      value: 42.42
    },
    tracking_id: '17504abf-40ea-4b20-86dd-eb6ff00af325',
    status: 'waiting_for_pickup'
  }],
  tracking_url: 'https://traking.com/track',
  status: 'running',
  points: [{
    address: {
      street: '34 Rue Jacques Marjorelle',
      additional_street: 'en face du 35',
      city: 'Ennery',
      zip_code: '57365',
      country: 'FR',
      position: {
        lat: '49.221935',
        lon: '6.217841'
      },
      timezone: 'Europe/Paris'
    },
    real_departure: '2020-09-25T08:00:00Z',
    contact: {
      phone: '+352 42 42 42',
      company_name: 'Pizza Express',
      name: 'Woody',
      email: 'morty@schmidt.com'
    },
    packages_to_load: ['42b05af4-b74c-4307-b3f7-b795d2df6ec2', 'f462f860-4230-43c9-8fe7-2fcbfd03b080'],
    arrival_from: '2020-09-25T08:00:00Z',
    comment: 'commentary',
    id: 'd996f34e-d849-41a9-a691-bd9834f63eed',
    real_arrival: '2020-09-25T08:00:00Z',
    packages_to_unload: ['42b05af4-b74c-4307-b3f7-b795d2df6ec2', 'f462f860-4230-43c9-8fe7-2fcbfd03b080'],
    arrival_until: '2020-09-25T08:00:00Z'
  }]
};

describe('Transport object structure', () => {
  test('Success: Transport structure', () => {
    expect(s.is(transport, struct.transport)).toBeTruthy()
  });

  test('Fail: Transport structure mandatory fields are present', () => {
    const [error, entity] = s.validate({}, struct.transport);

    for (const failure of error.failures()) {
      expect(['id', 'key', 'carrier', 'status', 'packages', 'points', 'source']).toEqual(expect.arrayContaining(failure.path));
    }
  });

  test('Fail: key cannot be empty', () => {
    const t = JSON.parse(JSON.stringify(transport));

    expect(s.is(
      Object.assign(t, {
        key: ''
      }), struct.transport)).toBeFalsy();

    expect(s.is(
      Object.assign(t, {
        key: null
      }), struct.transport)).toBeFalsy();

    delete t.key;

    expect(s.is(t, struct.transport)).toBeFalsy();
  });

  test('Fail: creator cannot be empty', () => {
    const t = JSON.parse(JSON.stringify(transport));

    expect(s.is(
      Object.assign(t, {
        creator: ''
      }), struct.transport)).toBeFalsy();

    expect(s.is(
      Object.assign(t, {
        creator: null
      }), struct.transport)).toBeFalsy();

    delete t.creator;

    expect(s.is(t, struct.transport)).toBeFalsy();
  });

  test('Fail: vehicle is mandatory', () => {
    const t = JSON.parse(JSON.stringify(transport))

    expect(s.is(
      Object.assign(t, {
        vehicle: ''
      }), struct.transport)).toBeFalsy()

    expect(s.is(
      Object.assign(t, {
        vehicle: null
      }), struct.transport)).toBeFalsy()

    delete t.vehicle;

    expect(s.is(t, struct.transport)).toBeFalsy();
  });

  test('Success: Transport structure id is defaulted to UUID', () => {
    let t = JSON.parse(JSON.stringify(transport));

    let entity = s.create(t, struct.transport);

    expect(entity).toHaveProperty('id', 'thisisanid');

    delete t.id;

    entity = s.create(t, struct.transport);

    expect(entity).toHaveProperty('id');

    expect(s.is(entity, struct.transport)).toBeTruthy();
  });

  test('Success: Transport structure status is defaulted to `planned`', () => {
    let t = JSON.parse(JSON.stringify(transport));

    let entity = s.create(t, struct.transport);

    expect(entity).toHaveProperty('status', 'running');

    delete t.status;

    entity = s.create(t, struct.transport);

    expect(entity).toHaveProperty('status', 'planned');

    expect(s.is(entity, struct.transport)).toBeTruthy();
  });
})
