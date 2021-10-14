const s = require('superstruct')
const { sfu } = require('../../../index')

const struct = sfu().transport

const transport = {
  id: '17504abf-40ea-4b20-86dd-eb6ff00af325',
  key: 'abeautifullkey',
  vehicles: [
    {
      tracking_provider: 'tracking',
      plate: 'AB 123 CD',
      information: 'blabla',
      vehicle_type: 'transport',
      brand: 'Volvo',
      carrier: {
        code: 'CARRIER'
      },
      drivers:[
        {
          phone: '+352 42 42 42',
          name: 'Driver name'
        }
      ],
      packages: ['17504abf-40ea-4b20-86dd-eb6ff00af325']
    }
  ],
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
    package_type: 'parcel',
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
  points: [
    {
      key: 'this is a good key',
      address: {
        street: '34 Rue Jacques Marjorelle',
        additional_street: 'en face du 35',
        city: 'Ennery',
        zip_code: '57365',
        country: 'FR',
        position: {
          lat: 49.221935,
          lon: 6.217841
        },
        timezone_string: 'Europe/Paris'
      },
      contact: {
        phone: '+352 42 42 42',
        company_name: 'Pizza Express',
        name: 'Woody',
        email: 'morty@schmidt.com'
      },
      packages_to_load: ['17504abf-40ea-4b20-86dd-eb6ff00af325'],
      arrival_from: '2020-09-25T08:00:00Z',
      comment: 'commentary',
      packages_to_unload: [],
      arrival_until: '2020-09-25T08:00:00Z'
    },
    {
      key: 'this is a good key2',
      address: {
        street: '33, another street',
        city: 'Paris',
        zip_code: '75000',
        country: 'FR',
        position: {
          lat: 49.221935,
          lon: 6.217841
        },
        timezone_string: 'Europe/Paris'
      },
      contact: {
        phone: '+352 42 42 42',
        company_name: 'Pizza Express',
        name: 'Woody',
        email: 'morty@schmidt.com'
      },
      packages_to_load: [],
      arrival_from: '2020-09-26T08:00:00Z',
      comment: 'commentary',
      packages_to_unload: ['17504abf-40ea-4b20-86dd-eb6ff00af325'],
      arrival_until: '2020-09-26T08:00:00Z'
    }
  ],
  creator: 'DEMO'
};

describe('Transport object structure', () => {
  test('Success: Transport structure', () => {
    expect(s.is(transport, struct.transport)).toBeTruthy()
  });

  test('Fail: Transport structure mandatory fields are present', () => {
    const [error, entity] = s.validate({}, struct.transport);

    for (const failure of error.failures()) {
      expect(['id', 'key', 'packages', 'points', 'source', 'creator']).toEqual(expect.arrayContaining(failure.path));
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

  test('Success: Transport structure id is defaulted to UUID', () => {
    let t = JSON.parse(JSON.stringify(transport));
    t.id = 'thisisanid';

    expect(s.is(t, struct.transport)).toBeFalsy();

    delete t.id;

    entity = s.create(t, struct.transport);

    expect(entity).toHaveProperty('id');

    expect(s.is(entity, struct.transport)).toBeTruthy();
  });

  test('Success: Transport structure status is defaulted to `planned`', () => {
    let t = JSON.parse(JSON.stringify(transport));
    t.status = 'running';

    let entity = s.create(t, struct.transport);

    expect(entity).toHaveProperty('status', 'running');

    delete t.status;

    entity = s.create(t, struct.transport);

    expect(entity).toHaveProperty('status', 'planned');

    expect(s.is(entity, struct.transport)).toBeTruthy();
  });

  test('Fail: wrong type', () => {
    const [error1] = s.validate({ ...transport, type: 'wrong type' }, struct.transport)

    expect(error1).toBeInstanceOf(s.StructError)
    expect(error1.path[0]).toBe('type')
  });

  test('Success: Point structure type is defaulted to point', () => {
    const [error, entity] = s.validate(transport, struct.transport, { coerce: true })

    expect(error).toBeUndefined()
    expect(entity.type).toBe('transport')
  });
})
