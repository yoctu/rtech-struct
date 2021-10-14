const s = require('superstruct')
const { sfu } = require('../../../index')

const struct = sfu().carrier


describe('Carrier object structure', () => {
  test('Success: Carrier structure', () => {
    expect(s.is({
      code: 'MYCODE',
    }, struct.carrier)).toBeTruthy()

    expect(s.is({}, struct.carrier)).toBeFalsy()
  })
})
