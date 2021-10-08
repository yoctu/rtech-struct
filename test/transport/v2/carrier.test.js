const s = require('superstruct')
const struct = require('../../../structures/transport/v2/carrier')


describe('Carrier object structure', () => {
  test('Success: Carrier structure', () => {
    expect(s.is({
      code: 'MYCODE',
    }, struct.carrier)).toBeTruthy()

    expect(s.is({}, struct.carrier)).toBeFalsy()
  })
})
