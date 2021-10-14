const s = require('superstruct')
const { sfu } = require('../../../index')

const struct = sfu().address

describe('Address object structure', () => {
  test('Success: Address structure', () => {
    expect(s.is({
      street: '34 Rue Jacques Marjorelle',
      additional_street: 'en face du 35',
      city: 'Ennery',
      zip_code: '57365',
      country: 'FR',
      province: 'Moselle',
      position: {
        lat: 49.221935,
        lon: 6.217841
      },
      timezone_string: 'Europe/Paris'
    }, struct.address)).toBeTruthy()

    expect(s.is({
      street: '34 Rue Jacques Marjorelle',
      city: 'Ennery',
      zip_code: '57365',
      country: 'FR',
      position: {
        lat: 49.221935,
        lon: 6.217841
      },
      timezone_string: 'Europe/Paris'
    }, struct.address)).toBeTruthy()

    expect(s.is({
      street: '34 Rue Jacques Marjorelle',
      city: 'Ennery',
      zip_code: '57365',
      country: 'FR',
      position: {
        lat: 49.221935,
        lon: 6.217841
      },
      timezone_string: null
    }, struct.address)).toBeFalsy()

    expect(s.is({
      street: '34 Rue Jacques Marjorelle',
      additional_street: null,
      city: 'Ennery',
      zip_code: '57365',
      province: null,
      country: 'FR',
      position: {
        lat: 49.221935,
        lon: 6.217841
      },
      timezone_string: 'Europe/Paris'
    }, struct.address)).toBeFalsy()

    expect(s.is({
      street: '34 Rue Jacques Marjorelle',
      additional_street: '',
      city: 'Ennery',
      zip_code: '57365',
      province: '',
      country: 'FR',
      position: {
        lat: 49.221935,
        lon: 6.217841
      },
      timezone_string: 'Europe/Paris'
    }, struct.address)).toBeFalsy()
  })

  test('Fail: Address structure mandatory fields are present', () => {
    const error = s.validate({}, struct.address)

    for (const failure of error[0].failures()) {
      expect(['street', 'city', 'zip_code', 'country', 'position', 'timezone_string']).toEqual(expect.arrayContaining(failure.path))
    }
  })

  test('Fail: Address structure mandatory fields are empty', () => {
    const [error, entity] = s.validate({
      street: '',
      city: '',
      zip_code: '',
      country: '',
      position: '',
      timezone_string: ''
    }, struct.address)

    for (const failure of error.failures()) {
      expect(['street', 'city', 'zip_code', 'country', 'position', 'timezone_string']).toEqual(expect.arrayContaining(failure.path))
    }
  })

  test('Fail: Address structure mandatory fields are null', () => {
    const [error, entity] = s.validate({
      street: null,
      city: null,
      zip_code: null,
      country: null,
      position: null,
      timezone_string: null
    }, struct.address)

    for (const failure of error.failures()) {
      expect(['street', 'city', 'zip_code', 'country', 'position', 'timezone_string']).toEqual(expect.arrayContaining(failure.path))
    }
  })

  test('Fail: Address structure position must match the format', () => {
    const [error1, entity1] = s.validate({
      street: '34 Rue Jacques Marjorelle',
      city: 'Ennery',
      zip_code: '57365',
      country: 'FR',
      position: '49.2219356.217841',
      timezone_string: 'Europe/Paris'
    }, struct.address)

    expect(error1).toBeInstanceOf(s.StructError)
    expect(error1.path[0]).toBe('position')

    const [error2, entity2] = s.validate({
      street: '34 Rue Jacques Marjorelle',
      city: 'Ennery',
      zip_code: '57365',
      country: 'FR',
      position: null,
      timezone_string: 'Europe/Paris'
    }, struct.address)

    expect(error2).toBeInstanceOf(s.StructError)
    expect(error2.path[0]).toBe('position')

    const [error3, entity3] = s.validate({
      street: '34 Rue Jacques Marjorelle',
      city: 'Ennery',
      zip_code: '57365',
      country: 'FR',
      position: 49.221935,
      timezone_string: 'Europe/Paris'
    }, struct.address)

    expect(error3).toBeInstanceOf(s.StructError)
    expect(error3.path[0]).toBe('position')
  })

  test('Success: Geolocalizations can be negative', () => {
    expect(s.is({
      street: '34 Rue Jacques Marjorelle',
      additional_street: 'en face du 35',
      city: 'Ennery',
      zip_code: '57365',
      country: 'FR',
      province: 'Moselle',
      position: {
        lat: -49.221935,
        lon: 6.217841
      },
      timezone_string: 'Europe/Paris'
    }, struct.address)).toBeTruthy()

    expect(s.is({
      street: '34 Rue Jacques Marjorelle',
      additional_street: 'en face du 35',
      city: 'Ennery',
      zip_code: '57365',
      country: 'FR',
      province: 'Moselle',
      position: {
        lat: 49.221935,
        lon: -6.217841
      },
      timezone_string: 'Europe/Paris'
    }, struct.address)).toBeTruthy()

    expect(s.is({
      street: '34 Rue Jacques Marjorelle',
      additional_street: 'en face du 35',
      city: 'Ennery',
      zip_code: '57365',
      country: 'FR',
      province: 'Moselle',
      position: {
        lat: -49.221935,
        lon: -6.217841
      },
      timezone_string: 'Europe/Paris'
    }, struct.address)).toBeTruthy()
  })
})
