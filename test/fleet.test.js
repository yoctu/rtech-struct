const s = require('superstruct')
const struct = require('../structures/fleet')

describe('Fleet object structure', () => {
  test('Success: Fleet structure', () => {
    expect(s.is({
      id: '1234567890',
      name: 'lav',
      driver: 'laurent',
      provider: 'ftk',
      plate: '1803lv90'
    }, struct.vehicle)).toBeTruthy()

    const [err0, val0] = s.validate({
      id: '1234567890',
      name: 'lav',
      driver: 'laurent',
      provider: 'ftk',
      plate: '1803lv90'
    }, struct.vehicle, {
      coerce: true, mask: true
    })

    expect(err0).toBeUndefined()
    expect(val0).toBeDefined()
    expect(val0).toStrictEqual({
      id: '1234567890',
      name: 'lav',
      driver: 'laurent',
      provider: 'ftk',
      plate: '1803lv90'
    })

    let [err1, val1] = s.validate({
      id: '1234567890'
    }, struct.vehicle, {
      coerce: true, mask: true
    })

    expect(err1).toBeUndefined()
    expect(val1).toBeDefined()

    let [err2, val2] = s.validate([{
      id: '1234567890'
    }, {
      id: '1234567891'
    }], struct.fleet, {
      coerce: true, mask: true
    })

    expect(err2).toBeUndefined()
    expect(val2).toBeDefined()
  })

  test('Fail: Fleet structure fail', () => {
    let [error, value] = s.validate({
      provider: 'tomtom'
    }, struct.vehicle, {
      coerce: true, mask: true
    })

    expect(error).toHaveProperty('key', 'provider')

    error = s.validate({
      id: '1234567890',
      driver: 'a',
    }, struct.vehicle, {
      coerce: true, mask: true
    })

    expect(error[0]).toHaveProperty('key', 'driver')

    error = s.validate(null, struct.vehicle)

    expect(error[0]).toBeDefined()
    expect(error[1]).toBeUndefined()
  })

  test('Succes: Fleet is empty', () => {
    expect(s.is([], struct.fleet)).toBeTruthy()
  })
})
