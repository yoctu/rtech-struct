const s = require('superstruct')
const struct = require('../structures/transport')

describe('Transport object structure', () => {
  test('Success: Package structure', () => {
    expect(s.is({
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
    }, struct.package)).toBeTruthy()
  });

  test('Fail: Package structure mandatory fields are present', () => {
    const [error, entity] = s.validate({}, struct.package)

    for (const failure of error.failures()) {
      expect(["height",
        "length",
        "owner",
        "tracking_id",
        "weight",
        "width"]).toEqual(expect.arrayContaining(failure.path));
    }
  });

  test('Fail: Package structure mandatory fields are empty', () => {
    const [error, entity] = s.validate({
      owner: '',
      width: '',
      length: '',
      height: '',
      weight: '',
      quantity: '',
      stackable: true,
      track_id: 'test_track_id'
    }, struct.package)

    for (const failure of error.failures()) {
      expect(['owner', 'width', 'length', 'height', 'weight', 'quantity', 'status', 'track_id', 'stackable']).toEqual(expect.arrayContaining(failure.path))
    }
  })

  test('Fail: Package structure mandatory fields are null', () => {
    const [error, entity] = s.validate({
      owner: null,
      width: null,
      length: null,
      height: null,
      weight: null,
      quantity: null,
      stackable: true,
      track_id: 'test_track_id'
    }, struct.package)

    for (const failure of error.failures()) {
      expect(['owner', 'width', 'length', 'height', 'weight', 'quantity', 'status', 'track_id', 'stackable']).toEqual(expect.arrayContaining(failure.path))
    }
  })

  test('Success: Package structure number fields are number string', () => {
    expect(s.is({
      owner: 'DEMO',
      width: '70.0',
      length: '84.12',
      height: '94.33',
      weight: '9.4',
      quantity: '1',
      stackable: true,
      reference: 'REFERENCE',
      track_id: 'test_track_id',
      status: 'waiting_for_pickup'
    }, struct.package)).toBeTruthy()
  })

  test('Fail: Package structure quantity is integer', () => {
    expect(s.is({
      owner: 'DEMO',
      width: '70.0',
      length: '84.12',
      height: '94.33',
      weight: '9.4',
      quantity: '1.1',
      stackable: true,
      track_id: 'test_track_id'
    }, struct.package)).toBeFalsy()

    expect(s.is({
      owner: 'DEMO',
      width: '70.0',
      length: '84.12',
      height: '94.33',
      weight: '9.4',
      quantity: 1.1,
      stackable: true,
      track_id: 'test_track_id'
    }, struct.package)).toBeFalsy()
  })

  test('Success: Package reference is optional', () => {
    expect(s.is({
      owner: 'DEMO',
      width: 70,
      length: 84,
      height: 94,
      weight: 9,
      quantity: 1,
      stackable: true,
      track_id: 'test_track_id',
      status: 'waiting_for_pickup'
    }, struct.package)).toBeTruthy()
  })

  test('Success: Package structure stackable is defaulted boolean', () => {
    let entity = s.create({
      owner: 'DEMO',
      width: 70.0,
      length: 84.12,
      height: 94.33,
      weight: 9,
      quantity: 1,
      stackable: true,
      track_id: 'test_track_id',
      status: 'waiting_for_pickup'
    }, struct.package)

    expect(entity).toHaveProperty('stackable', true)

    entity = s.create({
      owner: 'DEMO',
      width: 70.0,
      length: 84.12,
      height: 94.33,
      weight: 9,
      quantity: 1,
      track_id: 'test_track_id',
      status: 'waiting_for_pickup'
    }, struct.package)

    expect(entity).toHaveProperty('stackable', false)

    expect(s.is(entity, struct.package)).toBeTruthy()
  })

  test('Success: Package structure quantity is defaulted to 1', () => {
    let entity = s.create({
      owner: 'DEMO',
      width: 70.0,
      length: 84.12,
      height: 94.33,
      weight: 9,
      quantity: 11,
      stackable: true,
      track_id: 'test_track_id',
      status: 'waiting_for_pickup'
    }, struct.package)

    expect(entity).toHaveProperty('quantity', 11)

    entity = s.create({
      owner: 'DEMO',
      width: 70.0,
      length: 84.12,
      height: 94.33,
      weight: 9,
      stackable: true,
      track_id: 'test_track_id',
      status: 'waiting_for_pickup'
    }, struct.package)

    expect(entity).toHaveProperty('quantity', 1)

    expect(s.is(entity, struct.package)).toBeTruthy()
  })

  test('Success: Package structure track_id is defaulted to UUID', () => {
    let entity = s.create({
      owner: 'DEMO',
      width: 70.0,
      length: 84.12,
      height: 94.33,
      weight: 9,
      quantity: 1,
      track_id: 'test_track_id',
      stackable: true,
      status: 'waiting_for_pickup'
    }, struct.package)

    expect(entity).toHaveProperty('track_id', 'test_track_id')

    entity = s.create({
      owner: 'DEMO',
      width: 70.0,
      length: 84.12,
      height: 94.33,
      weight: 9,
      stackable: true,
      status: 'waiting_for_pickup'
    }, struct.package)

    expect(entity).toHaveProperty('track_id')

    expect(s.is(entity, struct.package)).toBeTruthy()
  })
})
