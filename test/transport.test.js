const s = require('superstruct')
const struct = require('../structures/transport')

const transport = {
  id: 'thisisanid',
  type: 'transport',
  key: 'abeautifullkey',
  shippers: ['DEMO'],
  shippers_name: ['Demo corp.'],
  creator: 'TMS',
  status: 'running',
  timestamp: '2020-09-24T08:00:00Z',
  tracking_url: 'https://traking.com/track',
  waybills: 'https://traking.com/waybill',
  archived_at: '2020-09-27T08:00:00Z',
  starting_point: {
    arrival_at: '2020-09-25T08:00:00Z',
    departure_at: '2020-09-25T10:00:00Z',
    address: {
      street: '34 Rue Jacques Marjorelle',
      additional_street: 'en face du 35',
      city: 'Ennery',
      zip_code: '57365',
      country: 'FR',
      province: 'Moselle',
      position: '49.221935,6.217841',
      timezone_string: 'Europe/Paris'
    },
    contact: {
      company: 'Redspher',
      name: 'Vincent Simonin',
      phone: '+33 6 61 10 32 29',
      email: 'vincent.simonin@redspher.com'
    }
  },
  destination_point: {
    arrival_at: '2020-09-26T08:00:00Z',
    departure_at: '2020-09-26T10:00:00Z',
    address: {
      street: 'Via San Vittore, 21',
      city: 'Milan',
      zip_code: '20123',
      country: 'IT',
      timezone_string: 'Europe/Paris',
      position: '45.463762,9.169678'
    },
    contact: {
      company: 'Yoctu',
      name: 'Laurent Venier',
      phone: '+33 6 61 10 32 30',
      email: 'lav@yoctu.com'
    }
  },
  packages_loaded: [
    {
      shipper: 'DEMO',
      width: '50',
      length: 50,
      height: '50',
      weight: 3.3,
      quantity: 1,
      stackable: false,
      track_id: 'test1',
      status: 'waiting_for_pickup'
    },
    {
      shipper: 'DEMO',
      width: 70,
      length: 84,
      height: 94,
      weight: 9,
      quantity: 1,
      stackable: true,
      track_id: 'test2',
      status: 'waiting_for_pickup'
    }
  ],
  vehicle: 'AA-123-BB',
  vehicle_type: 'break',
  vehicle_tracking_provider: 'ftk',
  vehicle_owner: 'DEMOEX',
  vehicle_owner_name: 'FLASH'
}

describe('Transport object structure', () => {
  test('Success: Transport structure', () => {
    expect(s.is(transport, struct.transport)).toBeTruthy()
  })

  test('Fail: Transport structure mandatory fields are present', () => {
    const [error, entity] = s.validate({}, struct.transport)

    for (const failure of error.failures()) {
      expect(['id', 'type', 'key', 'shippers', 'status', 'timestamp', 'status', 'creator', 'starting_point', 'destination_point', 'packages_loaded', 'vehicle', 'vehicle_type']).toEqual(expect.arrayContaining(failure.path))
    }
  })

  test('Fail: key cannot be empty', () => {
    const t = JSON.parse(JSON.stringify(transport))

    expect(s.is(
      Object.assign(t, {
        key: ''
      }), struct.transport)).toBeFalsy()

    expect(s.is(
      Object.assign(t, {
        key: null
      }), struct.transport)).toBeFalsy()

    delete t.key

    expect(s.is(t, struct.transport)).toBeFalsy()
  })

  test('Fail: shippers cannot be empty', () => {
    const t = JSON.parse(JSON.stringify(transport))

    expect(s.is(
      Object.assign(t, {
        shippers: ''
      }),
      struct.transport)).toBeFalsy()

    expect(s.is(
      Object.assign(t, {
        shippers: []
      }), struct.transport)).toBeFalsy()

    expect(s.is(
      Object.assign(t, {
        shippers: ['']
      }), struct.transport)).toBeFalsy()

    expect(s.is(
      Object.assign(t, {
        shippers: [null]
      }), struct.transport)).toBeFalsy()

    expect(s.is(
      Object.assign(t, {
        shippers: null
      }), struct.transport)).toBeFalsy()

    delete t.shippers

    expect(s.is(t, struct.transport)).toBeFalsy()
  })

  test('Fail: creator cannot be empty', () => {
    const t = JSON.parse(JSON.stringify(transport))

    expect(s.is(
      Object.assign(t, {
        creator: ''
      }), struct.transport)).toBeFalsy()

    expect(s.is(
      Object.assign(t, {
        creator: null
      }), struct.transport)).toBeFalsy()

    delete t.creator

    expect(s.is(t, struct.transport)).toBeFalsy()
  })

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

    delete t.vehicle

    expect(s.is(t, struct.transport)).toBeFalsy()
  })

  test('Fail: vehicle_type is mandatory', () => {
    const t = JSON.parse(JSON.stringify(transport))

    expect(s.is(
      Object.assign(t, {
        vehicle_type: ''
      }), struct.transport)).toBeFalsy()

    expect(s.is(
      Object.assign(t, {
        vehicle_type: null
      }), struct.transport)).toBeFalsy()

    delete t.vehicle_type

    expect(s.is(t, struct.transport)).toBeFalsy()
  })

  test('Fail: vehicle_owner is not mandatory', () => {
    const t = JSON.parse(JSON.stringify(transport))

    expect(s.is(
      Object.assign(t, {
        vehicle_owner: ''
      }), struct.transport)).toBeFalsy()

    expect(s.is(
      Object.assign(t, {
        vehicle_owner: null
      }
      ), struct.transport)).toBeFalsy()

    delete t.vehicle_owner

    expect(s.is(t, struct.transport)).toBeTruthy()
  })

  test('Fail: vehicle_owner_name is not mandatory', () => {
    const t = JSON.parse(JSON.stringify(transport))

    expect(s.is(
      Object.assign(t, {
        vehicle_owner_name: ''
      }), struct.transport)).toBeFalsy()

    expect(s.is(
      Object.assign(t, {
        vehicle_owner_name: null
      }
      ), struct.transport)).toBeFalsy()

    delete t.vehicle_owner_name

    expect(s.is(t, struct.transport)).toBeTruthy()
  })

  test('Fail: vehicle_tracking_provider is not mandatory', () => {
    const t = JSON.parse(JSON.stringify(transport))

    expect(s.is(
      Object.assign(t, {
        vehicle_tracking_provider: ''
      }), struct.transport)).toBeFalsy()

    expect(s.is(
      Object.assign(t, {
        vehicle_tracking_provider: null
      }), struct.transport)).toBeFalsy()

    delete t.vehicle_tracking_provider

    expect(s.is(t, struct.transport)).toBeTruthy()
  })

  test('Fail: packages_loaded is mandatory and not empty', () => {
    const t = JSON.parse(JSON.stringify(transport))

    expect(s.is(
      Object.assign(t, {
        packages_loaded: []
      }), struct.transport)).toBeFalsy()

    expect(s.is(
      Object.assign(t, {
        packages_loaded: null
      }), struct.transport)).toBeFalsy()

    expect(s.is(
      Object.assign(t, {
        packages_loaded: [{}, {}]
      }), struct.transport)).toBeFalsy()

    delete t.packages_loaded

    expect(s.is(t, struct.transport)).toBeFalsy()
  })

  test('Success: shippers_name is not mandatory', () => {
    const t = JSON.parse(JSON.stringify(transport))

    delete t.shippers_name

    expect(s.is(t, struct.transport)).toBeTruthy()
  })

  test('Success: Transport structure id is defaulted to UUID', () => {
    let t = JSON.parse(JSON.stringify(transport))

    let entity = s.create(t, struct.transport)

    expect(entity).toHaveProperty('id', 'thisisanid')

    delete t.id

    entity = s.create(t, struct.transport)

    expect(entity).toHaveProperty('id')

    expect(s.is(entity, struct.transport)).toBeTruthy()
  })

  test('Success: Transport structure type is defaulted to `transport`', () => {
    let t = JSON.parse(JSON.stringify(transport))

    let entity = s.create(t, struct.transport)

    expect(entity).toHaveProperty('type', 'transport')

    delete t.type

    entity = s.create(t, struct.transport)

    expect(entity).toHaveProperty('type', 'transport')

    expect(s.is(entity, struct.transport)).toBeTruthy()
  })

  test('Success: Transport structure status is defaulted to `planned`', () => {
    let t = JSON.parse(JSON.stringify(transport))

    let entity = s.create(t, struct.transport)

    expect(entity).toHaveProperty('status', 'running')

    delete t.status

    entity = s.create(t, struct.transport)

    expect(entity).toHaveProperty('status', 'planned')

    expect(s.is(entity, struct.transport)).toBeTruthy()
  })

  test('Success: Transport structure shippers_name is defaulted to shippers', () => {
    let t = JSON.parse(JSON.stringify(transport))

    let entity = s.create(t, struct.transport)

    expect(entity).toHaveProperty('shippers_name', t.shippers_name)

    delete t.shippers_name

    entity = s.create(t, struct.transport)

    expect(entity).toHaveProperty('shippers_name', t.shippers_name)

    expect(s.is(entity, struct.transport)).toBeTruthy()
  })
})
