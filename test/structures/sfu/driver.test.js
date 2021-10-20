const s = require('superstruct')
const { sfu } = require('../../../index')

const struct = sfu().driver

describe('Driver object structure', () => {
  test('Success: Driver structure', () => {
    expect(s.is({
      name: 'Vincent Simonin',
    }, struct.driver)).toBeTruthy()

    expect(s.is({
      name: 'Vincent Simonin',
      phone: '+33 6 61 10 10 10'
    }, struct.driver)).toBeTruthy()

    expect(s.is({}, struct.driver)).toBeFalsy()
  });

  test('Fail: wrong type', () => {
    const [error1] = s.validate({
      name: 'Vincent Simonin',
      type: 'wrong type'
    }, struct.driver)

    expect(error1).toBeInstanceOf(s.StructError)
    expect(error1.path[0]).toBe('type')
  });

  test('Success: Driver structure type is defaulted to point', () => {
    const [error, entity] = s.validate({
      name: 'Vincent Simonin',
    }, struct.driver, { coerce: true })

    expect(error).toBeUndefined()
    expect(entity.type).toBe('sfu/driver')
  });
})
