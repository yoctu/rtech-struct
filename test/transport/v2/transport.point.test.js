const s = require('superstruct')
const struct = require('../../../structures/transport/v2/transport')

describe('Point object structure', () => {
  test('Success: Point structure', () => {
    expect(s.is({
      address: {
        street: '34 Rue Jacques Marjorelle',
        additional_street: 'en face du 35',
        city: 'Ennery',
        zip_code: '57365',
        country: 'FR',
        timezone: 'Europe/Paris',
        position: {
          lat: '49.221935',
          lon: '6.217841'
        }
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
    }, struct.point)).toBeTruthy();

    expect(s.is({
      address: null,
      real_departure: '2020-09-25T08:00:00Z',
      contact: {
        phone: '+352 42 42 42',
        company_name: 'Pizza Express',
        name: 'Woody',
        email: 'morty@schmidt.com'
      },
      packages_to_load: [null, null],
      arrival_from: null,
      comment: 'commentary',
      id: 'd996f34e-d849-41a9-a691-bd9834f63eed',
      real_arrival: '2020-09-25T08:00:00Z',
      packages_to_unload: [null, null],
      arrival_until: '2020-09-25T08:00:00Z'
    }, struct.point)).toBeFalsy()

    expect(s.is({
      address: {
        street: '34 Rue Jacques Marjorelle',
        additional_street: 'en face du 35',
        city: 'Ennery',
        zip_code: '57365',
        country: 'FR',
        province: 'Moselle',
        position: '49.221935,6.217841',
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
    }, struct.point)).toBeFalsy()
  })

  test('Fail: Point structure mandatory fields are no present', () => {
    const [error, entity] = s.validate({}, struct.point)

    for (const failure of error.failures()) {
      expect(["address",
        "arrival_from",
        "packages_to_load",
        "packages_to_unload"]).toEqual(expect.arrayContaining(failure.path))
    }
  })

  test('Fail: Point structure mandatory fields are empty', () => {
    const [error, entity] = s.validate({
      arrival_at: '2020-09-25T08:00:00Z',
      departure_at: '2020-09-25T10:00:00Z',
      address: {},
      contact: {}
    }, struct.point)

    for (const failure of error.failures()) {
      expect([
        ['address', 'street'],
        ['address', 'city'],
        ['address', 'zip_code'],
        ['address', 'country'],
        ['address', 'position'],
        ['address', 'timezone'],
        ['contact', 'company'],
        ['contact', 'name'],
        ['contact', 'phone'],
        ['contact', 'email']
      ]).toContainEqual(failure.path)
    }
  })

  test('Fail: Point structure mandatory fields are null', () => {
    const [error, entity] = s.validate({
      arrival_at: '2020-09-25T08:00:00Z',
      departure_at: '2020-09-25T10:00:00Z',
      address: null,
      contact: null
    }, struct.point)

    for (const failure of error.failures()) {
      expect(['contact', 'address']).toEqual(expect.arrayContaining(failure.path))
    }
  })

  test('Fail: Point structure mandatory fields are undefined', () => {
    let [error, entity] = s.validate({
      arrival_at: '2020-09-25T08:00:00Z',
      departure_at: '2020-09-25T10:00:00Z',
      contact: {
        company: 'Redspher',
        name: 'Vincent Simonin',
        phone: '+33 6 61 10 32 29',
        email: 'vincent.simonin@redspher.com'
      }
    }, struct.point)

    for (const failure of error.failures()) {
      expect(failure.path[0]).toBe('address')
    }

    [error, entity] = s.validate({
      arrival_at: '2020-09-25T08:00:00Z',
      departure_at: '2020-09-25T10:00:00Z'
    }, struct.point)

    for (const failure of error.failures()) {
      expect(failure.path[0]).toBe('address')
    }
  })

  test('Fail: Point structure contact is optional', () => {
    expect(s.is({
      arrival_at: '2020-09-25T08:00:00Z',
      departure_at: '2020-09-25T10:00:00Z',
      address: {
        street: '34 Rue Jacques Marjorelle',
        city: 'Ennery',
        zip_code: '57365',
        country: 'FR',
        position: '49.221935,6.217841',
        timezone: 'Europe/Paris'
      }
    }, struct.point)).toBeTruthy()
  })

  test('Fail: Point structure arrival_at must match the format', () => {
    const [error1, entity1] = s.validate({
      arrival_at: '2020-09-25 10:00:00',
      departure_at: '2020-09-25T10:00:00Z',
      address: {
        street: '34 Rue Jacques Marjorelle',
        city: 'Ennery',
        zip_code: '57365',
        country: 'FR',
        position: '49.221935,6.217841',
        timezone: 'Europe/Paris'
      },
      contact: {
        company: 'Redspher',
        name: 'Vincent Simonin',
        phone: '+33 6 61 10 32 29',
        email: 'vincent.simonin@redspher.com'
      }
    }, struct.point)

    expect(error1).toBeInstanceOf(s.StructError)
    expect(error1.type).toBe('string')
    expect(error1.path[0]).toBe('arrival_at')
  })

  test('Success: convert into zoulou date', () => {
    const p = s.create({
      arrival_at: '2020-09-25T10:00:00',
      departure_at: '2020-09-25T10:00:00Z',
      address: {
        street: '34 Rue Jacques Marjorelle',
        city: 'Ennery',
        zip_code: '57365',
        country: 'FR',
        position: '49.221935,6.217841',
        timezone: 'Europe/Paris'
      },
      contact: {
        company: 'Redspher',
        name: 'Vincent Simonin',
        phone: '+33 6 61 10 32 29',
        email: 'vincent.simonin@redspher.com'
      }
    }, struct.point)

    expect(p).toHaveProperty('arrival_at', '2020-09-25T10:00:00Z')
    expect(p).toHaveProperty('departure_at', '2020-09-25T10:00:00Z')
  })

  test('Success: Date ISO with millisecond validation', () => {
    expect(s.is({
      arrival_at: '2020-11-11T17:07:44.014Z',
      departure_at: '2020-11-12T17:07:44.013Z',
      address: {
        street: '34 Rue Jacques Marjorelle',
        city: 'Ennery',
        zip_code: '57365',
        country: 'FR',
        position: '49.221935,6.217841',
        timezone: 'Europe/Paris'
      },
      contact: {
        company: 'Redspher',
        name: 'Vincent Simonin',
        phone: '+33 6 61 10 32 29',
        email: 'vincent.simonin@redspher.com'
      }
    }, struct.point)).toBeTruthy()
  })
})
