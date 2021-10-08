const s = require('superstruct')
const struct = require('../../../structures/transport/v2/contact')

describe('Contact object structure', () => {
  test('Success: Contact structure', () => {
    expect(s.is({
      company_name: 'Redspher',
    }, struct.contact)).toBeTruthy()

    expect(s.is({}, struct.contact)).toBeFalsy()
  })
})
