const s = require('superstruct')
const { sfu } = require('../../../index')

const struct = sfu().carrier


describe('Carrier object structure', () => {
  test('Success: Carrier structure', () => {
    expect(s.is({
      code: 'MYCODE',
    }, struct.carrier)).toBeTruthy()

    expect(s.is({}, struct.carrier)).toBeFalsy()
  });

  test('Fail: wrong type', () => {
    const [error1] = s.validate({
      code: 'MYCODE',
      type: 'wrong type'
    }, struct.carrier)

    expect(error1).toBeInstanceOf(s.StructError)
    expect(error1.path[0]).toBe('type')
  });

  test('Success: Carrier structure type is defaulted to point', () => {
    const [error, entity] = s.validate({
      code: 'MYCODE',
    }, struct.carrier, { coerce: true })

    expect(error).toBeUndefined()
    expect(entity.type).toBe('sfu/carrier')
  });
})
