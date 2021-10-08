const s = require('superstruct')
const struct = require('../../../structures/transport/v2/input/carrier')


describe('Driver object structure', () => {
  test('Success: Driver structure', () => {
    expect(s.is({
      company_name: 'Redspher',
    }, struct.contact)).toBeTruthy()
  })
})

describe('Carrier object structure', () => {
  test('Success: Carrier structure', () => {
    expect(s.is({
      company_name: 'Redspher',
    }, struct.contact)).toBeTruthy()

    expect(s.is({}, struct.contact)).toBeFalsy()
  })
})
