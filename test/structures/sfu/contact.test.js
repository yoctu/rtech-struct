const s = require('superstruct')
const { sfu } = require('../../../index')

const struct = sfu().contact

describe('Contact object structure', () => {
  test('Success: Contact structure', () => {
    expect(s.is({
      company_name: 'Redspher',
    }, struct.contact)).toBeTruthy()

    expect(s.is({
      company_name: 'Redspher',
      phone: '+33 6 61 10 10 10',
      name: 'Vincent Simonin',
      email: 'vsi@yoctu.com'
    }, struct.contact)).toBeTruthy()

    expect(s.is({}, struct.contact)).toBeFalsy()
  })

  test('Fail: Contact email is not an email', () => {
    expect(s.is({
        company_name: 'Redspher',
        email: 'not an email'
    }, struct.contact)).toBeFalsy()
  })
})
