const s = require('superstruct')
const { sfu } = require('../../../index')

const struct = sfu().package

describe('Package object structure', () => {
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
    }, struct.transportPackage)).toBeTruthy();
  });

  test('Fail: Package structure mandatory fields are present', () => {
    const [error, entity] = s.validate({}, struct.transportPackage);

    for (const failure of error.failures()) {
      expect(['height', 'length', 'owner', 'tracking_id', 'weight', 'width', 'status', 'stackable', 'quantity']).toEqual(expect.arrayContaining(failure.path));
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
      stackable: '',
      tracking_id: 'test_track_id'
    }, struct.transportPackage);

    for (const failure of error.failures()) {
      expect(['owner', 'width', 'length', 'height', 'weight', 'quantity', 'status', 'tracking_id', 'stackable']).toEqual(expect.arrayContaining(failure.path));
    }
  });

  test('Fail: Package structure mandatory fields are null', () => {
    const [error, entity] = s.validate({
      owner: null,
      width: null,
      length: null,
      height: null,
      weight: null,
      quantity: null,
      stackable: true,
      tracking_id: 'test_track_id'
    }, struct.transportPackage);

    for (const failure of error.failures()) {
      expect(['owner', 'width', 'length', 'height', 'weight', 'quantity', 'status', 'tracking_id', 'stackable']).toEqual(expect.arrayContaining(failure.path));
    }
  });

  test('Success: Package structure number fields are number/float', () => {
    expect(s.is({
      owner: 'DEMO',
      width: 70.0,
      length: 84.12,
      height: 94.33,
      weight: 9.4,
      quantity: 1,
      stackable: '1',
      references: ['ref1', 'ref2'],
      tracking_id: 'b85e2bf0-d457-4dbf-88b5-b0bc2e3ec24c'
    }, struct.transportPackage)).toBeTruthy();
  });

  test('Fail: References can be empty string', () => {
    expect(s.is({
      owner: 'DEMO',
      width: 70.0,
      length: 84.12,
      height: 94.33,
      weight: 9.4,
      quantity: 1,
      stackable: '1',
      references: ['', ''],
      tracking_id: 'b85e2bf0-d457-4dbf-88b5-b0bc2e3ec24c'
    }, struct.transportPackage)).toBeTruthy();
  })

  test('Fail: Package structure quantity should be integer', () => {
    expect(s.is({
      owner: 'DEMO',
      width: 70.0,
      length: 84.12,
      height: 94.33,
      weight: 9.4,
      quantity: '1.1',
      stackable: true,
      tracking_id: 'b85e2bf0-d457-4dbf-88b5-b0bc2e3ec24c'
    }, struct.transportPackage)).toBeFalsy();

    expect(s.is({
      owner: 'DEMO',
      width: '70.0',
      length: '84.12',
      height: '94.33',
      weight: '9.4',
      quantity: 1.1,
      stackable: true,
      tracking_id: 'b85e2bf0-d457-4dbf-88b5-b0bc2e3ec24c'
    }, struct.transportPackage)).toBeFalsy();
  });

  test('Success: Package reference is optional', () => {
    expect(s.is({
      owner: 'DEMO',
      width: 70.0,
      length: 84.12,
      height: 94.33,
      weight: 9.4,
      quantity: 1,
      stackable: '1',
      tracking_id: 'b85e2bf0-d457-4dbf-88b5-b0bc2e3ec24c',
    }, struct.transportPackage)).toBeTruthy();
  });

  test('Success: Package structure stackable is defaulted "no"', () => {
    let entity = s.create({
      owner: 'DEMO',
      width: 70.0,
      length: 84.12,
      height: 94.33,
      weight: 9,
      quantity: 1,
      tracking_id: 'b85e2bf0-d457-4dbf-88b5-b0bc2e3ec24c',
    }, struct.transportPackage);

    expect(entity).toHaveProperty('stackable', 'no');

    entity = s.create({
      owner: 'DEMO',
      width: 70.0,
      length: 84.12,
      height: 94.33,
      weight: 9,
      quantity: 1,
      stackable: '1',
      tracking_id: 'b85e2bf0-d457-4dbf-88b5-b0bc2e3ec24c',
    }, struct.transportPackage);

    expect(entity).toHaveProperty('stackable', '1');

    expect(s.is(entity, struct.transportPackage)).toBeTruthy();
  });

  test('Success: Package structure quantity is defaulted to 1', () => {
    let entity = s.create({
      owner: 'DEMO',
      width: 70.0,
      length: 84.12,
      height: 94.33,
      weight: 9,
      stackable: 'no',
      tracking_id: 'b85e2bf0-d457-4dbf-88b5-b0bc2e3ec24c',
    }, struct.transportPackage);

    expect(entity).toHaveProperty('quantity', 1);

    expect(s.is(entity, struct.transportPackage)).toBeTruthy();
  });

  test('Success: Package structure tracking_id is defaulted to UUID', () => {
    let entity = s.create({
      owner: 'DEMO',
      width: 70.0,
      length: 84.12,
      height: 94.33,
      weight: 9,
      quantity: 1,
      tracking_id: 'b85e2bf0-d457-4dbf-88b5-b0bc2e3ec24c',
      stackable: 'no',
    }, struct.transportPackage);

    expect(entity).toHaveProperty('tracking_id', 'b85e2bf0-d457-4dbf-88b5-b0bc2e3ec24c');

    expect(s.is(entity, struct.transportPackage)).toBeTruthy()
  });

  test('Fail: wrong type', () => {
    expect(s.is({
      owner: 'owner',
      stackable: 'no',
      quantity: 1,
      references: ['ref1', 'ref2'],
      width: 50,
      length: 50,
      height: 50,
      weight: 3.3,
      package_type: 'parcel',
      type: 'bas type',
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
    }, struct.transportPackage)).toBeFalsy();
  });

  test('Success: Package structure type is defaulted to package', () => {
    const [error, entity] = s.validate({
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
    }, struct.transportPackage, { coerce: true });

    expect(error).toBeUndefined();
    expect(entity.type).toBe('sfu/package');
  })
});
