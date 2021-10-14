const s = require('superstruct')
const struct = require('../../structures/rels')

describe('Rels object structure', () => {
  test('Success: Rels structure', () => {
    expect(s.is({
      name: 'DEMO Express',
      key: 'DEMOEX',
      url: 'http://localhost:3005',
      autoinvite: true
    }, struct.rel)).toBeTruthy()

    expect(s.is({
      key: 'DEMOEX'
    }, struct.rel)).toBeTruthy()

    const [error, value] = s.validate({
      key: 'DEMOEX',
      timestamp: "2021-02-17T17:57:20.107Z",
      toto: 'because'
    }, struct.rel, {
      coerce: true,
      mask: true
    })

    expect(error).toBeUndefined()
    expect(value).toBeDefined()
    expect(value).toStrictEqual({
      autoinvite: false,
      key: "DEMOEX",
      name: "DEMO",
      timestamp: "2021-02-17T17:57:20.107Z",
      visible: 'private',
      url: undefined
    })

    expect(s.is([{
        key: 'DEMOEX'
      },
      {
        key: 'DEMOEX'
      },
      {
        key: 'DEMOEX'
      }
    ], struct.rels)).toBeTruthy()

    expect(s.is([], struct.rels)).toBeTruthy()
  })

  test('Fail: Rels structure fail', () => {
    let error = s.validate({
      name: 'DEMO Express',
      key: 'DEMOEX',
      url: 'badurl',
      autoinvite: true
    }, struct.rel)

    expect(error[0]).toHaveProperty('key', 'url')

    error = s.validate({
      key: 'D'
    }, struct.rel)

    expect(error[0]).toHaveProperty('key', 'key')

    error = s.validate(null, struct.rels)

    expect(error[0]).toBeDefined()
    expect(error[1]).toBeUndefined()
  })
})
