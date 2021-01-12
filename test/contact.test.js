const s = require('superstruct')
const struct = require('../structures/contact')

describe('Contact object structure', () => {
  test('Success: Contact structure', () => {
    expect(s.is({
      company: 'Redspher',
      name: 'Vincent Simonin',
      phone: '+33 6 61 10 32 29',
      email: 'vincent.simonin@redspher.com'
    }, struct.contact)).toBeTruthy()

    expect(s.is({}, struct.contact)).toBeFalsy()

    expect(s.is({
      company: null,
      name: null,
      phone: null,
      email: null
    }, struct.contact)).toBeFalsy()

    expect(s.is({
      company: '',
      name: '',
      phone: '',
      email: ''
    }, struct.contact)).toBeFalsy()
  })
})
